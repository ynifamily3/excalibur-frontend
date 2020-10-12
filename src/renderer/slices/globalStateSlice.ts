import { createSlice } from "@reduxjs/toolkit";
// PayloadAction

interface GlobalState {
  mode: "normal" | "analysis";
  // 강의 id, 진행자 등 여러 가지를 넣어야 합니다.
}

const initialState: GlobalState = {
  mode: "normal",
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    toAnalysisMode(state) {
      state.mode = "analysis";
    },
    toNormalMode(state) {
      state.mode = "normal";
    },
  },
});

export const { toAnalysisMode, toNormalMode } = globalStateSlice.actions;

export default globalStateSlice.reducer;
