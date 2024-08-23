import { View } from "react-native";
import React from "react";
import { Activity } from "@/types";
import ImageActivityInfo from "../ImageActivityInfo";
import InfoActivity from "@/components/InfoActivity";
import ButtonsBookedCard from "./ButtonsBookedCard";
import HeaderActivtyBookedCard from "./HeaderActivtyBookedCard";

interface BookedCardProps {
  activity: Activity;
  type: "upcoming" | "attended";
}

const ActivityBookedCard = ({ activity, type }: BookedCardProps) => {
  return (
    <View className="bg-gray-50 rounded-xl w-11/12 mb-4">
      <HeaderActivtyBookedCard
        type={type}
        peopleBooked={activity.peopleBooked}
      />
      <ImageActivityInfo
        imageUri={activity.imageUrl}
        title={activity.title}
        description={activity.description}
        height={260}
      />
      <InfoActivity
        dateTime={activity.dateTime}
        distance={activity.distance}
        price={activity.price}
        isBooked={activity.booked}
      />
      <ButtonsBookedCard type={type} />
    </View>
  );
};

export default ActivityBookedCard;
