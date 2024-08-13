import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

const EmptyWishlistMessage = () => (
  <View className="flex-1 items-center justify-center gap-4">
    <Text className="text-darkerGreen text-base font-medium">
      No activities in your wishlist
    </Text>
    <Link href={"/discover"}>
      <View className="px-8 bg-darkerGreen h-14 rounded-xl flex flex-row justify-center items-center">
        <Text className="text-lightGreen text-xl font-medium">
          Discover activities
        </Text>
      </View>
    </Link>
  </View>
);

export default EmptyWishlistMessage;
