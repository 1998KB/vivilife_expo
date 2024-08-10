import { Image, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <View className="bg-transparent w-full h-full  p px-2 pb-2 flex flex-row items-center justify-between">
      <Image
        className="w-24 h-8"
        source={require("./../assets/images/Logo.png")}
        resizeMode="contain"
      />
      <AntDesign name="questioncircle" size={24} color="#059212" />
    </View>
  );
};

export default Header;
