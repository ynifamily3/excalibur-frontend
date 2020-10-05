import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";

interface UI {
  isTransparent: boolean;
}

interface AlwaysonTop {
  alwaysOnTop: boolean;
}

const initialState: UI = {
  isTransparent: false,
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
  },
});

export const { setTransparentAction, setNoTransparentAction } = uiSlice.actions;
export default uiSlice.reducer;
