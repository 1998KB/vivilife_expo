import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { formatDate } from "../../helper/datesHelperFunctions";
import { Activity } from "@/types";
import DetailsCardFullscreen from "../DetailsCardFullscreen";

interface InfoActivitySwipingProps {
  card: Activity;
  fullscreen?: boolean;
  setModalVisible: (b: boolean) => void;
}

const InfoActivitySwiping = ({
  card,
  fullscreen,
  setModalVisible,
}: InfoActivitySwipingProps) => {
  const formattedDate = formatDate(card.date);

  return (
    <View className="h-full">
      {fullscreen !== true ? (
        <>
          <View className=" flex flex-row justify-between mx-4 my-4">
            <Text className="text-yellow text-xl font-bold">
              {formattedDate}
            </Text>
            <View className="flex flex-row items-center gap-2">
              <AntDesign name="clockcircle" size={16} color="#F3FF90" />
              <Text className="text-yellow font-bold text-lg">{card.time}</Text>
            </View>
          </View>
          <View className="absolute bottom-8 left-0 right-0 flex items-center justify-center flex-row gap-2">
            <Text className="text-yellow text-3xl font-bold">{card.title}</Text>
          </View>
        </>
      ) : (
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex h-screen justify-center items-center"
        >
          <DetailsCardFullscreen card={card} />
          <Text className="absolute text-gray-400 text-opacity-50 font-medium text-center text-lg top-20">
            Tap anywere to go back
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default InfoActivitySwiping;
