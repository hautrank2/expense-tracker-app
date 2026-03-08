import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { expenseApi } from "@/lib/http";
import { ExpenseModel } from "@/types/expense";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  HelperText,
  IconButton,
  Snackbar,
  useTheme,
} from "react-native-paper";

const ManageExpenseScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();

  const params = useLocalSearchParams<{ expenseId: string }>();
  const expenseId = params.expenseId;

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    text: string;
  } | null>(null);

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

  const handleDelete = async (expenseId: string) => {
    try {
      await expenseApi.deleteExpense(expenseId);
      handleBackPage();
    } catch (err) {
      setSnackbar({ open: true, text: "Something has happened" });
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    fetchData(expenseId);
  }, [expenseId]);

  const isReady = useMemo(
    () => (!!expenseId ? !!expenseData : true),
    [expenseId, expenseData],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          !!expenseId && (
            <IconButton
              icon="delete"
              iconColor={theme.colors.error}
              rippleColor={theme.colors.errorContainer}
              onPress={() => {
                handleDelete(expenseId);
              }}
            />
          )
        );
      },
    });
  }, [theme, expenseId, navigation]);

  const handleBackPage = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/overview/recent");
    }
  }, [router]);

  return (
    <View className="p-4 flex-1">
      <Snackbar
        visible={!!snackbar?.open}
        onDismiss={() => {
          setSnackbar(null);
        }}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbar(null);
          },
        }}
      >
        {snackbar?.text}
      </Snackbar>
      {/* display Loading */}
      {!isReady && !error && <ActivityIndicator animating={true} size={40} />}

      {/* display error */}
      {!isReady && error && <HelperText type="error">{error}</HelperText>}

      {/* display form */}
      {isReady && (
        <ExpenseForm
          expenseId={expenseId}
          defaultValues={expenseData}
          onCancel={() => {
            handleBackPage();
          }}
          afterSuccess={() => {
            handleBackPage();
          }}
        />
      )}
    </View>
  );
};

export default ManageExpenseScreen;
