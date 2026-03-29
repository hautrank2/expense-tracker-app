import * as Location from "expo-location";
import { usePathname, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { LocationPickerProps } from ".";
import { useLocation } from "../hook";
import { LocationValue } from "../type";

export type UseLocationPickerHookProps = LocationPickerProps;

export const useLocationPicker = (props: UseLocationPickerHookProps) => {
  const { value, onPicker, pickerUrl, ...restProps } = props;
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchReverseGeoCoding } = useLocation();

  const controlled = useMemo(() => {
    return Object.prototype.hasOwnProperty.call(props, "value");
  }, [props]);

  const [location, setLocation] = useState<LocationValue | null>(value ?? null);
  const [address, setAddress] = useState("");

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
      pathname: (pickerUrl ?? "/place/location-picker") as any,
      params: {
        lat: location?.[0],
        lng: location?.[1],
        returnTo: pathname,
      },
    });
  };

  const fetchAddress = useCallback(async () => {
    try {
      if (!location) return;
      const apiRes = await fetchReverseGeoCoding(location);
      if (typeof apiRes === "string") {
        setAddress(apiRes);
      }
    } catch (err) {
      console.log(err);
    }
  }, [location, fetchReverseGeoCoding]);

  useEffect(() => {
    if (controlled) {
      setLocation(value ?? null);
    }
  }, [value, controlled]);

  useEffect(() => {
    fetchAddress();
  }, [location, fetchAddress]);

  return {
    containerProps: restProps,
    value,
    loading,
    setLoading,
    location,
    address,
    onPickCurrentLocation,
    onOpenMap,
  };
};
