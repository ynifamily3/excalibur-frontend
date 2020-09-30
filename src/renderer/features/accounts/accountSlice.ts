import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Account {
  isLogin: boolean;
  accountInfo: null | {
    mode: "student" | "teacher";
    name: string;
    email: string;
  };
}

interface SignUp {
  name: string;
  email: string;
  password: string;
}

interface SignIn {
  mode: "student" | "teacher";
  email: string;
  password: string;
}

const initialState: Account = {
  isLogin: false,
  accountInfo: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signUpAction(state, action: PayloadAction<SignUp>) {
      const { name, email, password } = action.payload;
      console.log(name, email, password, "회원가입 액션 발행..");
    },
    signInAction(state, action: PayloadAction<SignIn>) {
      const { mode, email, password } = action.payload;
      console.log(mode, email, password, "로그인 액션 발행..");
      state.isLogin = true;
      // NOTE 이중화는 안 된다.. 이런! => state.accountInfo.email = "어쩌구" 는 작동하지 않는다.
      state.accountInfo = {
        email,
        mode,
        name: "DB에서 가져옴 ",
      };
    },
  },
});

export const { signInAction, signUpAction } = accountSlice.actions;

export default accountSlice.reducer;
