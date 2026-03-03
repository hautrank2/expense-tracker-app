import { FavoritesProvider } from "@/store/context/favories-context";
import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ThemeProvider>
  );
};
