import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { DataProvider } from "@/contexts/dataProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/authProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
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
                name="(screens)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  headerShown: false,
                  presentation: "modal",
                  gestureEnabled: true,
                }}
              />
            </Stack>
          </ActionSheetProvider>
        </DataProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
