import { Activity } from "@/types";
import { isDateInPast } from "../datesManipulation";

export const filterWishlistActivities = (
  activities: Activity[],
  wishlistSortOption: string
) => {
  const filteredActivities = activities.filter(
    (activity) => !activity.booked && !isDateInPast(activity.date)
  );
  const likedActivities = filteredActivities
    .filter((activity) => activity.wishlist && activity.liked)
    .sort((a, b) =>
      wishlistSortOption === "date"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : a.distance - b.distance
    );
  const unlikedActivities = filteredActivities
    .filter((activity) => activity.wishlist && !activity.liked)
    .sort((a, b) =>
      wishlistSortOption === "date"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : a.distance - b.distance
    );
  const sortedActivities = [...likedActivities, ...unlikedActivities];

  return sortedActivities;
};
