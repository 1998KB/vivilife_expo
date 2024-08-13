import React, { useState } from "react";
import { View } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import { useWishlist } from "@/hooks/useWhislist";
import EmptyWishlistMessage from "@/components/tabWishlist/EmptyWishlistMessage";
import LikedActivityList from "@/components/tabWishlist/LikedActivityList";
import WishlistSortingOptions from "@/components/tabWishlist/WishlistSortingOptions";

const Wishlist = () => {
  const [wishlistSortOption, setWishlistSortOption] = useState<
    "date" | "distance"
  >("date");
  const { sortedActivities, handleToggleLike } =
    useWishlist(wishlistSortOption);

  return (
    <View className="flex-1 items-center h-full">
      <GradientBackground />
      <WishlistSortingOptions
        wishlistSortOption={wishlistSortOption}
        setWishlistSortOption={setWishlistSortOption}
      />
      {sortedActivities.length > 0 ? (
        <LikedActivityList
          activities={sortedActivities}
          onToggleLike={handleToggleLike}
        />
      ) : (
        <EmptyWishlistMessage />
      )}
    </View>
  );
};

export default Wishlist;
