import { auth } from "@/firebase";
import { beautifyError } from "@/utils/beutifyError";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Alert } from "react-native";

export const useSignOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    Alert.alert(
      "Success",
      "You've logged out!",
      [{ text: "OK", onPress: () => router.push("/discover") }],
      { cancelable: false }
    );
    console.log("User signed out successfully!");
  } catch (error) {
    Alert.alert("Error", beautifyError(error), [{ text: "OK" }], {
      cancelable: false,
    });
  }
};
