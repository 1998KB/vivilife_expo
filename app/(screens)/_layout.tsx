import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="booking"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="questionnaire"
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </Stack>
  );
};

export default _layout;
