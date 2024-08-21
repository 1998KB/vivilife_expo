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
import { Activity } from "@/types";
import { useUsersApi } from "@/services/api/usersApi";

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
  const usersApi = useUsersApi();

  const signIn = async (email: string, password: string) => {
    try {
      // Sign in the user
      await signInWithEmailAndPassword(auth, email, password);

      // Wait for user authentication state to update
      const user = auth.currentUser;

      // Ensure that the user is set
      if (!user) {
        throw new Error("User is not authenticated");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User signed in successfully!",
      });

      setTimeout(() => {
        router.back();
      }, 2000);

      const storedData = await AsyncStorage.getItem("savedActivities");
      const savedActivities = storedData ? JSON.parse(storedData) : [];

      if (savedActivities.length > 0) {
        await Promise.all(
          savedActivities.map((activity: Activity) => {
            usersApi.addToWishlist(user.uid, activity);
            console.log(activity.liked);
          })
        );
        await AsyncStorage.removeItem("savedActivities");
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
        setTimeout(() => {
          router.back();
        }, 2000);
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
    return signOut(auth)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "You've logged out!",
        });
        console.log("logged out");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: beautifyError(error),
        });
      })
      .finally(() => {
        setCurrentUser(null);
        router.navigate("/discover");
      });
  };

  // Effect to listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
