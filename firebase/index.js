import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB8fBmSuXkhYXUvDEO78t0l3lAaC7DRqP8",
  authDomain: "vivilife-f75b9.firebaseapp.com",
  projectId: "vivilife-f75b9",
  storageBucket: "vivilife-f75b9.appspot.com",
  messagingSenderId: "529786696751",
  appId: "1:529786696751:web:163dcb346f87b7a50342da",
  measurementId: "G-SDB9BP5GNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
