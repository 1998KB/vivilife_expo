import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { useUsersApi } from "@/services/api/usersApi";
import { useApi } from "@/services/api/api";
import { useCalculateDistances } from "./useCalculateDistances";

export const useFetchUserActivities = (userId: string | null) => {
  const [wishlistActivities, setWishlistActivities] = useState<Activity[]>([]);
  const [bookedActivities, setBookedActivities] = useState<Activity[]>([]);
  const [fetchedWishlist, setFetchedWishlist] = useState<Activity[]>([]);
  const [fetchedBooked, setFetchedBooked] = useState<Activity[]>([]);
  const userApi = useUsersApi();
  const api = useApi();

  useEffect(() => {
    if (!userId) return;

    const fetchUserActivities = async () => {
      try {
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

        const updatedWishlistDetails = wishlistDetails.map((activity) => {
          const likedStatus =
            wishlistResponse.find((item) => item.activityId === activity.id)
              ?.liked ?? false;
          return { ...activity, liked: likedStatus };
        });

        setFetchedWishlist(updatedWishlistDetails);
        setFetchedBooked(bookedDetails);
      } catch (error) {
        console.error("Failed to fetch user activities:", error);
      }
    };

    fetchUserActivities();
  }, [userId]);

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
