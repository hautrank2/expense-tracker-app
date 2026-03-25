import { LocationValue } from "@/components/location";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";

const LocationMapPickerScreen = () => {
  const params = useLocalSearchParams<{
    currentLocation?: string;
    returnTo?: string;
  }>();

  const [coor, setCoor] = useState<LatLng>();
  const navigation = useNavigation();
  const router = useRouter();

  const currentLocation: LocationValue | null = useMemo(() => {
    const rs = params["currentLocation"];
    return Array.isArray(rs) &&
      typeof rs[0] === "number" &&
      typeof rs[1] === "number"
      ? currentLocation
      : null;
  }, [params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            onPress={() => {
              const returnTo = params.returnTo;
              if (!!returnTo) {
                router.replace({
                  pathname: returnTo as any,
                  params: { lng: coor?.longitude, lat: coor?.latitude },
                });
              } else if (router.canGoBack() && !returnTo) {
                router.back();
                router.setParams({ lng: coor?.longitude, lat: coor?.latitude });
              }
            }}
          >
            Save
          </Button>
        );
      },
    });
  }, [coor]);

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
          setCoor(e.nativeEvent.coordinate);
        }}
      >
        {coor && <Marker coordinate={coor} />}
      </MapView>
    </View>
  );
};

export default LocationMapPickerScreen;
