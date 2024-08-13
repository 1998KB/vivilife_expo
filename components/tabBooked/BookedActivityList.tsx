// src/components/ActivityList.tsx
import React from "react";
import { ScrollView } from "react-native";
import { Activity } from "@/types";
import ActivityBookedCard from "./ActivityBookedCard";

interface ActivityListProps {
  activities: Activity[];
  type: "upcoming" | "attended";
}

const BookedActivityList: React.FC<ActivityListProps> = ({
  activities,
  type,
}) => (
  <ScrollView
    className=""
    contentContainerStyle={{
      width: "100%",
      paddingBottom: 110,
      paddingTop: 65,
    }}
    showsVerticalScrollIndicator={false}
  >
    {activities.map((activity) => (
      <ActivityBookedCard key={activity.id} activity={activity} type={type} />
    ))}
  </ScrollView>
);

export default BookedActivityList;
