import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useAuth } from "@/contexts/authProvider";
import { SafeAreaView } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import { router } from "expo-router";

const Settings = () => {
  const { currentUser, logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
    setTimeout(() => {
      router.back();
    }, 1500);
  };
  return (
    <SafeAreaView className="h-full w-full">
      <GradientBackground />
      <View className="mb-6 relative bg-customGreenTab w-full p-4">
        {/* <Pressable
            hitSlop={60}
            onPress={() => setModalVisible(false)}
            className="absolute top-1/2 right-4 z-10"
          >
            <Entypo name="cross" size={36} color="#094505" />
          </Pressable> */}
        <Text className="text-2xl  font-bold text-darkerGreen text-center">
          Settings
        </Text>
      </View>
      <View className=" bg-gray-50 m-4 p-4 rounded-xl shadow-md  mb-6">
        {currentUser && (
          <View className="mb-4">
            <Text className="text-base font-semibold text-customGreenTab px-6 py-4">
              Login and Security
            </Text>
            <TouchableOpacity className="flex-row items-center px-6 py-4   ">
              <Ionicons name="person" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
                Username
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="rgba(9, 69, 5, .3)"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-6 py-4  ">
              <MaterialIcons name="email" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
                Email
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="rgba(9, 69, 5, .3)"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-6 py-4 ">
              <Ionicons name="lock-closed" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-3">
                Password
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="rgba(9, 69, 5, .3)"
              />
            </TouchableOpacity>
          </View>
        )}

        <View>
          <Text className="text-base font-semibold text-customGreenTab px-6 py-4 ">
            Data and Permission
          </Text>
          <TouchableOpacity className="flex-row items-center px-6 py-4  ">
            <MaterialIcons name="location-on" size={24} color="#094505" />
            <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
              Location
            </Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="rgba(9, 69, 5, .3)"
            />
          </TouchableOpacity>
        </View>
      </View>
      {currentUser ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogOut}
          className="m-4 flex-row items-center justify-center py-4 bg-darkerGreen rounded-xl shadow-md"
        >
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="#F3FF90"
          />
          <Text className="text-lg font-medium text-yellow ml-2">Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.navigate("/authentication?from=settings");
          }}
          className="m-4 flex-row items-center justify-center py-4 bg-darkerGreen rounded-xl shadow-md"
        >
          <Ionicons name="log-in" size={24} color="#F3FF90" />
          <Text className="text-lg font-medium text-yellow ml-2">Log In</Text>
        </TouchableOpacity>
      )}
      <Toast position="bottom" />
    </SafeAreaView>
  );
};

export default Settings;
