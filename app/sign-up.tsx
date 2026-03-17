import { SignupForm } from "@/components/auth/SignupForm";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const SignupScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 p-4">
      <SignupForm
        afterSuccess={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/login");
          }
        }}
      />
    </View>
  );
};

export default SignupScreen;
