import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "@/contexts/dataContext";
import { Activity } from "@/types";
import { auth } from "@/firebase";
import { filterWishlistActivities } from "@/utils/filters/filterWishlistActivities";

export const useWishlist = (wishlistSortOption: "date" | "distance") => {
  const { dataActivities, setDataActivities } = useContext(DataContext);
  const [localActivities, setLocalActivities] = useState<Activity[]>([]);
  const [sortedActivities, setSortedActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchLocalActivities = async () => {
      try {
        const storedData = await AsyncStorage.getItem("dataActivities");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setLocalActivities(parsedData);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    const user = auth.currentUser;
    if (!user) {
      fetchLocalActivities();
    }
  }, []);

  useEffect(() => {
    const activities = dataActivities || localActivities;
    const sorted = filterWishlistActivities(activities, wishlistSortOption);
    setSortedActivities(sorted);
  }, [dataActivities, localActivities, wishlistSortOption]);

  const handleToggleLike = (id: number) => {
    if (dataActivities) {
      setDataActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === id
            ? { ...activity, liked: !activity.liked }
            : activity
        )
      );
    } else {
      setLocalActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === id
            ? { ...activity, liked: !activity.liked }
            : activity
        )
      );
      // Optionally update AsyncStorage if needed
    }
  };

  return {
    sortedActivities,
    handleToggleLike,
  };
};
