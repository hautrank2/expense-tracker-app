import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AllProviders } from "@/providers";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AllProviders>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="overview" />
        </Stack>
      </AllProviders>
    </ThemeProvider>
  );
}
