import React, { useState } from "react";
import { View } from "react-native";
import BookButtonActivityLiked from "./BookButtonActivityLiked";
import { Activity } from "@/types";
import ImageActivityInfo from "../ImageActivityInfo";
import InfoActivity from "@/components/InfoActivity";

interface ActivityLikedCardProps {
  activity: Activity;
  onToggleLike: (id: number) => void;
}

const ActivityLikedCard = ({
  activity,
  onToggleLike,
}: ActivityLikedCardProps) => {
  const [liked, setLiked] = useState(activity.liked);

  const handleToggleLike = () => {
    setLiked(!liked);
    onToggleLike(activity.id);
  };

  return (
    <View className="bg-white rounded-xl w-11/12  flex flex-col justify-between relative overflow-hidden mb-4">
      <ImageActivityInfo
        imageUri={activity.imageUri}
        title={activity.title}
        description={activity.description}
        isLiked={liked}
        onToggleLike={handleToggleLike}
        height={180}
      />
      <InfoActivity
        time={activity.time}
        date={activity.date}
        distance={activity.distance}
        price={activity.price}
      />
      <BookButtonActivityLiked
        peopleBooked={activity.peopleBooked}
        activity={activity}
      />
    </View>
  );
};

export default ActivityLikedCard;
