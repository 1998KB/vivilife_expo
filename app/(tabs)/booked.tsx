import React, { useContext, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import GradientBackground from "@/components/GradientBackground";
import ActivityBookedCard from "@/components/activityBookedCard/ActivityBookedCard";
import { filteredBookedActivities } from "@/helper/activityFiltersHelperFunctions";
import { DataContext } from "@/contexts/context";
import BookedSortingOptions from "@/screens/screenBooked/BookedSortingOptions";

export default function booked() {
  const [bookedSortingOptions, setBookedSortingOptions] = useState<
    "upcoming" | "attended"
  >("upcoming");
  const { dataActivities, setDataActivities } = useContext(DataContext);

  const filteredActivities = filteredBookedActivities(
    dataActivities,
    bookedSortingOptions
  );

  return (
    <View className="flex-1 items-center h-full ">
      <GradientBackground />
      <BookedSortingOptions
        bookedSortingOptions={bookedSortingOptions}
        setBookedSortingOptions={setBookedSortingOptions}
      />
      {filteredActivities.length > 0 ? (
        <ScrollView
          className=""
          contentContainerStyle={{
            width: "100%",
            paddingBottom: 110,
            paddingTop: 65,
          }}
          showsVerticalScrollIndicator={false}
        >
          {filteredActivities.map((activity) => (
            <ActivityBookedCard
              key={activity.id}
              activity={activity}
              type={bookedSortingOptions}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <View>
            <Text className="text-darkerGreen text-base font-medium ">
              No activity booked
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
