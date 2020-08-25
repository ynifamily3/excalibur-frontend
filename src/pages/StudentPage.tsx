import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Box, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Select from "@material-ui/core/Select";
import { useUserState } from "../contexts/UserContext";
var MediaStreamRecorder = require("msr"); // 카메라 레코더 (no type)

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

function StudentPage() {
  const history = useHistory();
  const userState = useUserState();

  const handleBack = () => {
    history.replace("/");
  };

  const [camera, setCamera] = React.useState("");
  const [microphone, setMicrophone] = React.useState("");
  const [cameraes, setCameraes] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const handleChangeCameraes = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCamera(event.target.value as string);
  };
  const handleChangeMicrophones = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setMicrophone(event.target.value as string);
  };
  const [enabled, setEnabled] = useState<boolean>(true);

  const camEl = useRef<HTMLVideoElement>(null);
  const handleCameraToggle = () => {
    setEnabled(!enabled);
    if (!enabled === true) {
      // TODO: 카메라를 켜야 됨
    } else {
      // TODO: 카메라를 꺼야 됨
    }
  };
  useEffect(() => {
    ipcRenderer.send("resize", { x: 360, y: 500 });
  }, []);

  // get camera
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      const cameraes = devices.filter((x) => x.kind === "videoinput");
      const microphones = devices.filter((x) => x.kind === "audioinput");
      cameraes.length > 0 && setCamera("0");
      microphones.length > 0 && setMicrophone("0");
      setCameraes(cameraes);
      setMicrophones(microphones);
    });
  }, [camEl]); // camEl dep 존재 필요여부 파악

  // play camera if changed
  useEffect(() => {
    let _stream: MediaStream;
    let _mediaRecorder: any;
    if (camera.length === 0 || cameraes.length === 0) return;
    navigator.getUserMedia(
      {
        video: {
          deviceId: cameraes[+camera].deviceId,
        },
        audio: false,
      },
      function (stream) {
        // on Success Function
        _stream = stream;
        const { current } = camEl;
        if (current !== null) {
          console.log("스트림: ", stream);
          current.srcObject = stream;
          // 5초마다 동영상 저장하는 액션 실행
          const mediaRecorder = new MediaStreamRecorder(stream);
          _mediaRecorder = mediaRecorder;
          mediaRecorder.mimeType = "video/mp4";
          mediaRecorder.ondataavailable = function (blob: Blob) {
            // POST/PUT "Blob" using FormData/XHR2
            const blobURL = URL.createObjectURL(blob);
            console.log(blobURL);
            ipcRenderer.send("saveFile", { blobURL, fileName: "test.mp4" });
            // mediaRecorder.save(blob, `test.mp4`);
          };
          mediaRecorder.start(5000); // 5초마다 영상 녹화
        }
      },
      function (error) {
        console.log(error);
      }
    );
    return function cleanUp() {
      if (_mediaRecorder) {
        _mediaRecorder.stop();
      }
      if (_stream) {
        _stream.getTracks().forEach(function (track) {
          track.stop(); // 카메라 추적을 중단한다.
        });
      }
    };
  }, [camera, cameraes]);
  return (
    <Box p={1}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Fab onClick={handleBack}>
            <ArrowBackIosIcon />
          </Fab>
        </Grid>
        <Grid item xs={6}>
          <code>
            로그인 여부:{" "}
            {userState.isLogin === false ? "로그아웃 상태" : userState.id}
          </code>
        </Grid>
        <Grid item xs={6}>
          <span style={{ textAlign: "left" }}>카메라</span>
        </Grid>
        <Grid item xs={6}>
          마이크
        </Grid>
        <Grid item xs={6}>
          <Select native value={camera} onChange={handleChangeCameraes}>
            {cameraes.map((x, i) => {
              return (
                <option key={x.label + i} value={i}>
                  {x.label}
                </option>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select native value={microphone} onChange={handleChangeMicrophones}>
            {microphones.map((x, i) => {
              return (
                <option key={x.label + i} value={i}>
                  {x.label}
                </option>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <video
            style={
              !enabled
                ? {
                    display: "none",
                  }
                : {
                    display: "block",
                  }
            }
            ref={camEl}
            id="video"
            height="150px"
            width="100%"
            autoPlay
          ></video>
          <div
            id="box"
            style={{
              width: "100%",
              height: "150px",
              display: enabled ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
            }}
          >
            비디오 숨겨짐
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleCameraToggle}
          >
            카메라 {enabled ? "숨기기" : "보이기"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined">
            로그아웃
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentPage;
