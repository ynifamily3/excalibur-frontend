import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";

type CurrentDashboardPage =
  | "main"
  | "managequiz"
  | "managelecture"
  | "listlectureanalysis"
  | "addnewlecture"
  | "addnewlecturestudent"
  | "test";

interface UI {
  isTransparent: boolean;
  currentDashboardPage: CurrentDashboardPage;
}

interface AlwaysonTop {
  alwaysOnTop: boolean;
}

const initialState: UI = {
  isTransparent: false,
  currentDashboardPage: "main",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Student라면 화면을 투명 처리할 필요는 없다. (분석 창이 나와야 함.) 사실 학생이면 얘가 할 일은 없다..
    setTransparentAction(state) {
      state.isTransparent = true;
      ipcRenderer.send("analysisMode");
    },
    setNoTransparentAction(state, action: PayloadAction<AlwaysonTop>) {
      state.isTransparent = false;
      ipcRenderer.send("normalMode", action.payload.alwaysOnTop); // 원래 항상위에를 설정했는지 알아보기 위해
    },
    changeDashboardPage(state, action: PayloadAction<CurrentDashboardPage>) {
      state.currentDashboardPage = action.payload;
    },
  },
});

export const {
  setTransparentAction,
  setNoTransparentAction,
  changeDashboardPage,
} = uiSlice.actions;
export default uiSlice.reducer;
