import Button from "components/atoms/Button";
import { CameraBox } from "components/atoms/CameraBox";
import Novalid from "components/atoms/Novalid";
import Caution from "components/atoms/svg/Caution";
import { ipcRenderer } from "electron";
import { useCameraStream } from "hooks/useCamera";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toAnalysisMode, toNormalMode } from "slices/globalStateSlice";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  margin-top: 48px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraBoxWrapper = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
`;

const Novalid2 = styled(Novalid)`
  margin: 10px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin: 16px 0;
`;

const Bottom = styled(Title)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Button2 = styled(Button)`
  margin: 0;
  background-color: rgb(248, 249, 249);
  border: 1px solid rgb(238, 239, 241);
  color: rgb(98, 98, 98);
  border-radius: 6px;
`;

const AnalysisStudentScreen: FC = () => {
  const dispatch = useDispatch();
  const video = useRef<HTMLVideoElement>();
  const cameraBox = useRef<HTMLDivElement>();
  const [showVideo, setShowVideo] = useState(true);

  // 로컬 스토리지에 저장 된 카메라들 목록입니다.
  const [currentCamera] = useLocalStorage("current_camera_device", "default");

  // 카메라 스트림입니다.
  const [streamStatus, stream, triggerCameraStream] = useCameraStream();

  // 분석 모드로 전환하고 창 크기를 조정합니다.
  useEffect(() => {
    dispatch(toAnalysisMode()); // Aside, title 보이는지의 여부 결정
    ipcRenderer.send("resizeWindow", {
      width: 300,
      height: 500,
      animated: true,
    });
    ipcRenderer.send("positionWindow", { w: 300, h: 500 });
    return () => {
      // NOTE 디버깅 시 밑 잠깐 주석 처리
      dispatch(toNormalMode());
      ipcRenderer.send("resizeWindow", {
        width: 800,
        height: 600,
        animated: true,
      });
      ipcRenderer.send("centerWindow", { _w: 800, _h: 600 });
    };
  }, [dispatch]);

  // 카메라를 획득합니다.
  useEffect(() => {
    if (currentCamera === "default") {
      console.log("카메라가 없군요! 이런!");
    } else {
      triggerCameraStream(currentCamera);
    }
  }, [currentCamera, triggerCameraStream]);

  // 스트림을 획득하면 비디오를 표현해 줍니다.
  useEffect(() => {
    if (!showVideo) {
      cameraBox.current.style.height = "100px";
    } else {
      cameraBox.current.style.height = "250px";
    }
    if (streamStatus === "done" && showVideo) {
      console.log("스트림", stream);
      video.current.srcObject = stream;
    }
  }, [streamStatus, stream, showVideo]);

  return (
    <Wrapper>
      <Title>물리 1차시 - 김지수 교수님</Title>
      <CameraBoxWrapper>
        <CameraBox
          ref={cameraBox}
          style={{ width: "250px", height: "250px", transition: "height 0.5s" }}
        >
          {streamStatus === "idle" && <>...</>}
          {streamStatus === "loading" && <>불러오는 중...</>}
          {streamStatus === "error" && (
            <Novalid2>
              <Caution color={"rgb(245, 87, 93)"} width="45" height="45" />
              <div>카메라가 설정이 되지 않았어요! </div>
              <div>카메라 설정을 하셔서 본인의 집중력을 알려주세요!</div>
            </Novalid2>
          )}
          {streamStatus === "done" && showVideo && (
            <video
              autoPlay={true}
              ref={video}
              width="100%"
              height="100%"
            ></video>
          )}
          {streamStatus === "done" && !showVideo && (
            <Novalid2 style={{ color: "rgb(114,114,114)" }}>
              <div>미리보기 화면을 숨겼습니다.</div>
            </Novalid2>
          )}
        </CameraBox>
      </CameraBoxWrapper>
      <div> - </div>
      <div>집중도: 100% / 이해도: 10/11</div>
      <Bottom>
        <Button2
          onClick={() => {
            setShowVideo((sv) => !sv);
          }}
        >
          미리보기 {showVideo ? "숨기기" : "보이기"}
        </Button2>
        <Button2
          onClick={() => {
            if (confirm("수업이 모두 끝나셨습니까?")) {
              dispatch(changeDashboardPage("main"));
            }
          }}
        >
          종료하고 나가기
        </Button2>
      </Bottom>
    </Wrapper>
  );
};
export { AnalysisStudentScreen };
