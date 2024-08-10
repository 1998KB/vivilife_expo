import { View, Text } from "react-native";
import React from "react";
import { formatDate } from "../helper/datesHelperFunctions";

interface InfoActivityProps {
  time: string;
  date: string;
  distance: number;
  price: number;
  isBooked?: boolean;
}

const InfoActivity = ({
  time,
  date,
  distance,
  price,
  isBooked = false,
}: InfoActivityProps) => {
  const formattedDate = formatDate(date);

  return (
    <View className="w-full  flex flex-row justify-between items-center px-4 py-4">
      <View>
        <Text className="text-base">{time}</Text>
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
