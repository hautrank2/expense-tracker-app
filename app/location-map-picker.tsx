import { LocationValue } from "@/components/location";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";

const LocationMapPickerScreen = () => {
  const params = useLocalSearchParams();
  const [coor, setCoor] = useState<LatLng>();

  const currentLocation: LocationValue | null = useMemo(() => {
    const rs = params["currentLocation"];
    return Array.isArray(rs) &&
      typeof rs[0] === "number" &&
      typeof rs[1] === "number"
      ? currentLocation
      : null;
  }, [params]);

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
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
        style={StyleSheet.absoluteFill}
        onPress={(e) => {
          console.log("onPress");
          setCoor(e.nativeEvent.coordinate);
        }}
        onLongPress={(e) => {
          console.log("onLongPress");
        }}
      >
        {coor && <Marker coordinate={coor} />}
      </MapView>
    </View>
  );
};

export default LocationMapPickerScreen;
