import { Activity } from "@/types";

export const filterDiscoverActivities = (
  activities: Activity[]
): Activity[] => {
  const filtredActivities = activities.filter(
    (activity) => activity.deck === true
  );

  return filtredActivities;
};
