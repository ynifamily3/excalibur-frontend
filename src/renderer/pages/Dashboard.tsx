import Loading from "components/atoms/Loading";
import AddNewLectureContent from "components/complex/AddNewLectureContent";
import AddNewLectureStudentContent from "components/complex/AddNewLectureStudentContent";
import Aside from "components/complex/Aside";
import DashboardMain from "components/complex/DashboardMain";
import Gnb from "components/complex/Gnb";
import ListLectureAnalysisContent from "components/complex/ListLectureAnalysisContent";
import ManageLectureContent from "components/complex/ManageLectureContent";
import ManageQuizTimeLineContent from "components/complex/ManageQuizTimeLineContent";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "rootReducer";
import { signInAction } from "slices/accountSlice";
import styled from "styled-components";

import { AnalysisStudentScreen } from "./AnalysisStudentScreen";

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
  const history = useHistory();
  const [loaded, setLoaded] = useState(0);
  const { isLogin } = useSelector((state: RootState) => state.account);
  const { currentDashboardPage } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (!isLogin) history.replace("/");
    else setLoaded(100);
  }, [isLogin, history]);

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
                case "test":
                  return <AnalysisStudentScreen />;
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
