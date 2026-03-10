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

import { useAuthCtx } from "@/store/auth";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AllProviders>
        <StatusBar style="auto" />
        <RootStack />
      </AllProviders>
    </ThemeProvider>
  );
}

const RootStack = () => {
  const { isAuthenticated } = useAuthCtx();
  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="signup" options={{ title: "Signup" }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="overview" options={{ title: "Expense Tracker" }} />
        <Stack.Screen
          name="manage-expense"
          options={{ title: "Manage Expense", presentation: "modal" }}
        />
      </Stack.Protected>
    </Stack>
  );
};
