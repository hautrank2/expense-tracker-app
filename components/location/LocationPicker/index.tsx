import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Button } from "react-native-paper";
import { LocationValue } from "../type";
import { useLocation } from "./hook";

export type LocationPickerProps = ViewProps & {
  value?: LocationValue | null;
  onPicker?: (value: LocationValue) => void;
};

export const LocationPicker = (props: LocationPickerProps) => {
  const {
    location,
    containerProps,
    onPickCurrentLocation,
    loading,
    onOpenMap,
  } = useLocation(props);

  return (
    <View {...containerProps}>
      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.label}>Latitude: {location && location[0]}</Text>
          <Text style={styles.label}>Longitude: {location && location[1]}</Text>
        </View>
      )}

      <View className="flex flex-row justify-between gap-2">
        <View className="flex-1">
          <Button mode="outlined" onPress={onOpenMap} loading={loading}>
            Pick on map
          </Button>
        </View>
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
