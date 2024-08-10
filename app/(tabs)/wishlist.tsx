import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import GradientBackground from "@/components/GradientBackground";
import ActivityLikedCard from "@/components/activityLikedCard/ActivityLikedCard";
import { getWishlistSortedActivities } from "@/helper/activityFiltersHelperFunctions";
import { DataContext } from "@/contexts/context";
import { useRouter } from "expo-router";
import WishlistSortingOptions from "@/screens/screenWishlist/WishlistSortingOptions";

export default function Wishlist() {
  const [wishlistSortOption, setWishlistSortOption] = useState<
    "date" | "distance"
  >("date");
  const { dataActivities, setDataActivities } = useContext(DataContext);
  const router = useRouter();

  const handleToggleLike = (id: number) => {
    setDataActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, liked: !activity.liked } : activity
      )
    );
  };

  const sortedActivities = getWishlistSortedActivities(
    dataActivities,
    wishlistSortOption
  );

  const navigateToDiscover = () => {
    router.push("/discover");
  };
  return (
    <View className="flex-1 items-center h-full ">
      <GradientBackground />
      <WishlistSortingOptions
        wishlistSortOption={wishlistSortOption}
        setWishlistSortOption={setWishlistSortOption}
      />
      {sortedActivities.length > 0 ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            width: "100%",
            paddingTop: 65,
            paddingBottom: 110,
          }}
          showsVerticalScrollIndicator={false}
        >
          {sortedActivities.map((activity) => (
            <ActivityLikedCard
              key={activity.id}
              activity={activity}
              onToggleLike={handleToggleLike}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-darkerGreen text-base font-medium ">
            No activities in your wishlist
          </Text>
          <Pressable
            onPress={navigateToDiscover}
            className="px-8  bg-darkerGreen  h-14 rounded-xl flex flex-row justify-center items-center"
          >
            <Text className="text-lightGreen text-xl font-medium ">
              Discover activities
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
