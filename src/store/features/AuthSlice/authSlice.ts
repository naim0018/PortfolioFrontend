import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface User {
  email: string;
  id: string;
  role: string;
  userName: string;
  accessToken?: string;
}
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const accessToken = action.payload?.accessToken;
      if (!accessToken) return;
      
      const decode = jwtDecode(accessToken) as any;
      state.user = {
        email: decode.email,
        id: decode.id,
        role: decode.role,
        userName: decode.userName,
        accessToken: accessToken,
      };
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
