import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import GradientBackground from "@/components/layouts/GradientBackground";
import { useSignOutUser } from "@/hooks/authentication/useSignOut";

const Setting = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full w-full">
      <GradientBackground />
      <View className="flex-1 w-full h-full p-4 ">
        {/* Header with Back Button */}
        <View className="mb-6 relative">
          <Pressable
            hitSlop={60}
            onPress={() => router.back()}
            className="absolute z-10"
          >
            <Ionicons name="arrow-back" size={24} color="#094505" />
          </Pressable>
          <Text className="text-2xl font-bold text-darkerGreen text-center">
            Settings
          </Text>
        </View>

        {/* Settings Card */}
        <View className=" bg-white p-4 rounded-xl shadow-md  mb-6">
          {/* Login and Security Section */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-lightGreen px-6 py-4">
              Login and Security
            </Text>
            <TouchableOpacity className="flex-row items-center px-6 py-4   ">
              <Ionicons name="person" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
                Username
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#9bec00" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-6 py-4  ">
              <MaterialIcons name="email" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
                Email
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#9bec00" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-6 py-4 ">
              <Ionicons name="lock-closed" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-3">
                Password
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#9bec00" />
            </TouchableOpacity>
          </View>

          {/* Data and Permission Section */}
          <View>
            <Text className="text-base font-semibold text-lightGreen px-6 py-4 ">
              Data and Permission
            </Text>
            <TouchableOpacity className="flex-row items-center px-6 py-4  ">
              <MaterialIcons name="location-on" size={24} color="#094505" />
              <Text className="flex-1 text-lg font-medium text-darkerGreen ml-4">
                Location
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#9bec00" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={useSignOutUser}
          className="flex-row items-center justify-center py-4 bg-darkerGreen rounded-xl shadow-md "
        >
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="#ffffff"
          />
          <Text className="text-lg font-medium text-white ml-2 ">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
