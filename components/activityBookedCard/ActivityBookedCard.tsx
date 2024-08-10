import { View } from "react-native";
import React from "react";
import { Activity } from "@/types";
import InfoActivity from "../InfoActivity";
import HeaderActivtyBookedCard from "./HeaderActivtyBookedCard";
import ButtonsActivtyBookedCard from "./ButtonsActivtyBookedCard";
import ImageActivityInfo from "../ImageActivityInfo";

interface BookedCardProps {
  activity: Activity;
  type: "upcoming" | "attended";
}

const ActivityBookedCard = ({ activity, type }: BookedCardProps) => {
  return (
    <View className="bg-white rounded-xl w-11/12 mb-4">
      <HeaderActivtyBookedCard
        type={type}
        peopleBooked={activity.peopleBooked}
      />
      <ImageActivityInfo
        imageUri={activity.imageUri}
        title={activity.title}
        description={activity.description}
        height={260}
      />
      <InfoActivity
        time={activity.time}
        date={activity.date}
        distance={activity.distance}
        price={activity.price}
        isBooked={activity.booked}
      />
      <ButtonsActivtyBookedCard type={type} />
    </View>
  );
};

export default ActivityBookedCard;
