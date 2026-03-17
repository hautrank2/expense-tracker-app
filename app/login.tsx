import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthCtx } from "@/store/auth";
import React from "react";
import { View } from "react-native";

const Screen = () => {
  const { onAuthticate } = useAuthCtx();
  return (
    <View className="flex-1 p-4">
      <LoginForm
        afterSuccess={(result) => {
          if (result.user.email) {
            onAuthticate(result);
          }
        }}
      />
    </View>
  );
};

export default Screen;
