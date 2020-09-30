import Gnb from "components/complex/Gnb";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { RootState } from "rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { signInAction } from "features/accounts/accountSlice";
import Loading from "components/atoms/Loading";

export default function Dashboard(): JSX.Element {
  // 필요한 비동기 데이터가 로드 되었을 때 컴포넌트를 렌더링 하기로 함.
  const [loaded, setLoaded] = useState(0);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    ipcRenderer.send("resizeWindow", {
      width: 1280,
      height: 720,
      animated: true,
    });
  }, []);

  // NOTE 로그인 상태 주입하기(debug purpose)
  useEffect(() => {
    if (!isLogin) {
      dispatch(
        signInAction({
          email: "jongkeun.ch@gmail.com",
          mode: "student",
          password: "12345",
        })
      );
    } else {
      setLoaded(100);
    }
  }, [isLogin, dispatch]);

  return (
    <>
      {loaded === 100 ? (
        <Gnb />
      ) : (
        <Loading>동적 컨텐츠 로딩 중... {loaded}%</Loading>
      )}
    </>
  );
}
