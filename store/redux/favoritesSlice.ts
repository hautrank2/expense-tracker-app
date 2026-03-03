// store/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  mealIds: string[];
};

const initialState: FavoritesState = {
  mealIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.mealIds.includes(id)) state.mealIds.push(id);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.mealIds = state.mealIds.filter((mId) => mId !== id);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.mealIds.indexOf(id);
      if (index >= 0) state.mealIds.splice(index, 1);
      else state.mealIds.push(id);
    },
    clearFavorites: (state) => {
      state.mealIds = [];
    },
  },
});

export default favoritesSlice;
