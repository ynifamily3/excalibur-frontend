import Button from "components/atoms/Button";
import Select from "components/atoms/Select";
import RightArrow from "components/atoms/svg/RightArrow";
import SettingIcon from "components/atoms/svg/Setting";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIstatus } from "repos";
import {
  IResponseGetTeacherCourses,
  getTeacherCourses as getTeahcerCoursesAPI,
} from "repos/course";
import { RootState } from "rootReducer";
import { toAnalysisMode } from "slices/globalStateSlice";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import color from "styles/color";
import theme from "styles/theme";

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  overflow-y: scroll;
  height: 100%;
  padding-bottom: 60px;
`;

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: ${theme.size.h5}px;
  color: gray;
  height: 60px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const LIChild = styled.div`
  padding: 0 10px;
  &:first-child {
    color: black;
    text-decoration: underline;
    flex: 1;
    font-size: ${theme.size.h5}px;
  }
`;

const AnalysisButton = styled(Button)`
  background-color: ${color.green[1]};
  border-radius: 5px;
  width: 76px;
  height: 34px;
  justify-content: center;
  align-items: center;
  display: flex;
  column-gap: 4px;
  cursor: pointer;
`;

export default function ManageLectureContent(): JSX.Element {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<APIstatus>(APIstatus.IDLE);
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const { mode } = useSelector((state: RootState) => state.global);
  const [data, setData] = useState<IResponseGetTeacherCourses>({
    message: "",
    data: [],
  });
  const getTeacherCourses = useCallback(async () => {
    // TODO 서버에 학생이 수강중인 강의 목록을 저장하고 보여주는 API가 없어서 클라이언트가 그때그때 추가하도록 하려고 여기에 추가함.
    // 이 때 강의자는 무조건 13번임 (고정)
    // const ret = await getTeahcerCoursesAPI({ accountId: accountInfo.id });
    const ret = await getTeahcerCoursesAPI({ accountId: 13 });
    setStatus(APIstatus.DONE);
    setData(ret.data);
  }, []);
  // 강의 리스트를 가져온다.
  useEffect(() => {
    // TODO 학생이 수강중인 강의 목록을 가져오거나 추가하는 API가 없어서 IF문 BYPASS
    if (1 === 1 || accountInfo.mode === "teacher") {
      try {
        setStatus(APIstatus.PENDING);
        getTeacherCourses();
      } catch (e) {
        console.error("에러:", e);
        setStatus(APIstatus.ERROR);
      }
    } else {
      //
    }
  }, [accountInfo.mode, getTeacherCourses]);
  return (
    <Wrapper>
      <Top>
        <Button
          color="white"
          style={{
            backgroundColor: "#032D3C",
            borderRadius: 0,
            width: "153px",
            height: "55px",
            marginRight: 0,
          }}
          onClick={() => {
            if (accountInfo.mode === "student")
              dispatch(changeDashboardPage("addnewlecturestudent"));
            else dispatch(changeDashboardPage("addnewlecture"));
          }}
        >
          + 새 강의 추가
        </Button>
      </Top>
      <Top>
        <Select>
          <option>전체 보기</option>
          <option>최근 진행 강의 보기</option>
        </Select>
        <div style={{ marginLeft: "16px" }}>
          <Select>
            <option>최신순</option>
            <option>오래된순</option>
          </Select>
        </div>
      </Top>
      {status === APIstatus.PENDING && <div>로딩 중...</div>}
      {status === APIstatus.DONE && (
        <>
          <div
            style={{
              marginBottom: "10px",
              marginTop: "30px",
              color: "black",
              fontSize: theme.size.h5 + "px",
            }}
          >
            총 {data.data.length}개의 강의가 있습니다.
          </div>
          <UL>
            {data.data.reverse().map((x, i) => {
              return (
                <LI key={"lect-" + i}>
                  <LIChild>{"[" + x.code + "] " + x.name}</LIChild>
                  {accountInfo.mode === "teacher" && mode === "normal" && (
                    <LIChild>
                      <AnalysisButton
                        color="white"
                        onClick={() => {
                          dispatch(
                            toAnalysisMode({
                              analysisStat: x,
                              analysisTime: Math.floor(+new Date() / 1000),
                            })
                          );
                        }}
                      >
                        시작 <RightArrow />
                      </AnalysisButton>
                    </LIChild>
                  )}
                  <LIChild>{new Date().toLocaleDateString()}</LIChild>
                  <LIChild>
                    <SettingIcon />
                  </LIChild>
                </LI>
              );
            })}
          </UL>
        </>
      )}
    </Wrapper>
  );
}
