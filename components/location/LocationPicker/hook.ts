import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { LocationPickerProps } from ".";
import { LocationValue } from "../type";

export type UseLocationHookProps = LocationPickerProps;

export const useLocation = (props: UseLocationHookProps) => {
  const { value, onPicker, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const controlled = useMemo(() => {
    return Object.prototype.hasOwnProperty.call(props, "value");
  }, [props]);

  const [location, setLocation] = useState<LocationValue | null>(value ?? null);

  const onPickCurrentLocation = async () => {
    try {
      setLoading(true);
      const permissionResult =
        await Location.requestForegroundPermissionsAsync();

      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Permission to access location was denied.",
        );
        return;
      }

      const result = await Location.getCurrentPositionAsync({});

      const nextValue: LocationValue = [
        result.coords.latitude,
        result.coords.longitude,
      ];

      if (controlled) {
        onPicker?.(nextValue);
      } else {
        setLocation(nextValue);
      }
    } catch (err) {
      let errText = "";
      console.log(JSON.stringify(err));
      console.log(err);

      if (typeof err === "object" && !!err) {
        if ("code" in err && typeof err.code === "string") {
          switch (err.code) {
            case "ERR_CURRENT_LOCATION_IS_UNAVAILABLE":
              errText = "Can't get current location, please try again";
              break;
          }
        }
        Alert.alert(errText);
      }
    } finally {
      setLoading(false);
    }
  };

  const onOpenMap = () => {
    router.push({
      pathname: "/location-map-picker",
      params: {
        currentLocation: location,
      },
    });
  };

  useEffect(() => {
    if (controlled) {
      setLocation(value ?? null);
    }
  }, [value, controlled]);

  return {
    containerProps: restProps,
    value,
    loading,
    setLoading,
    location,
    onPickCurrentLocation,
    onOpenMap,
  };
};
