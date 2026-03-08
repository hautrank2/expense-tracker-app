import { generateId } from "@/data/expense";
import { useAppDispatch } from "@/store";
import { addExpense, editExpense } from "@/store/expense";
import { ExpenseModel } from "@/types/expense";
import React, { useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
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
  date: Date;
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
  const dispatch = useAppDispatch();
  const isEdit = !!expenseId;

  const [values, setValues] = useState<Partial<ExpenseValues>>({
    amount: defaultValues?.amount
      ? parseNumber(defaultValues?.amount ?? "")
      : "",
    description: defaultValues?.description ?? "",
    date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
  });

  const formState = useMemo(() => {
    const { amount, description, date } = values;
    let isValid = true;

    let amountErr = "",
      descriptionErr = "",
      dateErr = "";

    if (!amount) {
      isValid = false;
      amountErr = "Please enter a number between 0 and 1 billion";
    }

    if (!description?.trim()) {
      isValid = false;
      descriptionErr =
        "Please enter a description, no longer than 255 characters";
    }

    if (!date) {
      isValid = false;
      dateErr = "Please pick a date";
    }

    return {
      isValid,
      errors:
        !!amountErr || !!descriptionErr || !!dateErr
          ? {
              amount: amountErr,
              description: descriptionErr,
              date: dateErr,
            }
          : null,
    };
  }, [values]);

  const handleSubmit = async () => {
    try {
      if (formState.isValid) {
        if (!!values.amount && !!values.date && !!values.description) {
          const formData = {
            amount: convertNumber(values.amount),
            date: values.date.toISOString(),
            description: values.description,
          };

          if (isEdit) {
            dispatch(editExpense({ id: expenseId, updatedData: formData }));
          } else {
            // await expenseApi.addExpense(formData);
            dispatch(
              addExpense({
                id: generateId(),
                ...formData,
              }),
            );
          }

          afterSuccess?.();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="expense-form flex-1 p-4 flex flex-col gap-2">
      {/* Form */}
      <View className="expense-fields flex flex-col gap-2">
        <View className="grid grid-cols-2 gap-2">
          <View>
            <TextInput
              inputMode="decimal"
              mode="outlined"
              label="Amount"
              keyboardType="decimal-pad"
              value={values.amount}
              onChangeText={(v) => {
                setValues((pre) => {
                  return {
                    ...pre,
                    amount: v,
                  };
                });
              }}
            />
          </View>
          <View>
            <DatePickerInput
              mode="outlined"
              locale="en-GB"
              label="Date"
              inputMode="end"
              value={values.date}
              onChange={(v) =>
                setValues((pre) => {
                  return {
                    ...pre,
                    date: v,
                  };
                })
              }
            />
          </View>
        </View>
        <TextInput
          mode="outlined"
          label="Description"
          multiline
          numberOfLines={4}
          value={values.description}
          onChangeText={(v) =>
            setValues((pre) => {
              return {
                ...pre,
                description: v,
              };
            })
          }
        />
      </View>

      <View className="flex flex-row gap-2 items-center justify-end">
        {onCancel && (
          <Button mode="text" onPress={() => onCancel()}>
            Cancel
          </Button>
        )}
        <Button
          disabled={!formState.isValid}
          mode="contained"
          onPress={() => {
            handleSubmit();
          }}
        >
          {isEdit ? "Save" : "Add"}
        </Button>
      </View>
    </View>
  );
};
