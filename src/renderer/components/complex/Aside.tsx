import React from "react";
import color from "styles/color";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useDispatch, useSelector } from "react-redux";
import AnalysisButton from "components/atoms/AnlysisButton";
import ExitAnalysisButton from "components/complex/ExitAnalysisButton";
import MenuSVG from "components/atoms/svg/Menu";
import AsideStats from "components/complex/AsideStats";
import { toNormalMode, toAnalysisMode } from "slices/globalStateSlice";
import { changeDashboardPage } from "slices/uiSlice";
const Wrapper = styled.div`
  width: 340px;
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
  height: 60px;
  display: flex;
  align-items: center;
  color: ${(props: { selected: boolean }) =>
    props.selected ? "#F2994A" : "black"};
`;

const Menu = (
  props: React.PropsWithChildren<{
    selected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>
) => {
  return (
    <MenuCP selected={props.selected} onClick={props.onClick}>
      <div
        style={{
          width: "19px",
          height: "19px",
          marginLeft: "41px",
          marginRight: "41px",
        }}
      >
        <MenuSVG selected={props.selected} />
      </div>
      <div>{props.children}</div>
      {props.selected && (
        <div
          style={{ flex: 1, borderRight: "5px solid #F2994A", height: "34px" }}
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
  const { mode } = useSelector((state: RootState) => state.global);
  const { currentDashboardPage } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Menus>
        <Menu
          selected={currentDashboardPage === "main"}
          onClick={() => {
            dispatch(changeDashboardPage("main"));
          }}
        >
          공통 - 대시보드
        </Menu>
        <Menu
          selected={currentDashboardPage === "managequiz"}
          onClick={() => {
            dispatch(changeDashboardPage("managequiz"));
          }}
        >
          강의자 - 퀴즈 관리
        </Menu>
        <Menu
          selected={currentDashboardPage === "managelecture"}
          onClick={() => {
            dispatch(changeDashboardPage("managelecture"));
          }}
        >
          공통 - 내 강의 관리
        </Menu>
        <Menu
          selected={currentDashboardPage === "listlectureanalysis"}
          onClick={() => {
            dispatch(changeDashboardPage("listlectureanalysis"));
          }}
        >
          공통 - 강의분석 기록 목록
        </Menu>
      </Menus>
      {accountInfo.mode == "teacher" &&
        (mode === "normal" ? (
          <AnalysisButton
            onClick={() => {
              dispatch(toAnalysisMode());
            }}
          />
        ) : (
          <ExitAnalysisButton
            onClick={() => {
              dispatch(toNormalMode());
            }}
          />
        ))}
      <AsideStats />
    </Wrapper>
  );
}
