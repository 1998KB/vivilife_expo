import { View, Text } from "react-native";
import React from "react";
import { Activity } from "@/types";
import { AntDesign } from "@expo/vector-icons";

const RegularView = ({
  card,
  formattedDate,
}: {
  card: Activity;
  formattedDate: string;
}) => (
  <>
    <View className=" flex flex-row justify-between mx-4 my-4">
      <Text className="text-yellow text-xl font-bold">{formattedDate}</Text>
      <View className="flex flex-row items-center gap-2">
        <AntDesign name="clockcircle" size={16} color="#F3FF90" />
        <Text className="text-yellow font-bold text-lg">{card.time}</Text>
      </View>
    </View>
    <View className="absolute bottom-8 left-0 right-0 flex items-center justify-center flex-row gap-2">
      <Text className="text-yellow text-3xl font-bold">{card.title}</Text>
    </View>
  </>
);

export default RegularView;
