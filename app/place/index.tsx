import { TableResponse, TableResponseBase } from "@/types/api";
import { PlaceModel } from "@/types/place";
import { placeDb } from "@/utils/database";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";

const PAGE_SIZE = 10;

const PlaceScreen = () => {
  const isFocuesd = useIsFocused();
  const [places, setPlaces] =
    useState<TableResponse<PlaceModel>>(TableResponseBase);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPlaces = useCallback(
    async (page = 1, options?: { refresh?: boolean; append?: boolean }) => {
      const isRefresh = options?.refresh;
      const isAppend = options?.append;

      try {
        if (isRefresh) setRefreshing(true);
        else if (isAppend) setLoadingMore(true);
        else setLoading(true);

        const result = await placeDb.getPlaces(page, PAGE_SIZE);

        setPlaces(result);
      } catch (err) {
        console.log("fetchPlaces error:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPlaces(1);
  }, [fetchPlaces, isFocuesd]);

  const handleRefresh = () => {
    fetchPlaces(1, { refresh: true });
  };

  const handleLoadMore = () => {
    if (loading || refreshing || loadingMore) return;
    if ((places.page ?? 1) >= (places.totalPage ?? 1)) return;

    fetchPlaces((places.page ?? 1) + 1, { append: true });
  };

  const renderItem = ({ item }: { item: PlaceModel }) => (
    <Card className="mb-4 overflow-hidden rounded-2xl">
      {!!item.imgUrl && (
        <Image
          source={{ uri: item.imgUrl }}
          className="h-48 w-full"
          resizeMode="cover"
        />
      )}

      <Card.Content className="gap-1 p-4">
        <Text variant="titleMedium">{item.title}</Text>
        <Text variant="bodyMedium">{item.address}</Text>
        <Text variant="bodySmall">
          Lat: {item.lat} | Lng: {item.lng}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="outlined"
          onPress={() => {
            router.push({
              pathname: `/place/${item.id}` as any,
            });
          }}
        >
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View className="py-4">
          <ActivityIndicator />
        </View>
      );
    }

    if ((places.page ?? 1) < (places.totalPage ?? 1)) {
      return (
        <View className="items-center py-2">
          <Button mode="outlined" onPress={handleLoadMore}>
            Load more
          </Button>
        </View>
      );
    }

    return <View className="h-6" />;
  };

  if (loading && !(places.items?.length > 0)) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <ActivityIndicator />
        <Text className="mt-2">Loading places...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <FlatList
        data={places.items ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View className="mb-3 gap-1">
            <Text variant="titleMedium">Total: {places.total ?? 0}</Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View className="items-center justify-center py-10">
              <Text>No places found</Text>
            </View>
          ) : null
        }
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PlaceScreen;
