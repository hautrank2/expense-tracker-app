import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { useAppSelector } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";

const ManageExpenseScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const expenseId = params.expenseId;
  const { data: expenses } = useAppSelector((s) => s.expense);

  const expenseData = useMemo(
    () => expenses.find((e) => e.id === expenseId),
    [expenses, expenseId],
  );

  return (
    <ExpenseForm
      expenseId={expenseId}
      defaultValues={expenseData}
      onCancel={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.push("/overview/recent");
        }
      }}
      afterSuccess={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.push("/overview/recent");
        }
      }}
    />
  );
};

export default ManageExpenseScreen;
