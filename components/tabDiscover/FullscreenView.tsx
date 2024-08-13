import { View, Text, Pressable } from "react-native";
import React from "react";
import DetailsCardFullscreen from "@/components/DetailsCardFullscreen";
import { Activity } from "@/types";

const FullscreenView = ({
  card,
  setModalVisible,
}: {
  card: Activity;
  setModalVisible: (visible: boolean) => void;
}) => (
  <Pressable
    onPress={() => setModalVisible(false)}
    className="flex-1 justify-center items-center"
  >
    <DetailsCardFullscreen card={card} />
    <Text className="absolute text-gray-400 text-opacity-50 font-medium text-center text-lg top-20">
      Tap anywhere to go back
    </Text>
  </Pressable>
);

export default FullscreenView;
