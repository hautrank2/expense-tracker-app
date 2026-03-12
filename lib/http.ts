import { ExpenseModel } from "@/types/expense";
import axios from "axios";

const API_ENDPOINT =
  "https://expense-app-26727-default-rtdb.asia-southeast1.firebasedatabase.app";
const API_KEY = "AIzaSyA17Fs9OYoEv24iUvE8yF4whvbl9yu2CzA";

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
  getExpense: async () => {
    const res =
      await axios.get<Record<string, Omit<ExpenseModel, "id">>>(expenseSegment);

    return res.data
      ? Object.entries(res.data).reduce((acc, [id, value]) => {
          acc.push({
            id,
            ...value,
          });
          return acc;
        }, [] as ExpenseModel[])
      : [];
  },

  getExpenseById: async (id: string) => {
    const res = await axios.get<Omit<ExpenseModel, "id">>(
      `/expenses/${id}.json`,
    );

    return res.data ? { ...res.data, id } : null;
  },

  addExpense: (data: Omit<ExpenseModel, "id">) => {
    return axios.post(expenseSegment, data);
  },

  editExpense: (id: string, data: Omit<ExpenseModel, "id">) => {
    return axios.put(`/expenses/${id}.json`, data);
  },

  deleteExpense: (id: string) => {
    return axios.delete(`/expenses/${id}.json`);
  },
};

export const authApi = {
  signup: (payload: { email: string; password: string }) => {
    return axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        ...payload,
        returnSecureToken: true,
      },
    );
  },
};
