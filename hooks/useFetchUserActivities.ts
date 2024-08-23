import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { useUsersApi } from "@/services/api/usersApi";
import { useApi } from "@/services/api/api";
import { useCalculateDistances } from "./useCalculateDistances";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/authProvider";

export const useFetchUserActivities = () => {
  const [wishlistActivities, setWishlistActivities] = useState<Activity[]>([]);
  const [bookedActivities, setBookedActivities] = useState<Activity[]>([]);
  const [fetchedWishlist, setFetchedWishlist] = useState<Activity[]>([]);
  const [fetchedBooked, setFetchedBooked] = useState<Activity[]>([]);
  const userApi = useUsersApi();
  const api = useApi();
  const { currentUser } = useAuth();

  const userId = currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const fetchUserActivities = async () => {
      try {
        // Check AsyncStorage first
        const savedActivitiesJSON =
          await AsyncStorage.getItem("savedActivities");
        const savedActivities: Activity[] = savedActivitiesJSON
          ? JSON.parse(savedActivitiesJSON)
          : [];

        if (savedActivities.length > 0) {
          // If there are saved activities, use them directly
          // No need to make API calls for wishlist and booked activities
          setFetchedWishlist(savedActivities);
          await AsyncStorage.removeItem("savedActivities");
        }

        // Fetch activities from user API
        const wishlistResponse: [{ activityId: string; liked: boolean }] =
          await userApi.getWishlist(userId);
        const bookedResponse: [{ activityId: string }] =
          await userApi.getBooked(userId);

        const wishlistIds: string[] = wishlistResponse.map((r) => r.activityId);
        const bookedIds: string[] = bookedResponse.map((r) => r.activityId);

        const wishlistDetails: Activity[] = await Promise.all(
          wishlistIds.map((id) => api.byId("activities", id))
        );

        const bookedDetails: Activity[] = await Promise.all(
          bookedIds.map((id) => api.byId("activities", id))
        );

        // Handle fetched wishlist details
        const updatedWishlistDetails = wishlistDetails.map((activity) => {
          const likedStatus =
            wishlistResponse.find((item) => item.activityId === activity.id)
              ?.liked ?? true;
          return { ...activity, liked: likedStatus };
        });

        // Combine saved activities with fetched wishlist activities
        const existingActivityIds = new Set(
          updatedWishlistDetails.map((activity) => activity.id)
        );
        const uniqueSavedActivities = savedActivities.filter(
          (activity) => !existingActivityIds.has(activity.id)
        );

        const finalWishlistDetails = [
          ...updatedWishlistDetails,
          ...uniqueSavedActivities,
        ];

        // Set the state with combined activities
        setFetchedWishlist(finalWishlistDetails);
        setFetchedBooked(bookedDetails);
      } catch (error) {
        console.error(
          "Failed to fetch user activities or load saved activities:",
          error
        );
      }
    };
    fetchUserActivities();
  }, [currentUser]);

  const { activitiesWithDistance: wishlistWithDistance } =
    useCalculateDistances({ activities: fetchedWishlist });
  const { activitiesWithDistance: bookedWithDistance } = useCalculateDistances({
    activities: fetchedBooked,
  });

  useEffect(() => {
    setWishlistActivities(wishlistWithDistance);
  }, [wishlistWithDistance]);

  useEffect(() => {
    setBookedActivities(bookedWithDistance);
  }, [bookedWithDistance]);

  return { wishlistActivities, bookedActivities };
};
