import React from "react";
import styled from "styled-components";
import theme from "styles/theme";
import SettingIcon from "components/atoms/svg/Setting";
import ProfileIcon from "components/atoms/svg/User";
import CircleIcon from "components/atoms/svg/Circle";
import { RootState } from "rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #e7e8eb;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 25px;
`;

const Profile = styled.div`
  display: flex;
  width: 34px;
  height: 34px;
  margin-right: 13px;
  justify-content: center;
  align-items: center;
  position: relative; /* 앱솔루트 있어서 여길 기준으로 함  */
`;

const Circle = styled.div`
  position: absolute;
  right: 0px;
  bottom: -3px;
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
`;

export default function AsideStats(): JSX.Element {
  const history = useHistory();
  const { accountInfo } = useSelector((state: RootState) => state.account);
  return (
    <Wrapper>
      <Profile>
        <ProfileIcon />
        <Circle>
          <CircleIcon />
        </Circle>
      </Profile>
      <UserStat>
        <div>{accountInfo.name}</div>
        <div style={{ color: "#777777", fontSize: `${theme.size.h5}px` }}>
          {accountInfo.mode === "student" ? "수강생으" : "강의자"}로 로그인됨
        </div>
      </UserStat>
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
