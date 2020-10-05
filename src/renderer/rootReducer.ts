import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "slices/accountSlice";
import uiReducer from "slices/uiSlice";
const rootReducer = combineReducers({
  account: accountReducer,
  ui: uiReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
