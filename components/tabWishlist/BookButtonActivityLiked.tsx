import { Text, Pressable, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Activity } from "@/types";

interface BookButtonActivityLikedProps {
  peopleBooked: number;
  activity: Activity;
}

const BookButtonActivityLiked = ({
  peopleBooked,
  activity,
}: BookButtonActivityLikedProps) => {
  const router = useRouter();
  const handleBooking = () => {
    router.push({
      pathname: "/booking",
      params: {
        id: activity.id,
      },
    });
  };
  return (
    <Pressable
      onPress={handleBooking}
      className="bg-lightGreen w-full h-16 rounded-b-xl flex flex-row justify-between items-center px-4"
    >
      <Text className="text-darkerGreen text-base font-medium ">
        Book with {peopleBooked} others
      </Text>
      <Image
        className="w-16  h-6"
        source={require("./../../assets/icons/ProfilePhotos.png")}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default BookButtonActivityLiked;
