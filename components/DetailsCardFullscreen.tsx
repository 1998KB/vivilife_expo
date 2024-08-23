import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Activity } from "@/types";
import InfoActivity from "./InfoActivity";

interface InfoCardFullscreenProp {
  card: Activity;
}

const DetailsCardFullscreen = ({ card }: InfoCardFullscreenProp) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const height = showMoreInfo ? 130 : 0; // Adjust the height based on the showMoreInfo state

    // Animate to the desired height
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showMoreInfo]);

  const toggleMoreInfo = () => {
    setShowMoreInfo((prev) => !prev);
  };

  return (
    <View>
      <View>
        <Text className="text-gray-300 text-lg font-medium text-left mb-2 px-4">
          {card.location}
        </Text>
        <Text className="text-yellow text-3xl font-bold text-left mb-2 px-4">
          {card.title}
        </Text>

        <Text className="text-white text-base font-medium text-left mb-6 px-4">
          Other {card.peopleBooked} people are going
        </Text>
      </View>
      <View className="mb-6 mx-4 rounded-xl bg-white">
        <InfoActivity
          dateTime={card.dateTime}
          distance={card.distance}
          price={card.price}
        />
      </View>
      <View>
        <Text className="text-white text-2xl font-medium text-left mb-2 px-4">
          {card.description}
        </Text>
      </View>

      {/* Always render the Animated.View */}
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <Text className="text-gray-300 text-lg font-medium text-left px-4">
          {card.furtherInformations}
        </Text>
      </Animated.View>

      <TouchableOpacity onPress={toggleMoreInfo} className="px-4">
        <Text className="text-gray-300 text-lg font-medium underline">
          {showMoreInfo ? "Show Less Information" : "Show More Information"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsCardFullscreen;
