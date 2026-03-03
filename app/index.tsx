import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const Page = () => {
  const router = useRouter();
  return (
    <View>
      <Button
        onPress={() => {
          router.navigate("/overview/recent");
        }}
      >
        Go to Overview
      </Button>
    </View>
  );
};

export default Page;
