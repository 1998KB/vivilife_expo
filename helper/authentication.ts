import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully!");
  } catch (error) {
    console.error("Error signing up:", (error as Error).message);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully!");
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out successfully!");
  } catch (error) {
    console.error("Error signing out:", (error as Error).message);
  }
};
