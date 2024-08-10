import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ImageWithGradient from "./ImageWithGradient";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ImageActivityInfoProps {
  imageUri: string;
  title: string;
  description: string;
  isLiked?: boolean;
  onToggleLike?: () => void;
  height: number; 
}

const ImageActivityInfo = ({
  imageUri,
  isLiked,
  onToggleLike,
  title,
  description,
  height,
}: ImageActivityInfoProps) => {
  return (
    <View style={{ height }} className="relative mt-1 mx-1">
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
      <View className="absolute bottom-0 left-0 right-0 py-3 px-3 rounded-b-md">
        <Text className="text-white text-lg font-semibold uppercase">
          {title}
        </Text>
        <Text className="text-white text-base font-medium">{description}</Text>
      </View>
    </View>
  );
};

export default ImageActivityInfo;
