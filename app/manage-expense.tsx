import { useAppSelector } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const ManageExpenseScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const expenseId = params.expenseId;
  const isEditing = !!expenseId;

  const { data: expenses } = useAppSelector((s) => s.expense);
  const expenseData = useMemo(
    () => expenses.find((e) => e.id === expenseId),
    [expenses, expenseId],
  );

  return (
    <View className="flex-1 p-4">
      <Text>ManageExpense {isEditing ? "edit" : "add"}</Text>
      <Text>{JSON.stringify(expenseData)}</Text>

      <View className="flex flex-row gap-2 items-center justify-end">
        <Button mode="text" onPress={() => router.back()}>
          Cancel
        </Button>
        <Button mode="contained">{isEditing ? "Save" : "Add"}</Button>
      </View>
    </View>
  );
};

export default ManageExpenseScreen;
