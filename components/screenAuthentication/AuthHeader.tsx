import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => (
  <View className="mb-10 relative">
    <Text className="text-4xl font-bold mb-1 text-center text-darkerGreen">
      {isLogin ? "Welcome Back" : "Sign up"}
    </Text>
    <Text className="mb-6 text-center text-darkerGreen">
      {isLogin ? "Enter your credentials to login" : "Create your account"}
    </Text>
  </View>
);

export default AuthHeader;
