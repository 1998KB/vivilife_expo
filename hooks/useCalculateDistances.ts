import { useState, useEffect } from "react";
import { getDistance } from "geolib";
import { Activity } from "@/types";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_STORAGE_KEY = "userLocation";

interface UseCalculateDistancesProps {
  activities: Activity[];
}

export const useCalculateDistances = ({
  activities,
}: UseCalculateDistancesProps) => {
  const [activitiesWithDistance, setActivitiesWithDistance] = useState<
    Activity[]
  >([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationFetched, setLocationFetched] = useState(false);

  // Function to fetch and store user location
  const fetchAndStoreUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error(
          "Location permission is required to calculate distances."
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      const newLocation = { latitude, longitude };

      // Compare new location with the stored location
      const storedLocationString =
        await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLocationString) {
        const parsedLocation = JSON.parse(storedLocationString);
        if (
          parsedLocation.latitude === newLocation.latitude &&
          parsedLocation.longitude === newLocation.longitude
        ) {
          // Location hasn't changed, no need to recalculate distances
          setUserLocation(parsedLocation);
          setLocationFetched(true);
          return;
        }
      }

      // Store new location and use it
      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newLocation)
      );
      setUserLocation(newLocation);
      setLocationFetched(true);
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }
  };

  // Fetch user location
  useEffect(() => {
    fetchAndStoreUserLocation();
  }, []);

  // Calculate distances once location is fetched and activities are available
  useEffect(() => {
    if (userLocation && locationFetched && activities.length > 0) {
      const updatedActivities = activities.map((activity) => {
        const activityLocation = {
          latitude: activity.geocode.latitude,
          longitude: activity.geocode.longitude,
        };

        const distance = getDistance(userLocation, activityLocation) / 1000; // Convert to kilometers

        return { ...activity, distance: Math.round(distance * 10) / 10 }; // Rounded to 1 decimal place
      });

      setActivitiesWithDistance(updatedActivities);
    }
  }, [activities, userLocation, locationFetched]);

  return { activitiesWithDistance };
};
