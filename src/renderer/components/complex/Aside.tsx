// import AnalysisButton from "components/atoms/AnlysisButton";
import Button from "components/atoms/Button";
import Back from "components/atoms/svg/Back";
import AsideStats from "components/complex/AsideStats";
import ExitAnalysisButton from "components/complex/ExitAnalysisButton";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIstatus } from "repos";
import { closeSession } from "repos/session";
import { RootState } from "rootReducer";
import { toNormalMode } from "slices/globalStateSlice";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import color from "styles/color";

const Wrapper = styled.div<{ isFold: boolean }>`
  width: ${({ isFold }) => (isFold ? "70px" : "240px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color.aside};
`;

const Menus = styled.div`
  margin: 0;
  padding: 0;
  margin-top: 21px;
  flex: 1;
`;

const MenuCP = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  width: 100%;
  padding-left: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "rgba(0,0,0,0.2)" : "inherit"};
  text-decoration: ${(props: { selected: boolean }) =>
    props.selected ? "underline" : "none"};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Menu = (
  props: React.PropsWithChildren<{
    selected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>
) => {
  return (
    <MenuCP selected={props.selected} onClick={props.onClick}>
      <div>{props.children}</div>
      {props.selected && (
        <div
          style={{ flex: 1, borderRight: "5px solid black", height: "34px" }}
        ></div>
      )}
    </MenuCP>
  );
};

Menu.defaultProps = {
  selected: false,
};

export default function Aside(): JSX.Element {
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const { mode, analysisStat } = useSelector(
    (state: RootState) => state.global
  );
  const { currentDashboardPage } = useSelector((state: RootState) => state.ui);

  const [fold, setFold] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const closeSessionAPICall = useCallback(async () => {
    if (!analysisStat) return;
    setIsPending(true);
    const ret = await closeSession({
      courseId: analysisStat.courseId,
      analysisSessionId: analysisStat.sessionId,
    });
    console.log(ret.data);
    setIsPending(false);
    dispatch(toNormalMode());
  }, [analysisStat, dispatch]);

  if (accountInfo.mode == "student" && mode == "analysis") return <></>;

  return (
    <Wrapper isFold={fold}>
      <Menus>
        <Menu
          selected={currentDashboardPage === "main"}
          onClick={() => {
            dispatch(changeDashboardPage("main"));
          }}
        >
          {fold ? "D" : "대시보드"}
          {/* 공통 */}
        </Menu>
        <Menu
          selected={
            currentDashboardPage === "managelecture" ||
            currentDashboardPage === "addnewlecture" ||
            currentDashboardPage === "addnewlecturestudent"
          }
          onClick={() => {
            dispatch(changeDashboardPage("managelecture"));
          }}
        >
          {fold ? "L" : "내 강의"}
          {/* 공통 */}
        </Menu>
        <Menu
          selected={currentDashboardPage === "listlectureanalysis"}
          onClick={() => {
            dispatch(changeDashboardPage("listlectureanalysis"));
          }}
        >
          {fold ? "A" : "강의분석 기록"}
          {/* 공통 */}
        </Menu>
        {/* {accountInfo.mode === "student" && (
          <Menu
            selected={currentDashboardPage === "test"}
            onClick={() => {
              dispatch(changeDashboardPage("test"));
            }}
          >
            {fold ? "T" : "분석테스트"}
          </Menu>
        )} */}
        {accountInfo.mode == "teacher" && mode === "analysis" && (
          <Menu
            selected={currentDashboardPage === "managequiz"}
            onClick={() => {
              dispatch(changeDashboardPage("managequiz"));
            }}
          >
            {fold ? "Q" : "✅퀴즈 출제✅"}
            {/* 강의자 */}
          </Menu>
        )}
      </Menus>
      <Button
        style={{
          border: "none",
          margin: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          transform: `${fold ? "rotate(180deg)" : "none"}`,
          backgroundColor: "inherit",
          outline: "none",
          cursor: "pointer",
          padding: "10px",
          paddingRight: "20px",
        }}
        onClick={() => {
          setFold((prev) => !prev);
        }}
      >
        <Back />
      </Button>
      {accountInfo.mode == "teacher" && mode === "analysis" && !isPending && (
        <ExitAnalysisButton isFold={fold} onClick={closeSessionAPICall} />
      )}
      <AsideStats isFold={fold} />
    </Wrapper>
  );
}
