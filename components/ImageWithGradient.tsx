import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ImageWithGradientProps {
  imageUri: string;
  gradientColors?: string[];
  imageStyle?: object;
}

const defaultGradientColors = [
  "rgba(0,0,0,.8)",
  "rgba(0,0,0,0.2)",
  "rgba(0,0,0,0.2)",
  "rgba(0,0,0,.8)",
];

const ImageWithGradient = ({
  imageUri,
  gradientColors = defaultGradientColors,
  imageStyle = {},
}: ImageWithGradientProps) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Image
        source={{ uri: imageUri }}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradientColors}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
      />
    </View>
  );
};

export default ImageWithGradient;
