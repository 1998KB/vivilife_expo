import { useContext, useState, useMemo } from "react";
import { DataContext } from "@/contexts/dataContext";
import { filterBookedActivities } from "@/utils/filters/filterBookedActivities";

export const useBookedActivities = (sortingOption: "upcoming" | "attended") => {
  const { dataActivities } = useContext(DataContext);

  const filteredActivities = useMemo(() => {
    return filterBookedActivities(dataActivities, sortingOption);
  }, [dataActivities, sortingOption]);

  return filteredActivities;
};
