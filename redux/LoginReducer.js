import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isAuth = true;
    },
    logoutAction: (state) => {
      state.isAuth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = loginSlice.actions;

export default loginSlice.reducer;
