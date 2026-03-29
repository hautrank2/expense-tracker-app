import PlaceForm from "@/components/place/PlaceForm";
import { PlaceModel } from "@/types/place";
import { placeDb } from "@/utils/database";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const EditPlaceScreen = () => {
  const { placeId } = useGlobalSearchParams<{ placeId: string }>();

  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placeData, setPlaceData] = useState<PlaceModel>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await placeDb.getById(+placeId);
        setPlaceData(data);
        setIsReady(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="p-4">
      {loading && <ActivityIndicator animating={true} />}
      {isReady && placeData && (
        <PlaceForm
          editPlaceId={placeId}
          defaultValues={{
            title: placeData.title,
            address: placeData.address,
            imgUrl: placeData.imgUrl,
            lat: placeData.lat,
            lng: placeData.lng,
          }}
          affterSuccess={() => {
            router.navigate("/place");
          }}
        />
      )}
      {isReady && !placeData && (
        <View>
          <Text variant="bodyMedium">Place not found</Text>
        </View>
      )}
    </View>
  );
};

export default EditPlaceScreen;
