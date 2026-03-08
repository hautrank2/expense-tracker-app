import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store";
import { formatNumber } from "@/utils/number";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Card, Text } from "react-native-paper";

const Screen = () => {
  const { data } = useAppSelector((s) => s.expense);
  const router = useRouter();

  const filterdData = useMemo(() => {
    // filter last 7 days
    return data
      .filter((item) => dayjs(item.date).isAfter(dayjs().subtract(8, "d")))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  const sum = useMemo(
    () => filterdData.reduce((acc, curr) => acc + curr.amount, 0),
    [filterdData],
  );

  return (
    <View className="p-4">
      <Card mode="contained" className="mb-4">
        <Card.Content className="flex flex-row justify-between items-center">
          <Text variant="labelMedium">Last 7 days</Text>
          <Text variant="titleMedium">${sum.toFixed(2)}</Text>
        </Card.Content>
      </Card>
      <FlatList
        data={filterdData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              className={cn("mx-2 my-2")}
              onPress={() => {
                router.push({
                  pathname: "/manage-expense",
                  params: { expenseId: item.id },
                });
              }}
            >
              <Card>
                <Card.Content>
                  <View className="flex flex-row justify-between">
                    <View>
                      <Text variant="titleSmall">
                        {dayjs(item.date).format("MMM DD YYYY")}
                      </Text>
                      <Text variant="bodyMedium">{item.description}</Text>
                    </View>
                    <View>
                      <Text variant="bodyLarge">
                        ${formatNumber(item.amount)}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Screen;
