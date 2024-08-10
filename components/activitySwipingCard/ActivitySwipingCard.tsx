import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Modal,
  Pressable,
  SafeAreaView,
  View,
} from "react-native";
import InfoActivitySwiping from "./InfoActivitySwiping";
import ImageWithGradient from "@/components/ImageWithGradient";
import { Activity } from "@/types";

interface ActivitySwipingCardProps {
  card: Activity;
  cardDimensions: { width: number; height: number };
  setCardDimentions: (dimensions: { width: number; height: number }) => void;
}

const ActivitySwipingCard = ({
  card,
  setCardDimentions,
  cardDimensions,
}: ActivitySwipingCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  let handleLayout = (event: LayoutChangeEvent) => {
    if (cardDimensions.width === 0) {
      const { width, height } = event.nativeEvent.layout;
      setCardDimentions({ width, height });
    }
  };

  return (
    <>
      <Pressable
        style={{ height: "70%" }}
        onPress={() => setModalVisible(true)}
      >
        <View
          onLayout={handleLayout}
          className=" w-full rounded-xl overflow-hidden border border-opacity-5 border-stone-400 "
        >
          <ImageWithGradient imageUri={card.imageUri} />
          <InfoActivitySwiping card={card} setModalVisible={() => {}} />
        </View>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        className=""
      >
        <ImageWithGradient
          imageUri={card.imageUri}
          gradientColors={[
            "rgba(0,0,0,.8)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,.8)",
          ]}
        />

        <InfoActivitySwiping
          fullscreen={true}
          card={card}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </>
  );
};

export default ActivitySwipingCard;
