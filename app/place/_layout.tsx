import { Stack, useRouter } from "expo-router";
import { IconButton } from "react-native-paper";

const PlaceLayout = () => {
  const router = useRouter();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "Place manager",
          headerRight: () => {
            return (
              <IconButton
                icon="plus"
                onPress={() => router.push("/place/add")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="add" options={{ title: "Add place" }} />
      <Stack.Screen name="[placeId]" options={{ title: "Edit place" }} />
      <Stack.Screen
        name="location-picker"
        options={{ title: "Pick location" }}
      />
    </Stack>
  );
};
export default PlaceLayout;
