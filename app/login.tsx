import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";
import { View } from "react-native";

const Screen = () => {
  return (
    <View className="flex-1 p-4">
      <LoginForm />
    </View>
  );
};

export default Screen;
