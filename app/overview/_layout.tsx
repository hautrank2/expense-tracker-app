import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import {
  BottomNavigation,
  Icon,
  IconButton,
  Provider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation, useRouter } from "expo-router";
import AllExpenseScreen from "./all";
import ProfileScreen from "./profile";
import RecentExpenseScreen from "./recent";

const TAB_BAR_HEIGHT = 64; // chỉnh 72~88 tuỳ UI

const routes = [
  { key: "recent", title: "Recent", focusedIcon: "clock-outline" },
  { key: "all", title: "All", focusedIcon: "format-list-bulleted" },
  { key: "profile", title: "Profile", focusedIcon: "account-circle" },
];

export default function ExpenseLayout() {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  const renderScene = () => {
    switch (routes[index].key) {
      case "recent":
        return <RecentExpenseScreen />;
      case "all":
        return <AllExpenseScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => router.push("/manage-expense")}
        />
      ),
    });
  }, [navigation, router]);

  return (
    <Provider>
      {/* Scene */}
      <View
        style={{ flex: 1, paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 80 }}
      >
        {renderScene()}
      </View>

      {/* Bar */}
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <BottomNavigation.Bar
          style={{ height: TAB_BAR_HEIGHT }}
          navigationState={{ index, routes }}
          onTabPress={({ route }) => {
            const newIndex = routes.findIndex((r) => r.key === route.key);
            if (newIndex !== -1) setIndex(newIndex);
          }}
          renderIcon={({ route, color }) => (
            <Icon source={route.focusedIcon} size={24} color={color} />
          )}
          getLabelText={({ route }) => route.title}
        />
        {/* nếu muốn chắc kèo: thêm spacer cho safe area */}
        <View style={{ height: insets.bottom }} />
      </View>
    </Provider>
  );
}
