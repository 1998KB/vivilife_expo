import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/navigation/TabBar";
import Header from "@/components/Header";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Tabs.Screen
        name="booked"
        options={{
          title: "Booked",
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Tabs>
  );
}
