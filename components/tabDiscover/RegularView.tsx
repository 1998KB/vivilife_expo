import { View, Text } from "react-native";
import React from "react";
import { Activity } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { formatDate, formatTime } from "@/utils/datesTimeManipulation";

const RegularView = ({ card }: { card: Activity }) => {
  const formattedDate = formatDate(card.dateTime);
  const formattedTime = formatTime(card.dateTime);

  return (
    <>
      <View className=" flex flex-row justify-between mx-4 my-4">
        <Text className="text-yellow text-xl font-bold">{formattedDate}</Text>
        <View className="flex flex-row items-center gap-2">
          <AntDesign name="clockcircle" size={16} color="#F3FF90" />
          <Text className="text-yellow font-bold text-lg">{formattedTime}</Text>
        </View>
      </View>
      <View className="absolute bottom-4 left-0 right-0 flex items-center justify-center flex-row gap-2">
        <Text className="text-yellow text-3xl font-semibold">{card.title}</Text>
      </View>
    </>
  );
};

export default RegularView;
