import React from "react";
import { View } from "react-native";
import { Activity } from "@/types";
import RegularView from "./RegularView";
import FullscreenView from "./FullscreenView";
import { formatDate } from "@/utils/datesTimeManipulation";

interface InfoActivitySwipingProps {
  card: Activity;
  fullscreen?: boolean;
  setModalVisible: (visible: boolean) => void;
}

const InfoActivitySwiping = ({
  card,
  fullscreen = false,
  setModalVisible,
}: InfoActivitySwipingProps) => {
  return (
    <View className="h-full">
      {fullscreen ? (
        <FullscreenView card={card} setModalVisible={setModalVisible} />
      ) : (
        <RegularView card={card} />
      )}
    </View>
  );
};

export default InfoActivitySwiping;
