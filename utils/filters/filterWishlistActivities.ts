import { Activity } from "@/types";
import { isDateInPast } from "../datesTimeManipulation";

export const filterWishlistActivities = (
  activities: Activity[],
  wishlistSortOption: string
) => {
  // Filter out activities that are booked or have a past date
  const filteredActivities = activities.filter(
    (activity) => !activity.booked && !isDateInPast(activity.dateTime)
  );

  // Sort by date or distance
  const sortByDate = (a: Activity, b: Activity) =>
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();

  const sortByDistance = (a: Activity, b: Activity) =>
    (a.distance ?? 0) - (b.distance ?? 0); // Default to 0 if distance is undefined

  const likedActivities = filteredActivities
    .filter((activity) => activity && activity.liked)
    .sort((a, b) =>
      wishlistSortOption === "date" ? sortByDate(a, b) : sortByDistance(a, b)
    );

  const unlikedActivities = filteredActivities
    .filter((activity) => activity && !activity.liked)
    .sort((a, b) =>
      wishlistSortOption === "date" ? sortByDate(a, b) : sortByDistance(a, b)
    );

  // Combine liked and unliked activities
  const sortedActivities = [...likedActivities, ...unlikedActivities];

  return sortedActivities;
};
