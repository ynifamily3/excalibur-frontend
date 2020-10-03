import React from "react";
import color from "styles/color";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
// import AnalysisButton from "components/atoms/AnlysisButton";
import ExitAnalysisButton from "components/complex/ExitAnlysisButton";
import MenuSVG from "components/atoms/svg/Menu";
import AsideStats from "components/complex/AsideStats";
const Wrapper = styled.div`
  width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color.aside};
`;

const Menus = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 21px;
  flex: 1;
`;

const MenuCP = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  color: ${(props: { selected: boolean }) =>
    props.selected ? "#F2994A" : "black"};
`;

const Menu = (props: React.PropsWithChildren<{ selected?: boolean }>) => {
  return (
    <MenuCP selected={props.selected}>
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

  return (
    <Wrapper>
      {/* <div>{accountInfo.name}님, Aside입니다. </div> */}
      <Menus>
        <Menu selected={true}>메뉴1</Menu>
        <Menu>메뉴2</Menu>
        <Menu>메뉴3</Menu>
        <Menu>메뉴4</Menu>
      </Menus>
      {/* <AnalysisButton /> */}
      <ExitAnalysisButton />
      <AsideStats />
    </Wrapper>
  );
}
