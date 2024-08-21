import React, { useState } from "react";
import { View } from "react-native";
import BookButtonActivityLiked from "./BookButtonActivityLiked";
import { Activity } from "@/types";
import ImageActivityInfo from "../ImageActivityInfo";
import InfoActivity from "@/components/InfoActivity";
import { useUsersApi } from "@/services/api/usersApi";
import { useAuth } from "@/contexts/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ActivityLikedCardProps {
  activity: Activity;
  onToggleLike: (id: string) => void;
}

const ActivityLikedCard = ({
  activity,
  onToggleLike,
}: ActivityLikedCardProps) => {
  const [liked, setLiked] = useState(activity.liked);
  const userApi = useUsersApi();
  const { currentUser } = useAuth();

const handleToggleLike = async () => {
  const newLikedStatus = !liked;
  setLiked(newLikedStatus);
  onToggleLike(activity.id);
  if (currentUser) {
    try {
      await userApi.updateWishlistActivity(currentUser.uid, activity.id, {
        liked: newLikedStatus,
      });
    } catch (error) {
      console.error("Error updating liked status in database:", error);
      setLiked(liked);
    }
  } else {
    try {
      const storedData = await AsyncStorage.getItem("savedActivities");
      const savedActivities = storedData ? JSON.parse(storedData) : [];
      const updatedActivities = savedActivities.map((activity: Activity) =>
        activity.id === activity.id
          ? { ...activity, liked: newLikedStatus }
          : activity
      );
      if (!savedActivities.some((act: Activity) => act.id === activity.id)) {
        updatedActivities.push({ ...activity, liked: newLikedStatus });
      }
      await AsyncStorage.setItem(
        "savedActivities",
        JSON.stringify(updatedActivities)
      );
    } catch (error) {
      console.error("Error updating local storage:", error);
      setLiked(liked);
    }
  }
};

  return (
    <View className="bg-gray-50 rounded-xl w-11/12  flex flex-col justify-between relative overflow-hidden mb-4">
      <ImageActivityInfo
        imageUri={activity.imageUrl}
        title={activity.title}
        description={activity.description}
        isLiked={liked}
        onToggleLike={handleToggleLike}
        height={180}
      />
      <InfoActivity
        dateTime={activity.dateTime}
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
