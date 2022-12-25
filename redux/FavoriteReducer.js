import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavoriteItem: (state, action) => {
      state.lists.push(action.payload);
    },
    removeFavoriteItem: (state, action) => {
      state.lists.splice(action.payload, 1);
    },
    getFavoriteItems: (state) => {
      return state.lists;
    },
  },
});

export const { setFavoriteItem, removeFavoriteItem, getFavoriteItems } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
