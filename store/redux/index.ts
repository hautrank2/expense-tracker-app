// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./favoritesSlice";

export * from "./hook";
export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

// types cho useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
