import { EXPENSE_DATA } from "@/data/expense";
import { ExpenseModel } from "@/types/expense";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ExpenseState = {
  data: ExpenseModel[];
};

const expenseSlide = createSlice({
  name: "expense",
  initialState: {
    data: EXPENSE_DATA,
  },
  reducers: {
    addExpense: (state, action) => {
      state.data.unshift(action.payload);
    },
    editExpense: (
      state,
      action: PayloadAction<{
        id: string;
        updatedData: Partial<Omit<ExpenseModel, "id">>;
      }>,
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...updatedData,
        };
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expenseSlide.actions;
export default expenseSlide.reducer;
