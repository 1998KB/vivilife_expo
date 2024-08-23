import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { beautifyError } from "@/utils/beutifyError";
import { useApi } from "@/services/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsersApi } from "@/services/api/usersApi";
import { Activity } from "@/types";

// Define the shape of your auth context
interface AuthContextType {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const api = useApi();
const usersApi = useUsersApi();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated");
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User signed in successfully!",
      });

      const storedData = await AsyncStorage.getItem("savedActivities");
      const savedActivities: Activity[] = storedData
        ? JSON.parse(storedData)
        : [];
      if (savedActivities.length > 0) {
        savedActivities.map((a) => console.log(a.id));
        for (const activity of savedActivities) {
          await usersApi.addToWishlist(user.uid, activity);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: beautifyError(error),
      });
      console.log("Error signing in:", (error as Error).message);
    }
  };

  const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "User signed up successfully!",
        });
        console.log("User signed up successfully!");
        api
          .post("users", {
            email,
            wishlist: [],
            booked: [],
          })
          .then(() => console.log("User data posted successfully"))
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: `Error posting user data: ${beautifyError(error)}`,
            });
            console.log(
              "Error posting user dataaaa:",
              (error as Error).message
            );
          });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: beautifyError(error),
        });
        console.log("Error signing up:", (error as Error).message);
      });
  };

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("savedActivities");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You've logged out!",
      });
      console.log("logged out");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: beautifyError(error),
      });
    } finally {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
