// src/components/EmptyState.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

interface EmptyStateProps {
  sortingOption: "upcoming" | "attended";
}

const EmptyBookedMessage = ({ sortingOption }: EmptyStateProps) => {
  const router = useRouter();

  const message =
    sortingOption === "attended"
      ? "No activities attended"
      : "No activity booked";

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-darkerGreen text-base font-medium my-4">
        {message}
      </Text>
      <Link href={"/discover"}>
        <View className="px-8  bg-darkerGreen h-14 rounded-xl flex flex-row justify-center items-center">
          <Text className="text-lightGreen text-xl font-medium">
            Discover activities
          </Text>
        </View>
      </Link>
    </View>
  );
};

export default EmptyBookedMessage;
