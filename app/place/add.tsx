import PlaceForm from "@/components/place/PlaceForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const AddPlaceScreen = () => {
  const { lat, lng } = useLocalSearchParams<{ lng: string; lat: string }>();

  return (
    <View className="flex-1 p-4">
      <PlaceForm defaultValues={{ lat: +lat, lng: +lng }} />
    </View>
  );
};

export default AddPlaceScreen;
