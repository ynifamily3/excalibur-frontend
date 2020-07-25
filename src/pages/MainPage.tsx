import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";
import { Button, withStyles, Theme, createStyles } from "@material-ui/core";
import { useUserState } from "../contexts/UserContext";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: { width: "100%" },
    input: {
      backgroundColor: theme.palette.common.white,
      marginBottom: "1em",
    },
  })
)(InputBase);

function MainPageComponent() {
  const [input, setInput] = useState<string>("");
  const userState = useUserState();
  const history = useHistory();
  const handleLogin = () => {
    history.replace("/login");
  };
  const handleAbout = () => {
    history.replace("/about");
  };
  const handleSetting = () => {
    history.replace("/setting");
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(event.target.value);
  };
  const handleExecPythonCode = () => {
    ipcRenderer.send("execPython", input);
  };

  useEffect(() => {
    ipcRenderer.send("resize", { x: 800, y: 600 });
  }, []);

  return (
    <header className="App-header">
      <div>
        엑스칼리버에 오신 것을 환영합니다.
        <br />
        isLogin : {userState.isLogin === false ? "로그인 안 함" : userState.id}
      </div>
      <div className="App-buttons">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          로그인 / 가입
        </Button>
        <Button variant="contained" onClick={handleAbout}>
          엑스칼리버에 대하여...
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSetting}>
          환경설정
        </Button>
        {/* 이곳에 파이썬 코드 입력 */}
        <BootstrapInput
          id="bootstrap-input"
          value={input}
          placeholder={"이곳에 파이썬 코드를 입력하세요..."}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleExecPythonCode}>
          코드 실행(결과는 콘솔에 표시됩니다.)
        </Button>
      </div>
    </header>
  );
}

export default MainPageComponent;
