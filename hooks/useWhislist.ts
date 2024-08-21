import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/contexts/dataProvider";
import { Activity } from "@/types";
import { filterWishlistActivities } from "@/utils/filters/filterWishlistActivities";

export const useWishlist = (wishlistSortOption: "date" | "distance") => {
  const { wishlistActivities, setWishlistActivities } = useContext(DataContext);
  const [sortedActivities, setSortedActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const sorted = filterWishlistActivities(
      wishlistActivities,
      wishlistSortOption
    );
    setSortedActivities(sorted);
  }, [wishlistActivities, wishlistSortOption]);

  const handleToggleLike = (id: string) => {
    setWishlistActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, liked: !activity.liked } : activity
      )
    );
  };

  return {
    sortedActivities,
    handleToggleLike,
  };
};
