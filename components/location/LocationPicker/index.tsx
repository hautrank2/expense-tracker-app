import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Text } from "react-native-paper";
import { LocationValue } from "../type";
import { useLocationPicker } from "./hook";

export type LocationPickerProps = ViewProps & {
  value?: LocationValue | null;
  onPicker?: (value: LocationValue) => void;
  pickerUrl: string;
};

export const LocationPicker = (props: LocationPickerProps) => {
  const {
    location,
    address,
    containerProps,
    onPickCurrentLocation,
    loading,
    onOpenMap,
  } = useLocationPicker(props);

  return (
    <View {...containerProps}>
      {location && (
        <View style={styles.locationBox}>
          <View className="mb-2">
            <View className="flex flex-row gap-2 items-center">
              <Text style={styles.label} variant="labelMedium">
                Latitude:
              </Text>
              <Text style={styles.label} variant="bodyMedium">
                {location && location[0]}
              </Text>
            </View>
            <View className="flex flex-row gap-2 items-center">
              <Text style={styles.label} variant="labelMedium">
                Longitude:
              </Text>
              <Text style={styles.label} variant="bodyMedium">
                {location && location[1]}
              </Text>
            </View>
          </View>
          <Text style={styles.label} variant="bodyMedium">
            {address}
          </Text>
        </View>
      )}

      <View className="flex flex-row justify-between gap-2">
        {/* <View className="flex-1">
          <Button mode="outlined" onPress={onOpenMap} loading={loading}>
            Pick on map
          </Button>
        </View> */}
        <View className="flex-1">
          <Button
            mode="outlined"
            onPress={onPickCurrentLocation}
            loading={loading}
          >
            Pick current location
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationBox: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
  },
});
