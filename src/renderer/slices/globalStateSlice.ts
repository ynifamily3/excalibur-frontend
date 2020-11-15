import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  mode: "normal" | "analysis";
  analysisStat?: {
    name: string;
    accountId: number;
    code: string;
  };
  analysisTime: number; // 분석 시작 시간.
  // 강의 id, 진행자 등 여러 가지를 넣어야 합니다.
}

const initialState: GlobalState = {
  mode: "normal",
  analysisStat: null,
  analysisTime: 0,
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    toAnalysisMode(
      state,
      action: PayloadAction<{
        analysisStat: {
          name: string;
          accountId: number;
          code: string;
        };
        analysisTime: number;
      }>
    ) {
      state.mode = "analysis";
      state.analysisStat = action.payload.analysisStat;
      state.analysisTime = action.payload.analysisTime;
    },
    toNormalMode(state) {
      state.mode = "normal";
      state.analysisStat = null;
      state.analysisTime = 0;
    },
    countSecond(state, action: PayloadAction<number>) {
      state.analysisTime = action.payload;
    },
    reset(state) {
      state.mode = initialState.mode;
      state.analysisStat = null;
      state.analysisTime = 0;
    },
  },
});

export const {
  toAnalysisMode,
  toNormalMode,
  countSecond,
  reset,
} = globalStateSlice.actions;

export default globalStateSlice.reducer;
