import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Account {
  isLogin: boolean;
  accountInfo: null | {
    mode: "student" | "teacher";
    type: "normal" | "google";
    email: string;
    id: number;
    name: string;
  };
}

interface SignIn {
  mode: "student" | "teacher";
  type: "normal" | "google";
  email: string;
  id: number;
  name: string;
}

const initialState: Account = {
  isLogin: false,
  accountInfo: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signInAction(state, action: PayloadAction<SignIn>) {
      const { mode, email, type, id, name } = action.payload;
      state.isLogin = true;
      state.accountInfo = {
        email,
        mode,
        name,
        type,
        id,
      };
    },
    signOutAction(state) {
      state.isLogin = false;
      state.accountInfo = null;
    },
  },
});

export const { signInAction, signOutAction } = accountSlice.actions;

export default accountSlice.reducer;
