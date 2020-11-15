import Button from "components/atoms/Button";
import Select from "components/atoms/Select";
import SettingIcon from "components/atoms/svg/Setting";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIstatus } from "repos";
import {
  IResponseGetTeacherCourses,
  getTeacherCourses as getTeahcerCoursesAPI,
} from "repos/course";
import { RootState } from "rootReducer";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
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

export default function ManageLectureContent(): JSX.Element {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<APIstatus>(APIstatus.IDLE);
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const [data, setData] = useState<IResponseGetTeacherCourses>({
    message: "",
    data: [],
  });
  const getTeacherCourses = useCallback(async () => {
    const ret = await getTeahcerCoursesAPI({ accountId: accountInfo.id });
    setStatus(APIstatus.DONE);
    setData(ret.data);
  }, [accountInfo.id]);
  // 강의 리스트를 가져온다.
  useEffect(() => {
    if (accountInfo.mode === "teacher") {
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
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Select>
        <div style={{ marginLeft: "16px" }}>
          <Select>
            <option>최신순</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
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
                  <LIChild>{x.name}</LIChild>
                  <LIChild>{"미분류"}</LIChild>
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

// {accountInfo.mode == "teacher" &&
//         (mode === "normal" ? (
//           <AnalysisButton
//             onClick={() => {
//               dispatch(toAnalysisMode());
//             }}
//           />
//         ) : (
//           <ExitAnalysisButton
//             onClick={() => {
//               dispatch(toNormalMode());
//             }}
//           />
//         ))}
