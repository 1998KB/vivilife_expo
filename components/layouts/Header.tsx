import { Image, Pressable, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();
  return (
    <View className="bg-transparent w-full h-full  p px-2 pb-2 flex flex-row items-center justify-between">
      <Image
        className="w-24 h-8"
        source={require("./../../assets/images/Logo.png")}
        resizeMode="contain"
      />
      <Pressable hitSlop={60} onPress={() => router.navigate("/setting")}>
        <Ionicons name="settings" size={24} color="#059212" />
      </Pressable>
    </View>
  );
};

export default Header;
