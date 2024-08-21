import React from "react";
import { View, Text, Alert } from "react-native";
import { formatDate, formatTime } from "../utils/datesTimeManipulation";

interface InfoActivityProps {
  dateTime: string;
  distance: number | undefined;
  price: number;
  isBooked?: boolean;
}

const InfoActivity = ({
  dateTime,
  distance,
  price,
  isBooked = false,
}: InfoActivityProps) => {
  const formattedDate = formatDate(dateTime);
  const formattedTime = formatTime(dateTime);

  return (
    <View className="w-full  flex flex-row justify-between items-center px-4 py-4">
      <View>
        <Text className="text-base">{formattedTime}</Text>
        <Text>{formattedDate}</Text>
      </View>
      <View>
        <Text className="text-base">{distance}</Text>
        <Text>Km away</Text>
      </View>
      <View>
        <Text className="text-base">{price}kr</Text>
        <Text>{isBooked ? "Paid" : "Per adult"}</Text>
      </View>
    </View>
  );
};

export default InfoActivity;
