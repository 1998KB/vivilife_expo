import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { DataProvider } from "@/contexts/dataProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/authProvider";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StripeProvider publishableKey="pk_live_51PqFSgP3dnkXx0KwjVZeQEfD5hLUk6CrjBk10g6caCr3Ro0qlwjmsrxXWBsdkGfzBsq0GCWDAi7Z2mbvfKVltIps00sZFECQWj">
        <GestureHandlerRootView>
          <DataProvider>
            <ActionSheetProvider>
              <Stack>
                <Stack.Screen
                  name="(modals)"
                  options={{
                    headerShown: false,
                    presentation: "modal",
                  }}
                />
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
          </DataProvider>
        </GestureHandlerRootView>
      </StripeProvider>
    </AuthProvider>
  );
}
