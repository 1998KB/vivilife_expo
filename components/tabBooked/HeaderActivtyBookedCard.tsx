import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

interface HeaderActivityBookedCardProps {
  type: "upcoming" | "attended";
  peopleBooked: number;
}

const HeaderActivtyBookedCard = ({
  type,
  peopleBooked,
}: HeaderActivityBookedCardProps) => {
  return (
    <View className="pr-1 pl-3 pt-1 flex flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-2 py-1">
        <AntDesign name="check" size={20} color="#157A6E" />
        {type === "upcoming" ? (
          <Text className="text-greenLowKey text-base">Confirmed</Text>
        ) : (
          <Text className="text-greenLowKey text-base">
            Attended with {peopleBooked} other people
          </Text>
        )}
      </View>
      {type === "upcoming" && (
        <Pressable className="bg-lightGreen py-2 px-3 rounded-lg flex flex-row	">
          <Text className="text-darkerGreen mr-2">Invite friends</Text>
          <FontAwesome5 name="user-friends" size={14} color="#094505" />
        </Pressable>
      )}
    </View>
  );
};

export default HeaderActivtyBookedCard;
