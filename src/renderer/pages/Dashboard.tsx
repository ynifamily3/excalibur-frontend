import Gnb from "components/complex/Gnb";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { RootState } from "rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { signInAction } from "slices/accountSlice";
import Loading from "components/atoms/Loading";
import styled from "styled-components";
import Aside from "components/complex/Aside";
import AddNewLectureStudentContent from "components/complex/AddNewLectureStudentContent";
import DashboardMain from "components/complex/DashboardMain";
import ManageQuizTimeLineContent from "components/complex/ManageQuizTimeLineContent";
import ManageLectureContent from "components/complex/ManageLectureContent";
import ListLectureAnalysisContent from "components/complex/ListLectureAnalysisContent";
import AddNewLectureContent from "components/complex/AddNewLectureContent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 74px);
`;

export default function Dashboard(): JSX.Element {
  // 필요한 비동기 데이터가 로드 되었을 때 컴포넌트를 렌더링 하기로 함.
  const [loaded, setLoaded] = useState(0);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.account);
  const { currentDashboardPage } = useSelector((state: RootState) => state.ui);

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
          mode: "teacher",
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
        <Wrapper>
          <Gnb />
          <BottomWrapper>
            <Aside />
            {(() => {
              switch (currentDashboardPage) {
                case "main":
                  return <DashboardMain />;
                case "managequiz":
                  return <ManageQuizTimeLineContent />;
                case "managelecture":
                  return <ManageLectureContent />;
                case "listlectureanalysis":
                  return <ListLectureAnalysisContent />;
                case "addnewlecture":
                  return <AddNewLectureContent />;
                case "addnewlecturestudent":
                  return <AddNewLectureStudentContent />;
                default:
                  return <div>-ㅅ-</div>;
              }
            })()}
          </BottomWrapper>
        </Wrapper>
      ) : (
        <Loading>동적 컨텐츠 로딩 중... {loaded}%</Loading>
      )}
    </>
  );
}
