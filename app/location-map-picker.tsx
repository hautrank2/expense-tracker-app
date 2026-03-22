import { LocationOnMapPicker, LocationValue } from "@/components/location";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";

const LocationMapPickerScreen = () => {
  const params = useLocalSearchParams();

  const currentLocation: LocationValue | null = useMemo(() => {
    const rs = params["currentLocation"];
    return Array.isArray(rs) &&
      typeof rs[0] === "number" &&
      typeof rs[1] === "number"
      ? currentLocation
      : null;
  }, [params]);

  return (
    <View>
      <LocationOnMapPicker
        initialRegion={
          currentLocation
            ? {
                latitude: currentLocation[0],
                longitude: currentLocation[1],
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : undefined
        }
      />
    </View>
  );
};

export default LocationMapPickerScreen;
