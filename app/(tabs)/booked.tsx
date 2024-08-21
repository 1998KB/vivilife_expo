// src/screens/Booked.tsx
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import { useBookedActivities } from "@/hooks/useBookedActivities";
import BookedActivityList from "@/components/tabBooked/BookedActivityList";
import EmptyBookedMessage from "@/components/tabBooked/EmptyBookedMessage";
import BookedSortingOptions from "@/components/tabBooked/BookedSortingOptions";

export default function Booked() {
  const [bookedSortingOptions, setBookedSortingOptions] = useState<
    "upcoming" | "attended"
  >("upcoming");
  const filteredActivities = useBookedActivities(bookedSortingOptions);

  return (
    <SafeAreaView className="flex-1 items-center h-full">
      <GradientBackground />
      <View className="flex-1 items-center ">
        <BookedSortingOptions
          bookedSortingOptions={bookedSortingOptions}
          setBookedSortingOptions={setBookedSortingOptions}
        />
        {filteredActivities.length > 0 ? (
          <BookedActivityList
            activities={filteredActivities}
            type={bookedSortingOptions}
          />
        ) : (
          <EmptyBookedMessage sortingOption={bookedSortingOptions} />
        )}
      </View>
    </SafeAreaView>
  );
}
