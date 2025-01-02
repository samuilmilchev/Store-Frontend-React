/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userName: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userName: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.userName = null;
      state.isAuthenticated = false;
    },
    signUp: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { signIn, signOut, signUp } = authSlice.actions;
export default authSlice.reducer;
