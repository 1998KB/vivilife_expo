import React, { forwardRef } from "react";
import { View, TextInput, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isPassword?: boolean;
  isBirthday?: boolean;
  isVisible?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      icon,
      isPassword = false,
      isBirthday = true,
      isVisible = false,
      onPress,
    },
    ref
  ) => {
    return (
      <View className="relative mb-4 w-full">
        <TextInput
          ref={ref}
          editable={isBirthday}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          onPressIn={onPress}
          className={`text-left h-14 border rounded-xl pl-12 bg-white border-darkerGreen 
                    focus:bg-yellow focus:border-2 focus:border-darkerGreen
                     ${isVisible && "bg-yellow border-2 border-darkerGreen"}`}
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
  }
);

export default InputField;
