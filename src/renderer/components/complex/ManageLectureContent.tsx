import Button from "components/atoms/Button";
import { LoadingAnim } from "components/atoms/LoadingAnim";
import Select from "components/atoms/Select";
import RightArrow from "components/atoms/svg/RightArrow";
import SettingIcon from "components/atoms/svg/Setting";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIstatus } from "repos";
import {
  IIsActive,
  IResponseGetTeacherCourses,
  getStudentCourses as getStudentCoursesAPI,
  getTeacherCourses as getTeahcerCoursesAPI,
  isActive,
} from "repos/course";
import { createSession } from "repos/session";
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

const ButtonWrapper = ({
  status,
  clickable,
  setClickable,
  courseId,
  allInfo,
}: {
  status: APIstatus;
  clickable: boolean;
  setClickable: React.Dispatch<React.SetStateAction<boolean>>;
  courseId: number;
  allInfo: {
    name: string;
    accountId: number;
    code: string;
  };
}) => {
  // 버튼에서 쓰이는 status는 IDLE, DONE또는 PENDING만 쓸 것이다..
  const dispatch = useDispatch();
  const [mine, setMine] = useState<boolean>(false);

  return (
    <>
      {clickable && (
        <AnalysisButton
          color="white"
          onClick={() => {
            // APICALL
            setMine(true);
            setClickable(false); // 모두의 클릭을 방지
            (async function () {
              const ret = await createSession({ courseId });
              // console.log(courseId, "결과(세션 번호):", ret.data.data.id);
              setClickable(true);
              setMine(false);
              dispatch(
                toAnalysisMode({
                  analysisStat: {
                    ...allInfo,
                    sessionId: ret.data.data.id,
                    courseId,
                  },
                  analysisTime: Math.floor(+new Date() / 1000),
                })
              );
            })();
          }}
        >
          시작 <RightArrow />
        </AnalysisButton>
      )}
      {!clickable && mine && (
        <AnalysisButton
          color="white"
          disabled={true}
          style={{ cursor: "auto", position: "relative" }}
        >
          <LoadingAnim top="-25px" left="-2px" />
        </AnalysisButton>
      )}
      {!clickable && !mine && (
        <AnalysisButton color="white" disabled={true}>
          시작 <RightArrow />
        </AnalysisButton>
      )}
      {status === APIstatus.DONE && <div>이미분석중임.</div>}
    </>
  );
};

export default function ManageLectureContent(): JSX.Element {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<APIstatus>(APIstatus.IDLE); // 목록 로딩하는거 status
  const [clickable, setClickable] = useState(true);
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const { mode } = useSelector((state: RootState) => state.global);
  const [data, setData] = useState<IResponseGetTeacherCourses>({
    message: "",
    data: [],
  });
  ///// 학생 전용
  const [studentActivePending, setStudentActivePending] = useState(true);
  const [activated, setActivated] = useState<IIsActive[]>([]); // 강의의 액티베이트 여부를 나타냅니다.
  const isActiveCourse = (courseId: number): number => {
    for (let i = 0; i < activated.length; i++) {
      if (activated[i].courseId === courseId) return i;
    }
    return -1;
  };

  // const memoIsActiveCourse = useMemo(()=> isActiveCourse(courseId), []);

  const getCourses = useCallback(async () => {
    if (accountInfo.mode == "teacher") {
      const ret = await getTeahcerCoursesAPI({ accountId: accountInfo.id }); // 13
      // console.log(ret.data.data);
      setStatus(APIstatus.DONE);
      setData(ret.data);
    } else {
      const ret = await getStudentCoursesAPI({ accountId: accountInfo.id });
      // console.log(ret.data.data);
      setStatus(APIstatus.DONE);
      setData(ret.data);
    }
  }, [accountInfo]);
  // 강의 리스트를 가져온다.
  useEffect(() => {
    try {
      setStatus(APIstatus.PENDING);
      getCourses();
    } catch (e) {
      console.error("에러:", e);
      setStatus(APIstatus.ERROR);
    }
  }, [accountInfo.mode, getCourses]);

  const getActives = useCallback(async () => {
    const ret = await isActive();
    setStudentActivePending(false);
    // console.log(ret.data.data);
    setActivated(ret.data.data);
  }, []);

  // 학생인 경우 주기적으로 서버 돌면서 액티브 여부임을 확인해 옵니다.
  useEffect(() => {
    if (accountInfo.mode === "teacher") return;
    if (!data || !data?.data || data.data.length === 0) return;
    getActives();
    const tickId = setInterval(() => {
      getActives();
    }, 1000);
    // 주기적
    // TODO ENTRYPOINT
    return () => {
      clearInterval(tickId);
    };
  }, [data, getActives, accountInfo]);

  const handleGoAnalysisButton = ({
    name,
    courseId,
    code,
    sessionId,
  }: {
    name: string;
    courseId: number;
    code: string;
    sessionId: number;
  }) => {
    return () => {
      dispatch(
        toAnalysisMode({
          analysisStat: {
            name: name,
            accountId: accountInfo.id,
            code: code,
            sessionId: sessionId,
            courseId: courseId,
          },
          analysisTime: Math.floor(+new Date() / 1000),
        })
      );
      dispatch(changeDashboardPage("test"));
    };
  };

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
            {data.data
              .slice()
              .reverse()
              .map((x, i) => {
                let memoedIndex = -1;
                if (accountInfo.mode === "student" && mode === "normal") {
                  memoedIndex = isActiveCourse(x.accountId);
                }
                return (
                  <LI key={"lect-" + i}>
                    <LIChild>
                      {"[" + x.code + " / " + x.accountId + "] " + x.name}
                    </LIChild>
                    {accountInfo.mode === "teacher" && mode === "normal" && (
                      <LIChild>
                        <ButtonWrapper
                          allInfo={x}
                          courseId={x.accountId}
                          status={
                            mode === "normal" ? APIstatus.IDLE : APIstatus.DONE
                          }
                          clickable={clickable}
                          setClickable={setClickable}
                        />
                      </LIChild>
                    )}
                    {accountInfo.mode === "student" &&
                      mode === "normal" &&
                      memoedIndex >= 0 && (
                        <LIChild>
                          <AnalysisButton
                            color="white"
                            disabled={studentActivePending}
                            onClick={handleGoAnalysisButton({
                              name: x.name,
                              courseId: x.accountId,
                              code: x.code,
                              sessionId: activated[memoedIndex].id,
                            })}
                          >
                            입장
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
