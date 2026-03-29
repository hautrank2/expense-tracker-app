import { LocationValue, useLocation } from "@/components/location";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";

const defaultLat = 10.7769;
const defaultLng = 106.7009;
const LocationMapPickerScreen = () => {
  const { fetchReverseGeoCoding } = useLocation();
  const params = useLocalSearchParams<{
    title: string;
    imgUrl: string;
    address: string;
    lng: string;
    lat: string;
    returnTo: string;
  }>();

  const [coor, setCoor] = useState<LatLng | null>(() => {
    const lat = parseFloat(params.lat);
    const lng = parseFloat(params.lng);
    return isNaN(lat) || isNaN(lng) ? null : { latitude: lat, longitude: lng };
  });

  const navigation = useNavigation();
  const router = useRouter();

  const currentLocation: LocationValue | null = useMemo(() => {
    return [defaultLat, defaultLng];
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            onPress={async () => {
              const returnTo = params.returnTo;

              const geocodeRes =
                coor?.latitude && coor?.longitude
                  ? await fetchReverseGeoCoding([
                      coor?.latitude ?? 0,
                      coor?.longitude ?? 0,
                    ])
                  : "";
              const newParams = {
                title: params.title,
                imgUrl: params.imgUrl,
                address: geocodeRes,
                lat: coor?.latitude,
                lng: coor?.longitude,
              };
              if (!!returnTo) {
                router.replace({
                  pathname: returnTo as any,
                  params: newParams,
                });
              } else if (router.canGoBack() && !returnTo) {
                router.back();
                router.setParams(newParams);
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
        initialRegion={{
          latitude: currentLocation[0],
          longitude: currentLocation[1],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
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
