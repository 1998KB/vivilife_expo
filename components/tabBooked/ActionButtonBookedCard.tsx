import { View, Text, Pressable } from "react-native";
import React from "react";

const ActionButtonBookedCard = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="flex flex-row items-center justify-between p-4"
  >
    <Text className="text-greenLowKey text-base">{label}</Text>
    {icon}
  </Pressable>
);

export default ActionButtonBookedCard;
