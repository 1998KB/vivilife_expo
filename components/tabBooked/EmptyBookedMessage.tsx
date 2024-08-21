// src/components/EmptyState.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

interface EmptyStateProps {
  sortingOption: "upcoming" | "attended";
}

const EmptyBookedMessage = ({ sortingOption }: EmptyStateProps) => {
  const message =
    sortingOption === "attended"
      ? "No activities attended"
      : "No activity booked";

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-darkerGreen text-base font-medium ">{message}</Text>
      <Link href={"/discover"}>
        <View className="px-8 py-4   bg-darkerGreen  rounded-xl flex flex-row justify-center items-center">
          <Text className="text-yellow text-lg font-medium">
            Discover activities
          </Text>
        </View>
      </Link>
    </View>
  );
};

export default EmptyBookedMessage;
