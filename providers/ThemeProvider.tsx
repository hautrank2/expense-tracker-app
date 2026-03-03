import { lightPalette } from "@/themes/light";
import { DefaultTheme } from "@react-navigation/native";
import React, { FC, PropsWithChildren } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: "#BADA55",
      ...lightPalette.colors,
    },
  };

  return <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>;
};
