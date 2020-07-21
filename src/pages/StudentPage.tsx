import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Box, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useUserState, useUserStateDispatch } from "../contexts/UserContext";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function StudentPage() {
  const history = useHistory();
  const classes = useStyles();
  const userState = useUserState();

  const handleBack = () => {
    // 디버깅 시에 자꾸 깜빡이긴한데 실서비스엔 문제 없겠지?
    history.push("/");
  };

  const [age, setAge] = React.useState("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  const [enabled, setEnabled] = useState<boolean>(false);
  const [cameraes, setCameraes] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const camEl = useRef(null);
  const handleCameraToggle = () => {
    setEnabled(!enabled);
    if (!enabled === true) {
      // 카메라를 켜야 됨
      // WebCamera.attach(camEl.current);
    } else {
      // 카메라를 꺼야 됨
      // WebCamera.reset();
    }
  };
  useEffect(() => {
    ipcRenderer.send("resize", { x: 360, y: 500 });
  }, []);

  // get camera
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      setCameraes(devices.filter((x) => x.kind === "videoinput"));
    });
  }, [camEl]);
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
            학생 페이지 이즈로그인 :{" "}
            {userState.isLogin === false ? "폴스" : userState.id}
          </code>
        </Grid>
        <Grid item xs={6}>
          <span style={{ textAlign: "left" }}>카메라</span>
        </Grid>
        <Grid item xs={6}>
          마이크
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              {cameraes.map((x, i) => {
                return <MenuItem value={i}>{x.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          마이크드롭다운
        </Grid>
        <Grid item xs={12}>
          <video
            ref={camEl}
            id="video"
            height="480"
            width="800"
            autoPlay
          ></video>
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
