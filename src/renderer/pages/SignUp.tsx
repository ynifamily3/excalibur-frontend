import Button from "components/atoms/Button";
import { ALabel, Checkbox, CheckboxWrapper } from "components/atoms/Checkbox";
import Novalid from "components/atoms/Novalid";
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioSelect,
} from "components/atoms/Radio";
import Caution from "components/atoms/svg/Caution";
import GoogleLogo from "components/atoms/svg/GoogleLogo";
import Gnb from "components/complex/Gnb";
import { ipcRenderer, shell } from "electron";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "repos";
import { IRequestSignUp, signIn, signUp } from "repos/account";
import { RootState } from "rootReducer";
import { signInAction } from "slices/accountSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export default function SignUp(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.account);
  // form state
  const [role, setRole] = useState<"student" | "teacher">();
  const [isAgree, setIsAgree] = useState(false);
  const [inputAllowed, setInputAllowed] = useState(false);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  // refresh Token을 가져온다.
  const [, setSavedRefreshToken] = useLocalStorage("refreshToken", "");

  // pending state
  const [isPending, setIsPending] = useState(false);

  // 저는 강의자수강생, 이용약관동의시 입력 가능하게 해주는 이펙트
  useEffect(() => {
    if (isAgree && role) {
      setInputAllowed(true);
    } else {
      setInputAllowed(false);
    }
  }, [role, isAgree]);

  useEffect(() => {
    if (isLogin) history.replace("/dashboard");
  }, [isLogin, history]);

  useEffect(() => {
    ipcRenderer.send("resizeWindow", {
      width: 1280,
      height: 720,
      animated: false,
    });
    ipcRenderer.send("centerWindow");
    return () => {
      ipcRenderer.send("resizeWindow", {
        width: 800,
        height: 600,
        animated: false,
      });
      ipcRenderer.send("centerWindow");
    };
  }, []);

  const formValidateChecked = useCallback(() => {
    const { email, name, password, passwordCheck } = formInput;
    return (
      email.trim().length > 0 &&
      name.trim().length > 0 &&
      password.length > 0 &&
      password === passwordCheck
    );
  }, [formInput])();

  const handleSignUpMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as "student" | "teacher");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.currentTarget.value,
    });
  };

  const handleSignUpButton = () => {
    if (isPending) return;
    setIsPending(true);
    (async function () {
      try {
        await signUp({
          email: formInput.email,
          name: formInput.name,
          password: formInput.password,
          role,
          type: "normal",
        });

        const rtn = await signIn({
          email: formInput.email,
          password: formInput.password,
        });
        const {
          accessToken,
          refreshToken,
          id,
          name,
          email,
          type,
        } = rtn.data.data;
        setAccessToken(accessToken); // axios 설정을 바꿈.
        setSavedRefreshToken(refreshToken); // 로컬스토리지에 저장됨.
        dispatch(signInAction({ email, id, mode: role, name, type }));
      } catch (error) {
        console.error("에러:", error);
        if (error?.message) {
          alert(error.message);
        }
      } finally {
        setIsPending(false);
      }
    })();
  };

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
                  onChange={handleSignUpMode}
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
                  onChange={handleSignUpMode}
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
            <Checkbox
              type="checkbox"
              name="agree"
              id="agree"
              onClick={(e) => {
                setIsAgree(e.currentTarget.checked);
              }}
            />
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
            disabled={true || !inputAllowed}
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

          <Input
            type="text"
            name="name"
            placeholder="이름"
            disabled={!inputAllowed}
            onChange={handleInput}
          />
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            disabled={!inputAllowed}
            onChange={handleInput}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            disabled={!inputAllowed}
            onChange={handleInput}
          />
          <Input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            disabled={!inputAllowed}
            onChange={handleInput}
          />
          {formInput.password !== formInput.passwordCheck &&
            formInput.passwordCheck.length > 0 && (
              <Novalid style={{ margin: "10px 0" }}>
                <Caution color={"rgb(245, 87, 93)"} />
                패스워드와 패스워드 확인을 확인해주세요.
              </Novalid>
            )}
          <div style={{ marginTop: "20px" }}>
            <Button
              disabled={!inputAllowed || !formValidateChecked || isPending}
              color="white"
              style={{
                backgroundColor: "#032D3C",
                width: "100%",
                margin: 0,
                border: "none",
                height: "47px",
                borderRadius: 0,
              }}
              onClick={handleSignUpButton}
            >
              {!isPending ? "회원가입" : "잠시만 기다려주십시오..."}
            </Button>
          </div>
        </div>
      </SignUpForm>
    </Wrapper>
  );
}
