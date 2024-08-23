import { useEffect, useState } from "react";
import { Activity } from "@/types";
import { useCalculateDistances } from "./useCalculateDistances";
import { useApi } from "@/services/api/api";
import { useAuth } from "@/contexts/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchActivities = (): Activity[] => {
  const { currentUser } = useAuth();
  const api = useApi();
  const [fetchedActivities, setFetchedActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log(
          `Fetching activities for userId: ${currentUser?.uid || "Guest"}`
        );
        const activityResponse = await api.get(
          "activities",
          currentUser?.uid || null
        );

        let activities = activityResponse;
        if (!currentUser) {
          const storedData = await AsyncStorage.getItem("savedActivities");
          const savedActivities = storedData ? JSON.parse(storedData) : [];

          const savedActivityIds = savedActivities.map(
            (activity: Activity) => activity.id
          );

          activities = activityResponse.filter(
            (activity: Activity) => !savedActivityIds.includes(activity.id)
          );
        }

        setFetchedActivities(activities);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, [currentUser]);

  const { activitiesWithDistance } = useCalculateDistances({
    activities: fetchedActivities,
  });

  return activitiesWithDistance;
};
