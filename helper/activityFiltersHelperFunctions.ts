import { Activity } from "@/types";
import { isDateInPast } from "./datesHelperFunctions";

export const filterDiscoverActivities = (activities: Activity[]) => {
  const today = new Date();
  return activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    return (
      activityDate >= today &&
      !activity.booked &&
      !activity.wishlist &&
      activity.deck
    );
  });
};

export const getWishlistSortedActivities = (
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
export const filteredBookedActivities = (
  activities: Activity[],
  bookedSortingOptions: string
) => {
  return activities
    .filter((activity) => activity.booked) // Filter out only booked activities
    .filter((activity) => {
      const activityDate = new Date(activity.date);
      if (bookedSortingOptions === "upcoming") {
        // Filter based on whether the date is upcoming or past
        return !isDateInPast(activity.date) && activityDate > new Date();
      } else {
        return isDateInPast(activity.date) || activityDate <= new Date();
      }
    })
    .sort((a, b) => {
      // Sort activities by date with earliest first
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
};
