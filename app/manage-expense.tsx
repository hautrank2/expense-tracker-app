import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { expenseApi } from "@/lib/http";
import { ExpenseModel } from "@/types/expense";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, HelperText } from "react-native-paper";

const ManageExpenseScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ expenseId: string }>();
  const expenseId = params.expenseId;

  const [expenseData, setExpenseData] = useState<ExpenseModel>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (expenseId: string) => {
    try {
      const apiRes = await expenseApi.getExpenseById(expenseId);
      if (apiRes) {
        setExpenseData(apiRes);
        setError(null);
      }
    } catch (err) {
      setError("Something wrong !!");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(expenseId);
  }, [expenseId]);

  const isReady = useMemo(
    () => (!!expenseId ? !!expenseData : true),
    [expenseId, expenseData],
  );

  return (
    <View>
      {/* display Loading */}
      {!isReady && !error && <ActivityIndicator animating={true} />}

      {/* display error */}
      {!isReady && error}
      <HelperText type="error">{error}</HelperText>

      {/* display form */}
      {isReady && (
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
      )}
    </View>
  );
};

export default ManageExpenseScreen;
