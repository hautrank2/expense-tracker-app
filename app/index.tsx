import { useAuthCtx } from "@/store/auth";
import { Redirect, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const Screen = () => {
  const { isAuthenticated } = useAuthCtx();

  if (isAuthenticated) {
    return <Redirect href="/overview/recent" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Track your expenses easily and stay in control of your money.
      </Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={() => router.push("/login")}>
          Login
        </Button>
        <Button mode="outlined" onPress={() => router.push("/sign-up")}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  actions: {
    width: "100%",
    gap: 12,
    marginTop: 12,
  },
});
