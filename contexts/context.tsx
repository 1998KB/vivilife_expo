import { activities } from "@/content";
import { filterDiscoverActivities } from "@/helper/activityFiltersHelperFunctions";
import { Activity } from "@/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface DataContextType {
  dataActivities: Activity[];
  setDataActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  discoverActivities: Activity[];
  setDiscoverActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}
const defaultContextValue: DataContextType = {
  dataActivities: [],
  setDataActivities: () => {},
  discoverActivities: [],
  setDiscoverActivities: () => {},
};
export const DataContext = createContext<DataContextType>(defaultContextValue);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataActivities, setDataActivities] = useState<Activity[]>(activities);
  const [discoverActivities, setDiscoverActivities] = useState<Activity[]>(
    filterDiscoverActivities(activities)
  );

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         // Replace this URL with your data source
  //         const response = await fetch("https://api.example.com/activities");
  //         const data = await response.json();
  //         setActivities(data);
  //       } catch (error) {
  //         console.error("Failed to fetch data", error);
  //       }
  //     }

  //     fetchData();
  //   }, []);

  return (
    <DataContext.Provider
      value={{
        dataActivities,
        setDataActivities,
        discoverActivities,
        setDiscoverActivities,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
