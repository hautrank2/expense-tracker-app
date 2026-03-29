import { PlaceModel } from "@/types/place";
import { placeDb } from "@/utils/database";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { ImagePicker } from "../file";
import { LocationPicker } from "../location";

export type PlaceFormProps = {
  editPlaceId?: string;
  defaultValues?: Partial<Omit<PlaceModel, "id">>;
  affterSuccess?: () => void;
};
const PlaceForm = ({
  defaultValues,
  editPlaceId,
  affterSuccess,
}: PlaceFormProps) => {
  const isEdit = !!editPlaceId;
  const params = useLocalSearchParams<{
    title: string;
    imgUrl: string;
    address: string;
    lng: string;
    lat: string;
  }>();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      title: params?.title ?? defaultValues?.title ?? "",
      imgUrl: params?.imgUrl ?? defaultValues?.imgUrl ?? "",
      address: params?.address ?? defaultValues?.address ?? "",
      lng: +(params.lng ?? defaultValues?.lng ?? 0),
      lat: +(params.lat ?? defaultValues?.lat ?? 1),
    },
  });
  const router = useRouter();
  const pathname = usePathname();

  const { control } = form;
  const lng = form.watch("lng");
  const lat = form.watch("lat");

  const handleSubmit = useCallback(async () => {
    try {
      await form.trigger();
      const formValues = form.getValues();

      if (isEdit) {
        await placeDb.editPlace(+editPlaceId, {
          title: formValues.title ?? "",
          imgUrl: formValues.imgUrl ?? "",
          address: formValues.address ?? "",
          lng: formValues.lng ?? 0,
          lat: formValues.lat ?? 1,
        });
      } else {
        await placeDb.addPlace({
          title: formValues.title ?? "",
          imgUrl: formValues.imgUrl ?? "",
          address: formValues.address ?? "",
          lng: formValues.lng ?? 0,
          lat: formValues.lat ?? 1,
        });
      }

      affterSuccess?.();
    } catch (err) {
      console.log(err);
    }
  }, [form]);

  return (
    <View className="place-form">
      <View className="grid grid-cols-1 gap-4">
        <Controller
          control={control}
          name="title"
          rules={{
            required: "Please enter a value",
          }}
          render={({ field }) => (
            <TextInput
              mode="outlined"
              label="Title"
              {...field}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />

        <View>
          <Text variant="titleMedium" className="mb-2">
            Location
          </Text>
          <LocationPicker
            value={lat && lng ? [lat, lng] : undefined}
            pickerUrl="/place/location-picker"
          />
          <Button
            className="mt-2"
            mode="outlined"
            onPress={() => {
              const values = form.getValues();
              router.push({
                pathname: "/place/location-picker",
                params: {
                  ...values,
                  returnTo: pathname,
                },
              });
            }}
          >
            Open map
          </Button>
        </View>

        <Controller
          control={control}
          name="imgUrl"
          rules={{
            required: "Please picker a image",
          }}
          render={({ field }) => (
            <View>
              <Text variant="titleMedium" className="mb-2">
                Image picker
              </Text>
              <ImagePicker
                value={field.value}
                onPicker={field.onChange}
                className="p-2"
              />
            </View>
          )}
        />

        <View>
          <Button mode="contained" onPress={() => handleSubmit()}>
            {isEdit ? "Save" : "Add"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PlaceForm;
