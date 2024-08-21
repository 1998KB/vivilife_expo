import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface WishlistSortingOptionsProps {
  wishlistSortOption: "date" | "distance";
  setWishlistSortOption: (option: "date" | "distance") => void;
}

const WishlistSortingOptions = ({
  wishlistSortOption,
  setWishlistSortOption,
}: WishlistSortingOptionsProps) => {
  return (
    <View className="absolute z-10 bg-gray-50 border border-gray-200 rounded-3xl p-1 mt-2 ">
      <View className=" flex flex-row items-center justify-center ">
        {/* <View className="py-2 px-4 rounded-2xl">
          <Text className=" ">Sort by</Text>
        </View> */}
        <TouchableOpacity
          onPress={() => setWishlistSortOption("date")}
          className={`py-2 px-4 rounded-2xl ${wishlistSortOption === "date" ? " bg-customGreen border border-gray-400 " : "bg-gray-50"}`}
        >
          <Text
            className={` ${wishlistSortOption === "date" ? "text-white " : "text-gray-500"}`}
          >
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setWishlistSortOption("distance")}
          className={`py-2 px-4 rounded-2xl  ${wishlistSortOption === "distance" ? " bg-customGreen border border-gray-400" : "bg-gray-50"}`}
        >
          <Text
            className={` ${wishlistSortOption === "distance" ? "text-white" : "text-gray-500"}`}
          >
            Distance
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistSortingOptions;
