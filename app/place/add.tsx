import PlaceForm from "@/components/place/PlaceForm";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const AddPlaceScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 p-4">
      <PlaceForm
        affterSuccess={() => {
          router.navigate("/place");
        }}
      />
    </View>
  );
};

export default AddPlaceScreen;
