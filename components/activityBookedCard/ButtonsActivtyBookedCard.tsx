import { View, Text, Pressable, Share } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ButtonsActivtyBookedCardProps {
  type: "upcoming" | "attended";
}

const ButtonsActivtyBookedCard = ({ type }: ButtonsActivtyBookedCardProps) => {
  return (
    <View className="flex">
      <View className="border-dashed border border-greenLowKey" />
      {type === "upcoming" ? (
        <>
          <View className="flex flex-row items-center justify-between p-4">
            <Text className="text-greenLowKey text-base">Add to calendar</Text>
            <AntDesign name="calendar" size={24} color="#157A6E" />
          </View>
          <View className="border-dashed border border-greenLowKey" />
          <View className="flex flex-row items-center justify-between p-4">
            <Text className="text-greenLowKey text-base">View on map</Text>
            <FontAwesome name="map-o" size={24} color="#157A6E" />
          </View>
        </>
      ) : (
        <>
          <Pressable className="flex flex-row items-center justify-between p-4">
            <Text className="text-greenLowKey text-base">
              Share your experience
            </Text>
            <SimpleLineIcons name="people" size={24} color="#157A6E" />
          </Pressable>
          <View className="border-dashed border border-greenLowKey" />

          <View className="flex flex-row items-center justify-between p-4">
            <Text className="text-greenLowKey text-base">
              Rate this experience
            </Text>
            <AntDesign name="staro" size={24} color="#157A6E" />
          </View>
        </>
      )}

      <View className="border-dashed border border-greenLowKey" />
      <Pressable className="flex flex-row items-center justify-between p-4">
        <Text className="text-greenLowKey text-base">
          Get help for this event
        </Text>
        <AntDesign name="questioncircleo" size={24} color="#157A6E" />
      </Pressable>
    </View>
  );
};

export default ButtonsActivtyBookedCard;
