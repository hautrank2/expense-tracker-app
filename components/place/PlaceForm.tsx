import { PlaceModel } from "@/types/place";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { ImagePicker } from "../file";
import { LocationPicker } from "../location";

export type PlaceFormProps = {
  defaultValues?: Partial<PlaceModel>;
};
const PlaceForm = ({ defaultValues }: PlaceFormProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const { control } = form;

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
            <TextInput mode="outlined" label="Title" {...field} />
          )}
        />
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

        <Controller
          control={control}
          name="location"
          rules={{
            required: "Please picker a location",
          }}
          render={({ field }) => (
            <View>
              <Text variant="titleMedium" className="mb-2">
                Location
              </Text>
              <LocationPicker />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PlaceForm;
