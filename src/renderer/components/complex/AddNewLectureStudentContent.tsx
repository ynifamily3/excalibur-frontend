import BackButton from "components/atoms/BackButton";
import Button from "components/atoms/Button";
import Novalid from "components/atoms/Novalid";
import Select from "components/atoms/Select";
import Caution from "components/atoms/svg/Caution";
import SettingIcon from "components/atoms/svg/Setting";
import React, { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "rootReducer";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import color from "styles/color";
import theme from "styles/theme";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CODEWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 44px;
`;

const CODEINPUT = styled.input`
  all: unset;
  width: 500px;
  height: 50px;
  font-size: 55px;
  text-align: left;
  letter-spacing: 50px;
  font-stretch: "55px";
`;

const Underline = styled.div`
  position: absolute;
  width: 50px;
  height: 5px;
  background-color: #828282;
  left: ${({ order = 0 }: { order?: number }) => {
    return order + "px";
  }};
`;

export default function AddNewLectureStudentContent(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        style={{
          fontSize: theme.size.h2,
          marginBottom: "44px",
          display: "flex",
        }}
      >
        <BackButton
          onClick={() => {
            dispatch(changeDashboardPage("managelecture"));
          }}
        />{" "}
        새 강의 추가
      </div>
      <div style={{ width: "100%", marginLeft: 44 }}>
        새 강의를 추가하려면, 강의자가 전달한 초대 URL로 접속하세요.
        <br />
        <br />
        또는, 아래에 직접 초대 코드를 입력하세요.
      </div>
      <CODEWrapper>
        <CODEINPUT type="text" maxLength={6} placeholder={"000000"} />
        <Underline order={-10} />
        <Underline order={70} />
        <Underline order={150} />
        <Underline order={230} />
        <Underline order={310} />
        <Underline order={390} />
      </CODEWrapper>
      <Novalid>
        <Caution color={"rgb(245, 87, 93)"} />
        &nbsp;초대 코드가 유효하지 않습니다.
      </Novalid>

      <Button
        color="white"
        style={{
          backgroundColor: "#032D3C",
          borderRadius: 0,
          fontSize: "16px",
          width: "153px",
          height: "55px",
          marginTop: "44px",
          alignSelf: "center",
          marginRight: 0,
        }}
      >
        확인
      </Button>
    </Wrapper>
  );
}
