import { createSlice } from "@reduxjs/toolkit";

//LOGIN SLICE
export interface authSliceI {
  token: {
    access_token?: string;
    refresh_token?: string;
  };
}

const initialState: authSliceI = { token: {access_token:'',refresh_token:''} };
const LoginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export default LoginSlice;
export const LoginActions = LoginSlice.actions;
