import React, { useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DataContext } from "@/contexts/dataContext";
import DetailsCardFullscreen from "@/components/DetailsCardFullscreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageWithGradient from "@/components/layouts/ImageWithGradient";

const Booking = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  const { dataActivities, setDataActivities } = useContext(DataContext);

  const activityCard = dataActivities.find(
    (activity) => activity.id === Number(id)
  );

  if (!activityCard) {
    return (
      <View className="w-screen h-screen justify-center items-center">
        <Text className="text-red-500 text-lg">Activity not found.</Text>
      </View>
    );
  }

  const handleConfirmBooking = async () => {
    console.log(auth.currentUser?.email);
    if (!auth.currentUser) {
      router.push("/authentication");
      return;
    }

    const updatedActivities = dataActivities.map((activity) =>
      activity.id === Number(id)
        ? {
            ...activity,
            booked: true,
            deck: false,
            peopleBooked: activity.peopleBooked + 1,
          }
        : activity
    );

    setDataActivities(updatedActivities);
    router.push("/booked");
  };

  const handleWishlistSaving = async () => {
    const updatedActivities = dataActivities.map((activity) =>
      activity.id === Number(id)
        ? { ...activity, wishlist: true, liked: true, deck: false }
        : activity
    );
    setDataActivities(updatedActivities);
    try {
      await AsyncStorage.setItem(
        "dataActivities",
        JSON.stringify(updatedActivities)
      );
      console.log("Data saved AsyncStorage:");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
    const storedData = await AsyncStorage.getItem("dataActivities");
    console.log(storedData);
    router.push("/wishlist");
  };

  const handleBack = () => {
    router.push("/wishlist");
  };

  return (
    <View className="w-screen h-screen absolute bottom-0 justify-center items-left ">
      <ImageWithGradient
        imageUri={activityCard.imageUri}
        gradientColors={[
          "rgba(0,0,0,.8)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,.8)",
        ]}
      />

      <DetailsCardFullscreen card={activityCard} />
      <View className="flex flex-row justify-between px-4 mt-10">
        <Pressable
          onPress={handleConfirmBooking}
          className="w-full p-2 bg-lightGreen  h-14 rounded-xl flex flex-row justify-center items-center    "
        >
          <Text className="text-darkerGreen text-base font-medium ">
            Book now
          </Text>
        </Pressable>
      </View>
      {activityCard.wishlist === false && (
        <View className="flex items-center mt-6">
          <Pressable
            onPress={handleWishlistSaving}
            className=" w-20 h-20 p-4 border-2 border-lightGreen  rounded-full flex flex-row justify-center items-center "
          >
            <AntDesign name="heart" size={32} color="#9BEC00" />
          </Pressable>
        </View>
      )}
      {activityCard.wishlist !== false && (
        <Pressable
          onPress={handleBack}
          className="p-3  h-14 rounded-xl flex flex-row justify-center items-center"
        >
          <Text className="text-lightGreen font-medium text-lg underline ">
            Go back to wishlist
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Booking;
