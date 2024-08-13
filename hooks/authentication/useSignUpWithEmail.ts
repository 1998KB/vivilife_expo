import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { beautifyError } from "@/utils/beutifyError";

export const useSignUpWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Alert.alert(
      "Success",
      "User signed up successfully!",
      [{ text: "OK", onPress: () => router.push("/booked") }],
      { cancelable: false }
    );
    console.log("User signed up successfully!");
  } catch (error) {
    Alert.alert("Error", beautifyError(error), [{ text: "OK" }], {
      cancelable: false,
    });
    console.log("Error signing up:", (error as Error).message);
  }
};
