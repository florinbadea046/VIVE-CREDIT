import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  role: "client" | "operator" | "guest" | "admin";
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: "guest",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<"client" | "operator" | "admin">) {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = "guest";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
