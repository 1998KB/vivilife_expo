import React from "react";
import { View, TextInput, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isPassword?: boolean;
  onPress?: (event: GestureResponderEvent) => void; // for handling touch events
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  isPassword = false,
  onPress,
}) => (
  <View className="relative mb-4 w-full">
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#a0a0a0"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      onPressIn={onPress}
      className="text-left text-darkerGreen h-14 border bg-white focus:bg-yellow border-darkerGreen focus:border-2 focus:border-darkGreen rounded-xl pl-12"
    />
    <Ionicons
      name={icon}
      size={24}
      color="#094505"
      style={{
        position: "absolute",
        left: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
      }}
    />
  </View>
);

export default InputField;
