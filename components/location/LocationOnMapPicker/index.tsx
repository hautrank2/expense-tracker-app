import React from "react";
import { View } from "react-native";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

export type LocationOnMapPickerProps = MapViewProps & {};

export const LocationOnMapPicker = (props: LocationOnMapPickerProps) => {
  const { ...restProps } = props;

  return (
    <View className="location-on-map-picker">
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.7769,
          longitude: 106.7009,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        className="flex-1"
        {...restProps}
      />
    </View>
  );
};
