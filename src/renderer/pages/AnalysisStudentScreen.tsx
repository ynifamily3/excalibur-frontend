import Button from "components/atoms/Button";
import { CameraBox } from "components/atoms/CameraBox";
import Novalid from "components/atoms/Novalid";
import Caution from "components/atoms/svg/Caution";
import { ipcRenderer } from "electron";
import { useCameraStream } from "hooks/useCamera";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IIsActive, isActive } from "repos/course";
import { uploadStudentVideo } from "repos/file";
import { addDrowsnesses } from "repos/session";
import { RootState } from "rootReducer";
import { toAnalysisMode, toNormalMode } from "slices/globalStateSlice";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import { calculateMediaDuration, makeId, saveBlob } from "utils";

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
  const timeSpace = useRef<number>(+new Date()); // 측정 실행 시간
  const cameraBox = useRef<HTMLDivElement>();
  const [showVideo, setShowVideo] = useState(true);
  const videoData = useRef<Blob[]>([]);
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const { mode, analysisStat } = useSelector(
    (state: RootState) => state.global
  );

  // 로컬 스토리지에 저장 된 카메라들 목록입니다.
  const [currentCamera] = useLocalStorage("current_camera_device", "default");

  // 카메라 스트림입니다.
  const [streamStatus, stream, triggerCameraStream] = useCameraStream();

  // 분석 모드로 전환하고 창 크기를 조정합니다.
  useEffect(() => {
    // 분석 모드로 전환합니다. (이전 창에서 호출하도록 변경함. 코드옮김.)

    ipcRenderer.send("resizeWindow", {
      width: 300,
      height: 500,
      animated: true,
    });
    ipcRenderer.send("positionWindow", { w: 300, h: 500 });
    return () => {
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
      // console.log("스트림", stream);
      video.current.srcObject = stream;
    }
  }, [streamStatus, stream, showVideo]);

  const startRecording = useCallback(
    (stream: MediaStream) => {
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=h264",
      });

      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
      function handleDataAvailable(event: BlobEvent) {
        if (event.data.size > 0) {
          // event.data가 블롭입니다.
          videoData.current.push(event.data);
          const video = document.createElement("video");
          video.controls = true;
          video.src = URL.createObjectURL(videoData.current[0]);
          // const blob = new Blob(videoData.current);
          (async () => {
            // USAGE EXAMPLE :
            // console.log("전:", video.duration);
            await calculateMediaDuration(video); // 크롬 자체 버그 회피 (duration을 못 읽어오는 문제 해결)
            // console.log("후: ", video.duration);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const ysFixWebmDuration = require("../utils/fix-webm-duration");
            // console.log(video.duration*1000);
            ysFixWebmDuration(
              videoData.current[0],
              video.duration * 1000,
              (fixedBlob: Blob) => {
                console.log("!!", fixedBlob);
                // saveBlob(URL.createObjectURL(fixedBlob), "test.mkv");
                const fileOfBlob = new File(
                  [fixedBlob],
                  `soogang${makeId(16)}.mkv`
                );
                uploadStudentVideo(fileOfBlob).then((response) => {
                  const { data } = response;
                  // console.log(data, "끝!");
                  // TODO 졸음구간 추가 요청을 서버로 보낸다.
                  data.forEach((value) => {
                    const { end, start } = value;
                    // 서버에 졸음 정보를 보낸다.
                    addDrowsnesses({
                      endSecond: end + timeSpace.current,
                      startSecond: start + timeSpace.current,
                      accountId: analysisStat.accountId,
                      analysisSessionId: analysisStat.sessionId,
                    });
                  });
                });
              }
            );
          })();
        }
      }
      return recorder;
    },
    [analysisStat.sessionId, analysisStat.accountId]
  );

  function stopRecording(mediaRecorder: MediaRecorder) {
    // halt!
    try {
      mediaRecorder.stop();
    } catch (e) {
      console.log("정리에러:", e);
    }
    videoData.current = [];
  }

  // 10초짜리 동영상을 캡처해서 서버에 주기적으로 보냅니다
  useEffect(() => {
    if (streamStatus !== "done" || !stream) {
      return;
    }
    timeSpace.current = +new Date();
    let recorder = startRecording(stream);
    const intervalID = setInterval(() => {
      timeSpace.current = +new Date();
      stopRecording(recorder);
      recorder = startRecording(stream);
    }, 10 * 1000);
    return () => {
      clearInterval(intervalID);
      stopRecording(recorder);
    };
  }, [streamStatus, stream, startRecording]);

  // 서버와의 지속적인 통신으로 계속 active상태인지 감시합니다.
  const getActives = useCallback(async () => {
    const ret = await isActive();
    // console.log(ret.data.data);
    const activatedList = ret.data.data;
    for (let i = 0; i < activatedList.length; i++) {
      if (activatedList[i].id === analysisStat.sessionId) return;
    }
    // 여기까지 온 거면 액티브된것이 없으므로 분석을 종료시킨다.
    dispatch(changeDashboardPage("listlectureanalysis"));
    alert("강의자에 의해 종료되었습니다.");
  }, [analysisStat.sessionId, dispatch]);

  useEffect(() => {
    getActives();
    const tickId = setInterval(() => {
      getActives();
    }, 1000);
    return () => {
      clearInterval(tickId);
    };
  }, [getActives]);

  // TODO 퀴즈도 있는지 감시합니다.
  //
  // TODO 이상한 프로세스를 감시합니다.
  // (async function () {
  //   const proc = JSON.parse(await ipcRenderer.invoke("getProcessList"));
  //   console.log(proc);
  // })();

  return (
    <Wrapper>
      <Title>{analysisStat.name}</Title>
      <CameraBoxWrapper>
        <CameraBox
          ref={cameraBox}
          style={{ width: "250px", height: "250px", transition: "height 0.5s" }}
        >
          {streamStatus === "loading" && <>불러오는 중...</>}
          {(streamStatus === "error" || streamStatus === "idle") && (
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
