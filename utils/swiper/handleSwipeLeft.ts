import { Dispatch, SetStateAction } from "react";
import { Activity } from "@/types";

export const handleSwipeLeft = (
  activities: Activity[],
  currentIndex: number,
  setDataActivities: Dispatch<SetStateAction<Activity[]>>,
  dataActivities: Activity[],
  setActivities: Dispatch<SetStateAction<Activity[]>>
) => {
  return () => {
    const activityId = activities[currentIndex].id;
    if (activityId) {
      setDataActivities(
        dataActivities.map((activity) =>
          activity.id === activityId ? { ...activity, deck: false } : activity
        )
      );
      setActivities(
        activities.map((activity) =>
          activity.id === activityId ? { ...activity, deck: false } : activity
        )
      );
    }
  };
};
