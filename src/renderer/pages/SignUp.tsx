import React, { useEffect } from "react";
import styled from "styled-components";
import Gnb from "components/complex/Gnb";
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioSelect,
} from "components/atoms/Radio";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
import { shell } from "electron";
import Button from "components/atoms/Button";
import GoogleLogo from "components/atoms/svg/GoogleLogo";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "rootReducer";

const SignUpForm = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 1000px;
  margin-top: 50px;
`;

const Input = styled.input`
  border: none;
  background-color: rgb(242, 243, 246);
  width: 100%;
  height: 47px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Checkbox = styled.input`
  &::after {
    width: 20px;
    height: 20px;
    position: relative;
    border: 2px solid black;
    background-color: white;
    content: "";
    display: inline-block;
    top: -3px;
    left: -1px;
    box-sizing: border-box;
  }
  &:checked::after {
    content: "◆";
    /* font-size: 13px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ALabel = styled.label`
  padding: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default function SignUp(): JSX.Element {
  const history = useHistory();
  const { isLogin } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    console.log("Signup effect", isLogin, history);
    if (isLogin) history.replace("/dashboard");
  }, [isLogin, history]);

  return (
    <Wrapper>
      <Gnb titleMessage="회원가입" backButton={{ to: "/" }} />
      <SignUpForm>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            margin: "0 auto",
            // alignItems: "center",
            justifyContent: "center",
            // flex: 1,
            borderRight: "1px solid black",
          }}
        >
          <p>저는</p>
          <RadioGroup
            style={{
              justifyContent: "flex-start",
              flexDirection: "column",
              width: "250px",
            }}
          >
            <label htmlFor="teacher">
              <RadioSelect>
                <Radio
                  type="radio"
                  name="signUpMode"
                  id="teacher"
                  value="teacher"
                  // onChange={handleFormChange}
                  // defaultChecked={formInput.loginMode === "teacher"}
                />
                <RadioLabel htmlFor="teacher">강의자</RadioLabel>
              </RadioSelect>
            </label>
            <label htmlFor="student">
              <RadioSelect>
                <Radio
                  type="radio"
                  name="signUpMode"
                  id="student"
                  value="student"
                  // onChange={handleFormChange}
                  // defaultChecked={formInput.loginMode === "student"}
                />
                <RadioLabel htmlFor="student">수강생</RadioLabel>
              </RadioSelect>
            </label>
          </RadioGroup>

          <p
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            입니다.
            <span
              style={{
                fontSize: ".7em",
                color: "rgb(0,0,0,0.7)",
                marginLeft: "10px",
              }}
            >
              ※ 회원가입 후 변경할 수 없습니다.
            </span>
          </p>
          <CheckboxWrapper>
            <Checkbox type="checkbox" name="agree" id="agree" />
            <ALabel htmlFor="agree">
              <div style={{ flex: 1 }}>
                <a
                  style={{
                    color: "rgb(96,96,96)",
                    textUnderlinePosition: "under",
                  }}
                  href="https://exc.miel.dev/privacy"
                  title="클릭하면 새 창으로 브라우저가 열립니다."
                  onClick={(e) => {
                    e.preventDefault();
                    shell.openExternal(e.currentTarget.href);
                  }}
                >
                  Excalibur 이용 약관
                </a>
                에 동의합니다.
              </div>
            </ALabel>
          </CheckboxWrapper>
        </div>
        <div style={{ width: "400px", margin: "0 auto" }}>
          <Button
            color="#032D3C"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: "white",
              padding: 0,
              margin: 0,
              justifyContent: "center",
            }}
          >
            <GoogleLogo /> Google 계정으로 가입
          </Button>
          <p style={{ textAlign: "center" }}>또는</p>

          <Input type="text" placeholder="이름" />
          <Input type="email" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <Input type="password" placeholder="비밀번호 확인" />
          <div style={{ marginTop: "20px" }}>
            <Button
              color="white"
              style={{
                backgroundColor: "#032D3C",
                width: "100%",
                margin: 0,
                border: "none",
                height: "47px",
                borderRadius: 0,
              }}
            >
              회원가입
            </Button>
          </div>
        </div>
      </SignUpForm>
    </Wrapper>
  );
}
