import { store } from "@/store";
import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeProvider";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
