import { View, Text, Pressable, Share, Modal } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Divider from "./Divider";
import ActionButtonBookedCard from "./ActionButtonBookedCard";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

interface ButtonsActivtyBookedCardProps {
  type: "upcoming" | "attended";
}

const ButtonsBookedCard = ({ type }: ButtonsActivtyBookedCardProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View className="flex">
        <Divider />
        {type === "upcoming" ? (
          <>
            <ActionButtonBookedCard
              label="Add to calendar"
              icon={<AntDesign name="calendar" size={24} color="#157A6E" />}
            />
            <Divider />
            <ActionButtonBookedCard
              label="View on map"
              icon={<FontAwesome name="map-o" size={24} color="#157A6E" />}
            />
          </>
        ) : (
          <>
            <ActionButtonBookedCard
              label="Share your experience"
              icon={<SimpleLineIcons name="people" size={24} color="#157A6E" />}
              onPress={() => {
                // Implement share functionality
                Share.share({
                  message: "Check out this activity!",
                });
              }}
            />
            <Divider />
            <ActionButtonBookedCard
              label="Rate this experience"
              icon={<AntDesign name="staro" size={24} color="#157A6E" />}
              onPress={() => {
                // Implement rating functionality
              }}
            />
          </>
        )}
        <Divider />
        <ActionButtonBookedCard
          label="Get help for this event"
          icon={<AntDesign name="questioncircleo" size={24} color="#157A6E" />}
          onPress={handlePresentModalPress}
        />
      </View>
    </BottomSheetModalProvider>
  );
};

export default ButtonsBookedCard;
