import { Activity } from "@/types";
import { isDateInPast } from "../datesManipulation";

export const filterBookedActivities = (
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
