import { expenseApi } from "@/lib/http";
import { ExpenseModel } from "@/types/expense";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

export type ExpenseFormProps = {
  expenseId?: string;
  defaultValues?: Partial<ExpenseModel>;
  afterSuccess?: () => void;
  onCancel?: () => void;
};

export type ExpenseValues = {
  description: string;
  amount: string;
  date: Date | undefined;
};

const convertNumber = (v: string): number => {
  return Number.parseFloat(v.replace(",", "."));
};

const parseNumber = (v: number): string => {
  const str = v.toString();
  return Platform.OS === "ios" ? str.replace(".", ",") : str;
};

export const ExpenseForm = ({
  defaultValues,
  afterSuccess,
  onCancel,
  expenseId,
}: ExpenseFormProps) => {
  const isEdit = !!expenseId;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ExpenseValues>({
    mode: "onChange",
    defaultValues: {
      amount:
        typeof defaultValues?.amount === "number"
          ? parseNumber(defaultValues.amount)
          : "",
      description: defaultValues?.description ?? "",
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
    },
  });

  useEffect(() => {
    reset({
      amount:
        typeof defaultValues?.amount === "number"
          ? parseNumber(defaultValues.amount)
          : "",
      description: defaultValues?.description ?? "",
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
    });
  }, [defaultValues, reset]);

  const onSubmit = async (values: ExpenseValues) => {
    try {
      if (!values.date) return;

      const formData = {
        amount: convertNumber(values.amount),
        date: values.date.toISOString(),
        description: values.description.trim(),
      };

      if (isEdit) {
        await expenseApi.editExpense(expenseId, formData);
      } else {
        await expenseApi.addExpense(formData);
      }

      afterSuccess?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="expense-form flex flex-col gap-2">
      <View className="expense-fields flex flex-col gap-2">
        <View className="grid grid-cols-2 gap-2">
          <View className="col-span-1">
            <Controller
              control={control}
              name="amount"
              rules={{
                required: "Please enter a number between 0 and 1 billion",
                validate: (value) => {
                  const normalized = value.replace(",", ".");
                  const num = Number.parseFloat(normalized);

                  if (Number.isNaN(num)) {
                    return "Amount must be a valid number";
                  }

                  if (num <= 0 || num > 1_000_000_000) {
                    return "Please enter a number between 0 and 1 billion";
                  }

                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  disabled={isSubmitting}
                  inputMode="decimal"
                  mode="outlined"
                  label="Amount"
                  keyboardType="decimal-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <HelperText type="error">{errors.amount?.message}</HelperText>
          </View>

          <View className="col-span-1">
            <Controller
              control={control}
              name="date"
              rules={{
                required: "Please pick a date",
                validate: (value) => {
                  if (!value || Number.isNaN(value.getTime())) {
                    return "Please pick a date";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <DatePickerInput
                  disabled={isSubmitting}
                  mode="outlined"
                  locale="en-GB"
                  label="Date"
                  inputMode="end"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <HelperText type="error">{errors.date?.message}</HelperText>
          </View>
        </View>

        <View>
          <Controller
            control={control}
            name="description"
            rules={{
              required: "Please enter a description",
              validate: (value) => {
                const trimmed = value.trim();

                if (!trimmed) {
                  return "Please enter a description";
                }

                if (trimmed.length > 255) {
                  return "Description must be no longer than 255 characters";
                }

                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                disabled={isSubmitting}
                mode="outlined"
                label="Description"
                multiline
                numberOfLines={4}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <HelperText type="error">{errors.description?.message}</HelperText>
        </View>
      </View>

      <View className="flex flex-row gap-2 items-center justify-end">
        {onCancel && (
          <Button
            mode="text"
            onPress={onCancel}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}

        <Button
          disabled={!isValid || isSubmitting}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          {isEdit ? "Save" : "Add"}
        </Button>
      </View>
    </View>
  );
};
