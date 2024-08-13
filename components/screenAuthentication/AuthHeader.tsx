import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => (
  <View className="mb-6 relative">
    <Link href={".."} className="absolute z-10 top-2  ">
      <Ionicons name="arrow-back" size={24} color="#094505" />
    </Link>
    <Text className="text-4xl font-bold mb-1 text-center text-darkerGreen">
      {isLogin ? "Welcome Back" : "Sign up"}
    </Text>
    <Text className="mb-6 text-center text-darkerGreen">
      {isLogin ? "Enter your credentials to login" : "Create your account"}
    </Text>
  </View>
);

export default AuthHeader;
