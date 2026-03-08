import { ExpenseModel } from "@/types/expense";
import axios from "axios";

const API_ENDPOINT =
  "https://expense-app-26727-default-rtdb.asia-southeast1.firebasedatabase.app";

axios.interceptors.request.use(
  function (config) {
    return {
      ...config,
      baseURL: API_ENDPOINT,
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);

const expenseSegment = "/expenses.json";

export const expenseApi = {
  getExpense: () => {
    return axios.get(expenseSegment);
  },

  addExpense: (data: Omit<ExpenseModel, "id">) => {
    return axios.post(expenseSegment, data);
  },
};
