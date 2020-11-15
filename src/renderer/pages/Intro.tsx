import Button from "components/atoms/Button";
import Novalid from "components/atoms/Novalid";
import Caution from "components/atoms/svg/Caution";
import Email from "components/atoms/svg/Email";
import ExcaliburLogo from "components/atoms/svg/ExcaliburLogo";
import GoogleLogo from "components/atoms/svg/GoogleLogo";
import Key from "components/atoms/svg/Key";
import QuizModal from "components/complex/QuizModal";
import { ModalContext } from "contexts/modalContext";
import { ipcRenderer } from "electron";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "repos";
import { signIn } from "repos/account";
import { RootState } from "rootReducer";
import { signInAction } from "slices/accountSlice";
import styled from "styled-components";

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
  width: 100%;
  height: 47px;
  padding-left: 42px;
`;

const A = styled.button`
  cursor: default;
  background-color: inherit;
  border: none;
  text-decoration: underline;
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
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.account);
  const { handleModal } = useContext(ModalContext);
  const [invalidNumber, setInvalidNumber] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "jongkeun.ch_@gmail.com",
    password: "1q2w3e4r!",
  });

  // refresh Token을 가져온다.
  const [savedRefreshToken, setSavedRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  useEffect(() => {
    ipcRenderer.send("resizeWindow", {
      width: 800,
      height: 600,
      animated: true,
    });
  }, []);

  useEffect(() => {
    if (isLogin) history.replace("/dashboard");
  }, [isLogin, history]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormInput({
      ...formInput,
      [e.target.name]: e.currentTarget.value,
    });
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      handleLoginButton();
    }
  }

  function handleLoginButton() {
    // NOTE 로그인 시도에 실패하였을 때 보여줌.
    if (isPending) return;
    setIsPending(true);
    (async function () {
      try {
        const rtn = await signIn(formInput);
        const {
          accessToken,
          refreshToken,
          id,
          name,
          email,
          role,
          type,
        } = rtn.data.data;
        console.log(
          "%c" + accessToken + " id: " + id,
          "background:#222; color:#bada55"
        );
        setAccessToken(accessToken); // axios 설정을 바꿈.
        setSavedRefreshToken(refreshToken); // 로컬스토리지에 저장됨.
        dispatch(signInAction({ email, id, mode: role, name, type }));
      } catch (error) {
        console.error("에러:", error);
        setInvalidNumber((inv) => inv + 1);
      } finally {
        setIsPending(false);
      }
    })();
  }

  return (
    <Wrapper>
      <div>
        <ExcaliburLogo />
      </div>
      {/* <div>
        <Button
          onClick={() => {
            handleModal(
              <QuizModal
                isAnswer={[false, true, false]}
                description={"1형식은 주어와 _______ 로 구분되어 있다."}
                timeLimit={10 * 1000}
                selections={["1. 형용사", "2. 동사", "3. 관사"]}
              />
            );
          }}
          color="red"
          style={{
            width: "auto",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          ⚡ 퀴즈 팝업 보기 ⚡ listen
        </Button>
      </div> */}
      <LoginForm>
        <LoginInputWrapper>
          <div style={{ position: "absolute", left: 10, top: 10 }}>
            <Email />
          </div>
          <LoginInput
            placeholder="이메일"
            type="text"
            name="email"
            value={formInput.email}
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
            value={formInput.password}
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
            opacity: `${isPending ? 0.5 : 1}`,
            width: "100%",
            margin: 0,
            border: "none",
            height: "47px",
            borderRadius: 0,
          }}
          disabled={isPending}
          onClick={handleLoginButton}
        >
          {!isPending ? "로그인" : "로그인 중..."}
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
