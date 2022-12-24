import { configureStore } from "@reduxjs/toolkit";
import FavoriteReducer from "./favoriteReducer";
import LoginReducer from "./loginReducer";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    favoriteList: FavoriteReducer,
  },
});
