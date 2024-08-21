import React from "react";
import { Tabs } from "expo-router";
import Header from "@/components/layouts/Header";
import TabBar from "@/components/layouts/navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerTitle: () => <Header />,
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: "rgba(9, 69, 5, .3)",
          },
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerTitle: () => <Header />,
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: "rgba(9, 69, 5, .3)",
          },
        }}
      />
      <Tabs.Screen
        name="booked"
        options={{
          title: "Booked",
          headerTitle: () => <Header />,
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: "rgba(9, 69, 5, .3)",
          },
        }}
      />
    </Tabs>
  );
}
