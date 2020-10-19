import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/atoms/Button";
import styled from "styled-components";
// import { ModalContext } from "contexts/modalContext";
import ExcaliburLogo from "components/atoms/svg/ExcaliburLogo";
// import QuizModal from "components/complex/QuizModal";
// import Minipeople from "components/atoms/svg/MiniPeople";
import Email from "components/atoms/svg/Email";
import Key from "components/atoms/svg/Key";
import Novalid from "components/atoms/Novalid";
import Caution from "components/atoms/svg/Caution";
import GoogleLogo from "components/atoms/svg/GoogleLogo";
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioSelect,
} from "components/atoms/Radio";

const Wrapper = styled.div`
  margin-top: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 343px;
  min-height: 237px;
  margin-top: 30px;
  align-items: center;
`;

const LoginInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 25px;
`;

const LoginInput = styled.input`
  border: none;
  background-color: rgb(242, 243, 246);
  /* border-radius: 12px; */
  width: 100%;
  height: 47px;
  padding-left: 42px;
`;

const A = styled.button`
  cursor: default;
  background-color: inherit;
  border: none;
  text-decoration: underline;
  /* text-underline-position: under; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(96, 96, 96);
  width: 150px;
  height: 30px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default function Intro(): JSX.Element {
  const history = useHistory();
  // const { handleModal } = useContext(ModalContext);
  const [invalidNumber, setInvalidNumber] = useState(0);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput({
      ...formInput,
      [event.target.name]: event.currentTarget.value,
    });
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      handleLoginButton();
    }
  }

  function handleLoginButton() {
    // alert("로그인 액션 트리거됨." + JSON.stringify(formInput));
    setInvalidNumber(invalidNumber + 1);
  }

  return (
    <Wrapper>
      <div style={{ marginLeft: "-50px" }}>
        <ExcaliburLogo />
      </div>
      <LoginForm>
        {/* <RadioGroup>
          <label htmlFor="teacher">
            <RadioSelect>
              <Radio
                type="radio"
                name="loginMode"
                id="teacher"
                value="teacher"
                onChange={handleFormChange}
                defaultChecked={formInput.loginMode === "teacher"}
              />
              <RadioLabel htmlFor="teacher">강의자</RadioLabel>
            </RadioSelect>
          </label>
          <label htmlFor="student">
            <RadioSelect>
              <Radio
                type="radio"
                name="loginMode"
                id="student"
                value="student"
                onChange={handleFormChange}
                defaultChecked={formInput.loginMode === "student"}
              />
              <RadioLabel htmlFor="student">수강생</RadioLabel>
            </RadioSelect>
          </label>
        </RadioGroup> */}
        <LoginInputWrapper>
          <div style={{ position: "absolute", left: 10, top: 10 }}>
            <Email />
          </div>
          <LoginInput
            placeholder="이메일"
            type="text"
            name="email"
            onChange={handleFormChange}
            onKeyDown={handleEnterKey}
          />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <div style={{ position: "absolute", left: 10, top: 10 }}>
            <Key />
          </div>
          <LoginInput
            placeholder="비밀번호"
            type="password"
            name="password"
            onChange={handleFormChange}
            onKeyDown={handleEnterKey}
          />
        </LoginInputWrapper>
        {invalidNumber > 0 ? (
          <Novalid style={{ margin: "10px 0" }}>
            <Caution color={"rgb(245, 87, 93)"} />
            &nbsp;이메일 또는 비밀번호가 틀립니다. ({invalidNumber}회)
          </Novalid>
        ) : (
          <div style={{ height: "38px" }}></div>
        )}
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
          onClick={handleLoginButton}
        >
          로그인
        </Button>
        <Button
          color="#032D3C"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            padding: 0,
            justifyContent: "center",
          }}
        >
          <GoogleLogo /> Google 로그인
        </Button>
        <A
          onClick={() => {
            history.replace("/signup");
          }}
        >
          회원가입
        </A>
        <A
          onClick={() => {
            // history.replace("/resetpassword")
          }}
        >
          비밀번호 재설정
        </A>
      </LoginForm>
    </Wrapper>
  );
}

{
  /* <div>
        <Button
          onClick={() => {
            history.replace("/about");
          }}
          color="black"
          style={{
            marginTop: "20em",
            width: "10em",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          입장
        </Button>
        <Button
          onClick={() => {
            // NOTE: 퀴즈는 뜬금없이 출현하므로 IPC를 listen 하고 있어야 하는 것이 맞다.
            // 따라서 App.tsx에서 IPC를 listen 하고 있어야 한다.
            handleModal(
              <QuizModal
                isAnswer={[false, true, false, false]}
                description={"1형식은 주어와 _______ 로 구분되어 있다."}
                timeLimit={10 * 1000}
                selections={["1. 형용사", "2. 동사", "3. 관사", "4. 전치사"]}
              />
            );
          }}
          color="red"
          style={{
            marginTop: "20em",
            width: "auto",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          ⚡ 퀴즈 팝업 보기 ⚡ listen
        </Button>
      </div> */
}
