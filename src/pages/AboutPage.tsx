import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

function AboutPageComponent() {
  const history = useHistory();
  const handleBack = () => {
    history.replace("/");
  };

  useEffect(() => {
    ipcRenderer.send("resize", { x: 800, y: 600 });
  }, []);

  return (
    <header className="App-header">
      <p>
        엑스칼리버(Excalibur)는 강의자와 수강생 간 비대면 강의의 효율을 높이고자
        만든 서비스입니다.
      </p>
      <div className="App-buttons">
        <Button variant="contained" onClick={handleBack}>
          알겠습니다.
        </Button>
      </div>
    </header>
  );
}

export default AboutPageComponent;
