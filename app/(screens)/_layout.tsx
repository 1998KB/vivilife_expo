import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="booking"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="authentication"
        options={{
          headerShown: false,
          presentation: "modal",
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
