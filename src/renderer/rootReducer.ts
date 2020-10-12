import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "slices/accountSlice";
import globalStateReducer from "slices/globalStateSlice";
import uiReducer from "slices/uiSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  global: globalStateReducer,
  ui: uiReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
