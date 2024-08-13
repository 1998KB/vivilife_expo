import React from "react";
import { View } from "react-native";
import { Activity } from "@/types";
import { formatDate } from "@/utils/datesManipulation";
import RegularView from "./RegularView";
import FullscreenView from "./FullscreenView";

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
  const formattedDate = formatDate(card.date);

  return (
    <View className="h-full">
      {fullscreen ? (
        <FullscreenView card={card} setModalVisible={setModalVisible} />
      ) : (
        <RegularView card={card} formattedDate={formattedDate} />
      )}
    </View>
  );
};

export default InfoActivitySwiping;
