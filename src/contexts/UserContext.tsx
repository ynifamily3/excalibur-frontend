import React, { createContext, Dispatch, useReducer, useContext } from "react";

// 현재 로그인 된 유저의 정보를 가리키는 컨텍스트
export type RoleType = "" | "student" | "teacher";
export type UserState = {
  isLogin: boolean;
  id: string;
  password: string;
  role: RoleType;
};

const UserStateContext = createContext<UserState | undefined>(undefined);

type Action =
  | ({
      type: "LOGIN";
    } & UserState)
  | { type: "LOGOUT" };

type UserStateDispatch = Dispatch<Action>;
const UserStateDispatchContext = createContext<UserStateDispatch | undefined>(
  undefined
);

function UserStateReducer(state: UserState, action: Action): UserState {
  console.log("액션 !!", action, state);
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        id: action.id,
        password: action.password,
        role: action.role,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        id: "",
        password: "",
        role: "",
      };
    default:
      throw new Error("해당하는 액션 타입이 없습니다.");
  }
}

export function UserStateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userState, dispatch] = useReducer(UserStateReducer, {
    isLogin: false,
    id: "",
    password: "",
    role: "",
  });

  return (
    <UserStateDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        {children}
      </UserStateContext.Provider>
    </UserStateDispatchContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("UserStateProvider를 찾을 수 없습니다.");
  return state;
}

export function useUserStateDispatch() {
  const dispatch = useContext(UserStateDispatchContext);
  if (!dispatch)
    throw new Error("UserStateDispatchProvider를 찾을 수 없습니다.");
  return dispatch;
}
