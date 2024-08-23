import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageWithGradient from "./layouts/ImageWithGradient";

interface ImageActivityInfoProps {
  imageUri: string;
  title: string;
  description: string;
  isLiked?: boolean;
  onToggleLike?: () => void;
  height: Animated.Value | number; // Animated height
  expanded?: boolean; // Expanded state
  furtherInfo?: string; // Further information
}

const ImageActivityInfo = ({
  imageUri,
  isLiked,
  onToggleLike,
  title,
  description,
  height,
  expanded,
  furtherInfo,
}: ImageActivityInfoProps) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen to the left
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start with opacity 0

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: expanded ? 0 : -300, // Slide in from -200 to 0 if expanded, slide out otherwise
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: expanded ? 1 : 0, // Fade in if expanded, fade out otherwise
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [expanded]);

  return (
    <Animated.View style={{ height }} className="relative m-1">
      <ImageWithGradient
        imageUri={imageUri}
        gradientColors={[
          "rgba(0,0,0,0.2)",
          "rgba(0,0,0,0.4)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.8)",
        ]}
        imageStyle={{ borderRadius: 8 }}
      />
      {isLiked !== undefined && onToggleLike && (
        <TouchableOpacity
          onPress={onToggleLike}
          className="absolute top-0 right-0 p-2 m-3 rounded-full bg-gray-300 border border-white"
        >
          {isLiked ? (
            <AntDesign name="heart" size={18} color="#FF4F44" />
          ) : (
            <AntDesign name="hearto" size={18} color="#FF4F44" />
          )}
        </TouchableOpacity>
      )}
      {/* Keep this view always rendered */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }], // Apply the sliding animation
          opacity: fadeAnim, // Apply the fading animation
        }}
      >
        <View
          className="mt-3 pl-4 pr-2 py-2 w-10/12"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Text className="text-black text-sm">{furtherInfo}</Text>
        </View>
      </Animated.View>
      <View className="absolute bottom-0 left-0 right-0 py-3 px-3 rounded-b-md">
        <Text className="text-white text-lg font-semibold uppercase">
          {title}
        </Text>
        <Text className="text-white text-base font-medium">{description}</Text>
      </View>
    </Animated.View>
  );
};

export default ImageActivityInfo;
