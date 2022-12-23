import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: ["sdsd", "sdsd", "sadasd"],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavoriteItem: (state, action) => {
      state.lists.push(action.payload);
    },
    removeFavoriteItem: (state) => {
      state.lists = true;
    },
    getFavoriteItems: (state) => {
      return state.lists;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavoriteItem, removeFavoriteItem, getFavoriteItems } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
