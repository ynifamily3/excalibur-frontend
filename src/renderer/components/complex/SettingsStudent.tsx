import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import Select from "components/atoms/Select";
import { useCameraList, useCameraStream } from "hooks/useCamera";
import { useLocalStorage } from "hooks/useLocalStorage";

const UnitHorizontal = styled.div`
  display: flex;
`;
const UnitVertical = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Unit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const UnitTitle = styled.div`
  font-size: ${theme.size.h4}px;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const CameraBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  padding: 0;
  width: 100%;
  height: 324px;
  background-color: rgb(248, 249, 249);
  border: 1px solid rgb(238, 239, 241);
  border-radius: 6px;
`;

const SettingsStudent = (): JSX.Element => {
  const video = useRef<HTMLVideoElement>();
  const [
    cameraListLoadedstatus,
    cameraList,
    triggerCameraList,
  ] = useCameraList();
  const [streamStatus, stream, triggerCameraStream] = useCameraStream();

  // 로컬 스토리지에 저장 된 카메라들 목록입니다.
  const [currentCamera, setLSCurrentCamera] = useLocalStorage(
    "current_camera_device",
    "default"
  );

  // 카메라 목록을 불러옵니다.
  useEffect(() => {
    triggerCameraList();
  }, [triggerCameraList]);

  // 스트림을 선택합니다.
  useEffect(() => {
    if (!stream || streamStatus !== "done") return;
    video.current.srcObject = stream;
  }, [stream, streamStatus]);

  // 카메라 기본값이 있는 경우 그것의 스트림을 선택하도록 트리거합니다.
  useEffect(() => {
    if (currentCamera === "default") return;
    triggerCameraStream(currentCamera);
  }, [currentCamera, triggerCameraStream]);

  useEffect(() => {
    if (cameraListLoadedstatus !== "done") return;
    if (!cameraList.map((x) => x.deviceId).includes(currentCamera)) {
      setLSCurrentCamera("defalut");
    }
  }, [cameraListLoadedstatus, cameraList, currentCamera, setLSCurrentCamera]);

  return (
    <>
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
                disabled={
                  cameraListLoadedstatus === "loading" ||
                  streamStatus === "loading"
                }
                value={currentCamera}
                onChange={(e) => {
                  setLSCurrentCamera(e.currentTarget.value);
                  triggerCameraStream(e.currentTarget.value);
                }}
              >
                <option value="default">선택해주세요..</option>
                {cameraList.map((cameraElem) => {
                  return (
                    <option
                      key={cameraElem.deviceId}
                      value={cameraElem.deviceId}
                    >
                      {(() => {
                        const xx = cameraElem.label.split(" ");
                        const yy = xx.slice(0, xx.length - 1);
                        return yy.join(" ");
                      })()}
                    </option>
                  );
                })}
              </Select>
            </div>
          </Unit>
        </UnitVertical>
        <Unit>
          <UnitTitle>미리 보기</UnitTitle>
          <CameraBox>
            {streamStatus === "idle" && <>선택해주세요</>}
            {streamStatus === "loading" && <>불러오는 중...</>}
            {streamStatus === "error" && <>미리보기 화면 취득 실패</>}
            {streamStatus === "done" && (
              <video autoPlay={true} ref={video} width="100%"></video>
            )}
          </CameraBox>
        </Unit>
      </UnitHorizontal>
    </>
  );
};

export default SettingsStudent;
