import { cn } from "@/lib/cn";
import { expenseApi } from "@/lib/http";
import { ExpenseModel } from "@/types/expense";
import { formatNumber } from "@/utils/number";
import dayjs from "dayjs";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Card, Text } from "react-native-paper";

const Screen = () => {
  const router = useRouter();
  const [data, setData] = useState<ExpenseModel[]>([]);
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

  const fetchData = useCallback(async () => {
    try {
      const apiRes = await expenseApi.getExpense();
      setData(apiRes);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <View className="p-4">
      <Card mode="contained" className="mb-4 py-0">
        <Card.Content className="flex flex-row justify-between items-center py-2">
          <View>
            <Text variant="titleMedium">Last 7 days</Text>
            <Text variant="bodyMedium">Transactions: {filterdData.length}</Text>
          </View>
          <View>
            <Text variant="titleLarge">${sum.toFixed(2)}</Text>
          </View>
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
                    <View className="flex flex-row items-center gap-3">
                      <Text variant="headlineMedium">{index + 1}</Text>
                      <View>
                        <Text variant="bodySmall">
                          {dayjs(item.date).format("MMM DD YYYY")}
                        </Text>
                        <Text variant="bodyMedium">{item.description}</Text>
                      </View>
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
