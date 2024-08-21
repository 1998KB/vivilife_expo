import React, { createContext, ReactNode, useState, useEffect } from "react";
import { Activity } from "@/types";
import { useAuth } from "./authProvider";
import { useFetchUserActivities } from "@/hooks/useFetchUserActivities";
import { useFetchActivities } from "@/hooks/useFetchActivities";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataProviderType {
  discoverActivities: Activity[];
  wishlistActivities: Activity[];
  bookedActivities: Activity[];
  setDiscoverActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setWishlistActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setBookedActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const defaultProviderValue: DataProviderType = {
  discoverActivities: [],
  wishlistActivities: [],
  bookedActivities: [],
  setDiscoverActivities: () => {},
  setWishlistActivities: () => {},
  setBookedActivities: () => {},
};

export const DataContext =
  createContext<DataProviderType>(defaultProviderValue);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  const [discoverActivities, setDiscoverActivities] = useState<Activity[]>([]);
  const [wishlistActivities, setWishlistActivities] = useState<Activity[]>([]);
  const [bookedActivities, setBookedActivities] = useState<Activity[]>([]);

  const activitiesWithDistance = useFetchActivities();
  useEffect(() => {
    setDiscoverActivities(activitiesWithDistance);
  }, [activitiesWithDistance]);

  const {
    wishlistActivities: fetchedWishlistActivities,
    bookedActivities: fetchedBookedActivities,
  } = useFetchUserActivities(currentUser?.uid || null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (currentUser) {
        setWishlistActivities(fetchedWishlistActivities);
        setBookedActivities(fetchedBookedActivities);
      } else {
        try {
          const storedData = await AsyncStorage.getItem("savedActivities");
          const savedActivities = storedData ? JSON.parse(storedData) : [];
          setWishlistActivities(savedActivities);
        } catch (error) {
          console.error("Error fetching data from AsyncStorage:", error);
        }
      }
    };

    fetchActivities();
  }, [currentUser, fetchedWishlistActivities, fetchedBookedActivities]);

  
  return (
    <DataContext.Provider
      value={{
        discoverActivities,
        wishlistActivities,
        bookedActivities,
        setDiscoverActivities,
        setWishlistActivities,
        setBookedActivities,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
