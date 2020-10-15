import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";

type CurrentDashboardPage =
  | "main"
  | "managequiz"
  | "managelecture"
  | "listlectureanalysis"
  | "addnewlecture"
  | "addnewlecturestudent";

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
