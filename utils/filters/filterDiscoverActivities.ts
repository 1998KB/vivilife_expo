import { Activity } from "@/types";

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
