import { store } from "@/store";
import { AuthContextProvider } from "@/store/auth";
import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeProvider";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Provider store={store}>{children}</Provider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};
