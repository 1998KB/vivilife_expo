// src/components/ActivityList.tsx
import React from "react";
import { ScrollView } from "react-native";
import { Activity } from "@/types";
import ActivityLikedCard from "./ActivityLikedCard";

interface ActivityListProps {
  activities: Activity[];
  onToggleLike: (id: string) => void;
}

const LikedActivityList = ({ activities, onToggleLike }: ActivityListProps) => (
  <ScrollView
    className="flex-1"
    contentContainerStyle={{
      width: "100%",
      paddingTop: 65,
      paddingBottom: 10,
    }}
    showsVerticalScrollIndicator={false}
  >
    {activities.map((activity) => (
      <ActivityLikedCard
        key={activity.title}
        activity={activity}
        onToggleLike={onToggleLike}
      />
    ))}
  </ScrollView>
);

export default LikedActivityList;
