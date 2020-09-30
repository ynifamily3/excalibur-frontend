import React from "react";
import styled from "styled-components";
import theme from "styles/theme";
import SettingIcon from "components/atoms/svg/Setting";
import ProfileIcon from "components/atoms/svg/User";
import CircleIcon from "components/atoms/svg/Circle";
const Wrapper = styled.div`
  background-color: #e7e8eb;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 25px;
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
const Setting = styled.div``;

export default function AsideStats(): JSX.Element {
  return (
    <Wrapper>
      <Profile>
        <ProfileIcon />
        <Circle>
          <CircleIcon />
        </Circle>
      </Profile>
      <UserStat>
        <div>수업듣는 미엘</div>
        <div style={{ color: "#777777", fontSize: `${theme.size.h5}px` }}>
          수강생으로 로그인됨
        </div>
      </UserStat>
      <Setting>
        <SettingIcon />
      </Setting>
    </Wrapper>
  );
}
