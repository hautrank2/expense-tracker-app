import { useAuthCtx } from "@/store/auth";
import { Redirect } from "expo-router";
import React from "react";

const Screen = () => {
  const { isAuthenticated } = useAuthCtx();
  return <Redirect href={isAuthenticated ? "/overview/recent" : "/login"} />;
};

export default Screen;
