import { useRouter } from "expo-router";
import { Activity } from "@/types";

const buildParams = (activity: Activity) => ({
  id: activity.id,
});

export const handleSwipeRight = (
  activities: Activity[],
  currentIndex: number
) => {
  const router = useRouter();

  return () => {
    const activity = activities[currentIndex];
    if (activity) {
      const params = buildParams(activity);
      router.push({
        pathname: "/booking",
        params,
      });
    }
  };
};
