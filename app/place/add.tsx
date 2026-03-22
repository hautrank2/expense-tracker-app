import PlaceForm from "@/components/place/PlaceForm";
import React from "react";
import { View } from "react-native";

const AddPlaceScreen = () => {
  return (
    <View className="flex-1 p-4">
      <PlaceForm />
    </View>
  );
};

export default AddPlaceScreen;
