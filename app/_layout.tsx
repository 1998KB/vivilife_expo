import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { DataProvider } from "@/contexts/dataContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView>
      <DataProvider>
        <RootSiblingParent>
          <ActionSheetProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(screens)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </ActionSheetProvider>
        </RootSiblingParent>
      </DataProvider>
    </GestureHandlerRootView>
  );
}
