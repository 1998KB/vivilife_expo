import { useRouter } from "expo-router";
import { Activity } from "@/types";

export const handleSwipeRight = (
  activities: Activity[],
  currentIndex: number
) => {
  const router = useRouter();

  return () => {
    router.navigate({
      pathname: "/booking",
      params: {
        activity: JSON.stringify(activities[currentIndex]),
        origin: "discover",
      },
    });
  };
};
