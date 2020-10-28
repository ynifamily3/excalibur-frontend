import { combineReducers, createReducer } from "@reduxjs/toolkit";
import accountReducer from "slices/accountSlice";
import globalStateReducer from "slices/globalStateSlice";
import uiReducer from "slices/uiSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  global: globalStateReducer,
  ui: uiReducer,
});

// const allRstReducer = createReducer({isLogin:false})

// export const testAAAALogin = createSelector(
//   accountReducer,
//   globalStateReducer,
//   uiReducer,
//   (acc, glob, ui) => {
//     // acc.=> 단순 조회만 가능함.
//     return acc.isLogin ? "로아" : "로인";
//   }
// );

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
