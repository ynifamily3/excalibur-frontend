import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "features/accounts/accountSlice";
const rootReducer = combineReducers({
  account: accountReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
