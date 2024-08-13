import React from "react";
import { Text, View, Pressable } from "react-native";

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
  <View className="mt-6 items-center">
    <Pressable
      onPress={onSubmit}
      className="w-full p-2 bg-lightGreen h-12 rounded-xl flex flex-row justify-center items-center"
    >
      <Text className="text-darkerGreen text-lg font-medium">{buttonText}</Text>
    </Pressable>
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
