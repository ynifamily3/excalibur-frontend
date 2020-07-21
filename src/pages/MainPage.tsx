import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";
import { Button, withStyles, Theme, createStyles } from "@material-ui/core";
import { useUserState, useUserStateDispatch } from "../contexts/UserContext";

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
  // const userStateContext = useContext(UserStateContext);
  const handleLogin = () => {
    history.push("/login");
  };
  const handleAbout = () => {
    history.push("/about");
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
        이즈로그인드 : {userState.isLogin === false ? "폴스" : userState.id}
      </div>
      <div className="App-buttons">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          로그인
        </Button>
        <Button variant="contained" onClick={handleAbout}>
          엑스칼리버에 대하여...
        </Button>
        <BootstrapInput
          id="bootstrap-input"
          value={input}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleExecPythonCode}>
          실행
        </Button>
      </div>
    </header>
  );
}

export default MainPageComponent;
