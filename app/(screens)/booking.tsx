import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DataContext } from "@/contexts/dataProvider";
import DetailsCardFullscreen from "@/components/DetailsCardFullscreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageWithGradient from "@/components/layouts/ImageWithGradient";
import { Activity } from "@/types";
import { useUsersApi } from "@/services/api/usersApi";
import { useAuth } from "@/contexts/authProvider";

const Booking = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { activity, origin } = params;
  const { setWishlistActivities } = useContext(DataContext);
  const [activityCard, setActivityCard] = useState<Activity | null>(null);
  const { currentUser } = useAuth();
  const usersApi = useUsersApi();

  useEffect(() => {
    if (activity) {
      try {
        const parsedActivity = JSON.parse(activity as string) as Activity;
        setActivityCard(parsedActivity);
      } catch (error) {
        console.error("Error parsing activity data:", error);
      }
    }
  }, [activity]);

  if (!activityCard) {
    return (
      <View className="w-screen h-screen justify-center items-center">
        <Text className="text-red-500 text-lg">Activity not found.</Text>
      </View>
    );
  }

  const handleConfirmBooking = async () => {
    if (!currentUser) {
      router.push("/authentication");
      return;
    }
    router.push("/checkout");
  };

  const handleWishlistSaving = async () => {
    const updatedActivityCard = { ...activityCard, liked: true };
    if (currentUser) {
      await usersApi.addToWishlist(currentUser?.uid, updatedActivityCard);
    } else {
      try {
        const storedData = await AsyncStorage.getItem("savedActivities");
        const savedActivities = storedData ? JSON.parse(storedData) : [];
        const updatedActivities = [...savedActivities, updatedActivityCard];
        await AsyncStorage.setItem(
          "savedActivities",
          JSON.stringify(updatedActivities)
        );
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    }
    setWishlistActivities((prevWishlist) => [
      ...prevWishlist,
      updatedActivityCard,
    ]);
    router.back();
  };

  return (
    <SafeAreaView className=" flex-1 justify-center items-center">
      <ImageWithGradient
        imageUri={activityCard.imageUrl}
        gradientColors={[
          "rgba(0,0,0,.8)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,.8)",
        ]}
      />

      <DetailsCardFullscreen card={activityCard} />
      <View className="flex flex-row justify-between px-4 mt-10">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleConfirmBooking}
          className="w-full p-2 bg-lightGreen h-14 rounded-xl flex flex-row justify-center items-center"
        >
          <Text className="text-darkerGreen text-base font-medium">
            Book now
          </Text>
        </TouchableOpacity>
      </View>
      {origin === "discover" ? (
        <View className="flex items-center mt-6">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleWishlistSaving}
            className="w-16 h-16 p-4 border-2 border-lightGreen rounded-full flex flex-row justify-center items-center"
          >
            <AntDesign name="heart" size={24} color="#9BEC00" />
          </TouchableOpacity>
          <Text className="text-lightGreen mt-2">Save to wishlist</Text>
        </View>
      ) : origin === "wishlist" ? (
        <Pressable
          onPress={() => router.back()}
          className="p-3 h-14 rounded-xl flex flex-row justify-center items-center"
        >
          <Text className="text-lightGreen font-medium text-lg underline">
            Go back to wishlist
          </Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};

export default Booking;
