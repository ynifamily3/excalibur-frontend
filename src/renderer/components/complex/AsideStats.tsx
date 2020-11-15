import React from "react";
import styled from "styled-components";
import theme from "styles/theme";
import SettingIcon from "components/atoms/svg/Setting";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div<{ isFold: boolean }>`
  background-color: #e7e8eb;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: ${({ isFold }) => (isFold ? "15px" : "25px")};
`;

const UserStat = styled.div`
  flex: 1;
`;
const Setting = styled.button`
  border: none;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default function AsideStats({
  isFold,
}: {
  isFold: boolean;
}): JSX.Element {
  const history = useHistory();
  const { accountInfo } = useSelector((state: RootState) => state.account);
  return (
    <Wrapper isFold={isFold}>
      {!isFold && (
        <UserStat>
          <div>{accountInfo.name}</div>
          <div style={{ color: "#777777", fontSize: `${theme.size.h5}px` }}>
            {accountInfo.mode === "student" ? "수강생으" : "강의자"}로 로그인됨
          </div>
        </UserStat>
      )}
      <Setting
        onClick={() => {
          history.replace("/settings");
        }}
      >
        <SettingIcon />
      </Setting>
    </Wrapper>
  );
}
