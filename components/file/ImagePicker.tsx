import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useMemo, useState } from "react";
import { Alert, Image, StyleSheet, View, ViewProps } from "react-native";
import { Button } from "react-native-paper";

export type ImagePickerProps = ViewProps & {
  value?: string | null;
  onPicker?: (value: string) => void;
};

export const ImagePicker = (props: ImagePickerProps) => {
  const { onPicker, value, ...restProps } = props;

  const controlled = useMemo(() => {
    return Object.prototype.hasOwnProperty.call(props, "value");
  }, [props]);

  const [image, setImage] = useState<string | null>(value ?? null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const v = result.assets[0].uri;

      if (controlled) {
        onPicker?.(v);
      } else {
        setImage(v);
      }
    }
  };

  useEffect(() => {
    if (controlled) {
      setImage(value ?? null);
    }
  }, [value, controlled]);

  return (
    <View {...restProps}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button mode="outlined" onPress={pickImage} className="mt-2">
        Pick an image from camera roll
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    objectFit: "contain",
  },
});
