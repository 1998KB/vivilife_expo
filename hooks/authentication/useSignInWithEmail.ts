import { auth } from "@/firebase";
import { beautifyError } from "@/utils/beutifyError";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

export const useSignInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Alert.alert(
      "Success",
      "User signed in successfully!",
      [{ text: "OK", onPress: () => router.back() }],
      { cancelable: false }
    );
    console.log("User signed in successfully!");
  } catch (error) {
    Alert.alert("Error", beautifyError(error), [{ text: "OK" }], {
      cancelable: false,
    });
    console.log("Error signing up:", (error as Error).message);
  }
};
