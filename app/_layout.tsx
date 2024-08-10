import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { DataProvider } from "@/contexts/context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       await new Promise((resolve) => setTimeout(resolve, 0));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       await SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
  // }, []);
  return (
    <DataProvider>
      <ActionSheetProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(screens)/booking"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(screens)/authentication"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ActionSheetProvider>
    </DataProvider>
  );
}
