import { Dispatch, SetStateAction } from "react";
import { Activity } from "@/types";

export const handleSwipeLeft = (
  discoverActivities: Activity[],
  setDiscoverActivities: Dispatch<SetStateAction<Activity[]>>,

  currentIndex: number
) => {
  return () => {
    const activityId = discoverActivities[currentIndex].id;
    console.log("deleted act ", discoverActivities[currentIndex].title);
    if (activityId) {
    }
    discoverActivities.map((a) => console.log("remainingr act ", a.title));
  };
};
