import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// PayloadAction

interface GlobalState {
  mode: "normal" | "analysis";
  code: string;
  // 강의 id, 진행자 등 여러 가지를 넣어야 합니다.
}

const initialState: GlobalState = {
  mode: "normal",
  code: "",
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    toAnalysisMode(state, action: PayloadAction<{ code: string }>) {
      state.mode = "analysis";
      // DEBUG 수정예정
      // state.code = action.payload.code;
    },
    toNormalMode(state) {
      state.mode = "normal";
    },
  },
});

export const { toAnalysisMode, toNormalMode } = globalStateSlice.actions;

export default globalStateSlice.reducer;
