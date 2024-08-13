// src/components/ActivityList.tsx
import React from "react";
import { ScrollView } from "react-native";
import { Activity } from "@/types";
import ActivityLikedCard from "./ActivityLikedCard";

interface ActivityListProps {
  activities: Activity[];
  onToggleLike: (id: number) => void;
}

const LikedActivityList = ({ activities, onToggleLike }: ActivityListProps) => (
  <ScrollView
    className="flex-1"
    contentContainerStyle={{
      width: "100%",
      paddingTop: 65,
      paddingBottom: 110,
    }}
    showsVerticalScrollIndicator={false}
  >
    {activities.map((activity) => (
      <ActivityLikedCard
        key={activity.id}
        activity={activity}
        onToggleLike={onToggleLike}
      />
    ))}
  </ScrollView>
);

export default LikedActivityList;
