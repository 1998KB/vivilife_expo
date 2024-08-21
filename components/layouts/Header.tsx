import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <View className=" w-full h-full  px-2 pb-2 flex flex-row items-center justify-between">
        <Image
          className="w-24 h-8"
          source={require("./../../assets/images/Logo.png")}
          resizeMode="contain"
        />
        <Pressable hitSlop={60} onPress={() => router.push("/settings")}>
          <Ionicons name="settings" size={24} color="#094505" />
        </Pressable>
      </View>
    </>
  );
};

export default Header;
