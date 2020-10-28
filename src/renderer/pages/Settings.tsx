import React, { useEffect, useState } from "react";
import Gnb from "components/complex/Gnb";
import Select from "components/atoms/Select";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "rootReducer";
import styled from "styled-components";
import Loading from "components/atoms/Loading";
import { Buttontest as Button } from "components/atoms/Button";
import { signOutAction } from "slices/accountSlice";
import theme from "styles/theme";
import { useCameraList } from "hooks/useCamera";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Article = styled.div`
  padding: 36px;
  padding-bottom: 0;
  width: 720px;
  margin: 0 auto;
  height: calc(100vh - 74px);
  overflow: scroll;
`;

const Unit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /* &:not(:first-child) {
    opacity: 0;
  } */
`;

const UnitVertical = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const UnitHorizontal = styled.div`
  display: flex;
`;

const UnitTitle = styled.div`
  font-size: ${theme.size.h4}px;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 18px;
  border-radius: 100px;
  background-color: gray;
  opacity: 0.5;
`;
const Userinfolist = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
`;
const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  div:first-child {
    margin-bottom: 4px;
    font-size: ${theme.size.h5}px;
    color: rgb(135, 145, 155);
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  width: 100%;
  height: 150px;
  background-color: rgb(248, 249, 249);
  border: 1px solid rgb(238, 239, 241);
  border-radius: 6px;
`;

interface ICameraSelectionList {
  label: string;
  deviceId: string;
}

const Settings = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin, accountInfo } = useSelector(
    (state: RootState) => state.account
  );
  const [loaded, setLoaded] = useState(0);
  const [status, cameras, triggerCameraList] = useCameraList(false);
  const [cameraSelectionList, setCameraSelectionList] = useState<
    ICameraSelectionList[]
  >([]);

  useEffect(() => {
    console.log("Settings Effect", "로그인여부", isLogin, "히스토리", history);
    if (!isLogin) history.replace("/");
    else setLoaded(100);
  }, [isLogin, history]);

  useEffect(() => {
    console.log(
      "카메라리스트 트리거 이펙트: 로그인여부",
      isLogin,
      "어카운트인포",
      accountInfo
    );
    if (isLogin && accountInfo.mode === "student") triggerCameraList();
  }, [triggerCameraList, isLogin, accountInfo]);

  useEffect(() => {
    if (status === "done")
      setCameraSelectionList(
        cameras.map((camera) => {
          return { label: camera.label, deviceId: camera.deviceId };
        })
      );
    // 정상
    else setCameraSelectionList([]); // 로딩 중이거나 에러인 상황입니다.
  }, [status, cameras]);

  return (
    <>
      {loaded === 100 ? (
        <Wrapper>
          <Gnb titleMessage="설정" backButton={{ to: "/dashboard" }} />
          <Article>
            <Unit>
              <UnitTitle style={{ marginTop: 0 }}>내 계정</UnitTitle>
              <Box>
                <Profile />
                <Userinfolist>
                  <Userinfo>
                    <div>이름</div>
                    <div>미엘</div>
                  </Userinfo>
                  <Userinfo>
                    <div>이메일</div>
                    <div>jongkeun.ch@gmail.com</div>
                  </Userinfo>
                </Userinfolist>
              </Box>
            </Unit>
            {accountInfo.mode === "student" ? (
              <>
                {/* <Unit>학생</Unit> */}
                <UnitHorizontal>
                  <UnitVertical>
                    <Unit>
                      <UnitTitle>카메라</UnitTitle>
                      <div style={{ paddingRight: "16px" }}>
                        <Select
                          width="100%"
                          style={{
                            backgroundColor: " rgb(248, 249, 249)",
                            border: "1px solid rgb(238, 239, 241)",
                            borderRadius: "6px",
                            fontSize: 16,
                          }}
                        >
                          <option>시스템 기본값</option>
                          {cameraSelectionList.map((camera) => {
                            return (
                              <option key={camera.deviceId}>
                                {camera.label}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                    </Unit>
                    {/* <Unit>
                      <UnitTitle>카메라 설정 ...</UnitTitle>
                      <Select>
                        <option>시스템 기본값</option>
                      </Select>
                    </Unit> */}
                  </UnitVertical>
                  <Unit>
                    <UnitTitle>미리 보기</UnitTitle>
                    <Box style={{ padding: 0, height: 324 }}></Box>
                  </Unit>
                </UnitHorizontal>
              </>
            ) : (
              <>
                <Unit>강의자</Unit>
              </>
            )}
            <Unit>
              <Button
                color="red"
                style={{ padding: "18px", margin: 0, marginTop: 54 }}
                onClick={() => {
                  history.replace("/");
                  dispatch(signOutAction());
                }}
              >
                로그아웃
              </Button>
            </Unit>
          </Article>
        </Wrapper>
      ) : (
        <Loading>동적 컨텐츠 로딩 중... {loaded}%</Loading>
      )}
    </>
  );
};

Settings.defaultProps = {
  from: "/dashboard",
};

export default Settings;
