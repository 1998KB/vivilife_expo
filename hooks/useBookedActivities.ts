import { useContext, useState, useMemo } from "react";
import { DataContext } from "@/contexts/dataProvider";
import { filterBookedActivities } from "@/utils/filters/filterBookedActivities";

export const useBookedActivities = (sortingOption: "upcoming" | "attended") => {
  const { bookedActivities } = useContext(DataContext);

  const filteredActivities = useMemo(() => {
    return filterBookedActivities(bookedActivities, sortingOption);
  }, [bookedActivities, sortingOption]);

  return filteredActivities;
};
