import { EXPENSE_DATA } from "@/data/expense";
import { cn } from "@/lib/cn";
import dayjs from "dayjs";
import { Link, useNavigation } from "expo-router";
import React, { useLayoutEffect, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";

const Screen = () => {
  const data = EXPENSE_DATA;
  const navigation = useNavigation();
  const sum = useMemo(
    () => data.reduce((acc, curr) => acc + curr.amount, 0),
    [data],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href={"/overview/manage-expense"}>
          <Icon source={"plus"} size={24} />
        </Link>
      ),
    });
  }, []);

  return (
    <View className="p-4">
      <Card mode="contained" className="mb-4">
        <Card.Content className="flex flex-row justify-between items-center">
          <Text variant="labelMedium">Last 7 days</Text>
          <Text variant="titleMedium">${sum.toFixed(2)}</Text>
        </Card.Content>
      </Card>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-2"
        renderItem={({ item, index }) => {
          return (
            <Card className={cn(index > 0 ? "mt-2" : "")}>
              <Card.Content>
                <View className="flex flex-row justify-between">
                  <View>
                    <Text variant="titleSmall">
                      {dayjs(item.date).format("MMM DD YYYY")}
                    </Text>
                    <Text variant="bodyMedium">{item.description}</Text>
                  </View>
                  <View>
                    <Text variant="bodyLarge">${item.amount}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default Screen;
