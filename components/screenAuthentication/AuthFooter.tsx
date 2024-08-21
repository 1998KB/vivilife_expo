import React from "react";
import { Text, View, Pressable, TouchableOpacity } from "react-native";

interface AuthFooterProps {
  isLogin: boolean;
  onToggle: () => void;
  onSubmit: () => void;
  buttonText: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  isLogin,
  onToggle,
  onSubmit,
  buttonText,
}) => (
  <View className="mt-10 items-center">
    <TouchableOpacity
      onPress={onSubmit}
      className="w-full p-2 bg-darkerGreen h-14 rounded-xl flex flex-row justify-center items-center"
    >
      <Text className="text-yellow text-lg font-medium">{buttonText}</Text>
    </TouchableOpacity>
    <View className="flex flex-row justify-center items-center mt-4">
      <Text className="text-darkerGreen text-sm font-medium">
        {isLogin
          ? "Don't you have an account?"
          : "Do you already have an account?"}
      </Text>
      <Text
        onPress={onToggle}
        className="text-darkGreen text-sm font-bold ml-1"
      >
        {isLogin ? "Sign Up" : "Log In"}
      </Text>
    </View>
  </View>
);

export default AuthFooter;
