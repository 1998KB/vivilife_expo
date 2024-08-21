import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface BookedSortingOptionsProps {
  bookedSortingOptions: "upcoming" | "attended";
  setBookedSortingOptions: (option: "upcoming" | "attended") => void;
}

const BookedSortingOptions = ({
  bookedSortingOptions,
  setBookedSortingOptions,
}: BookedSortingOptionsProps) => {
  return (
    <View className="absolute z-10 bg-gray-50 border border-gray-200 rounded-3xl p-1 mt-2">
      <View className=" flex flex-row items-center justify-center ">
        <TouchableOpacity
          onPress={() => setBookedSortingOptions("upcoming")}
          className={`py-2 px-4 rounded-2xl ${bookedSortingOptions === "upcoming" ? "bg-customGreen border border-gray-400" : "bg-gray-50"}`}
        >
          <Text
            className={` ${bookedSortingOptions === "upcoming" ? "text-white" : "text-gray-500"}`}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setBookedSortingOptions("attended")}
          className={`py-2 px-4 rounded-2xl  ${bookedSortingOptions === "attended" ? "bg-customGreen border border-gray-400" : "bg-gray-50"}`}
        >
          <Text
            className={` ${bookedSortingOptions === "attended" ? "text-white" : "text-gray-500"}`}
          >
            Attended
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookedSortingOptions;
