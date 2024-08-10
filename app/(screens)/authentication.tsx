import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmail, signUpWithEmail } from "@/helper/authentication";
import GradientBackground from "@/components/GradientBackground";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
      <GradientBackground />
      <View className="w-full max-w-md p-4">
        {login ? (
          <Text className="text-4xl font-bold mb-4 text-center text-darkerGreen">
            Login
          </Text>
        ) : (
          <Text className="text-4xl font-bold mb-4 text-center text-darkerGreen">
            Sign Up
          </Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          className="h-12 border bg-white border-lightGreen focus:border-darkGreen rounded-xl p-2 mb-4"
        />

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="h-12 border bg-white border-lightGreen focus:border-darkGreen rounded-xl p-2 mb-4"
        />
        {login && (
          <Pressable
            onPress={() => signInWithEmail(email, password)}
            className="w-full p-2 bg-lightGreen  h-12 rounded-xl flex flex-row justify-center items-center"
          >
            <Text className="text-darkerGreen text-lg font-medium ">
              Log in
            </Text>
          </Pressable>
        )}
        <Text className="text-darkerGreen text-sm font-medium my-4 text-center ">
          Or log in with
        </Text>
        <Pressable className="w-full p-2 bg-darkGreen  h-12 rounded-xl flex flex-row justify-center items-center">
          <AntDesign name="google" size={24} color="black" />
          <Text className="ml-4 text-lightGreen text-lg font-medium ">
            Log in with Google
          </Text>
        </Pressable>
        {login ? (
          <>
            <Text className="text-darkerGreen text-sm font-medium my-4 text-center ">
              Don't you have an account
            </Text>
            <Pressable
              onPress={() => setLogin(!login)}
              className="w-full p-2 bg-darkerGreen  h-12 rounded-xl flex flex-row justify-center items-center"
            >
              <Text className="text-lightGreen text-lg font-medium ">
                Sign Up
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={() => signUpWithEmail(email, password)}
            className="w-full p-2 bg-lightGreen  h-12 rounded-xl flex flex-row justify-center items-center mt-4"
          >
            <Text className="text-darkerGreen text-base font-medium ">
              Sign Up
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default authentication;
