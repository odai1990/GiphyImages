import { configureStore } from "@reduxjs/toolkit";
import FavoriteReducer from "./FavoriteReducer";
import LoginReducer from "./LoginReducer";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    favoriteList: FavoriteReducer,
  },
});
