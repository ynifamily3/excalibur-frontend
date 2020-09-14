import { hot } from "react-hot-loader";
import React, { useState } from "react";
import { ipcRenderer } from "electron";
import { RecoilRoot } from "recoil";
import "normalize.css";
import "styles/global.css";
import PinButton from "components/atoms/PinButton";
import EscButton from "components/atoms/EscButton";
import Titlebar from "components/restricted/Titlebar";
import Hover from "components/restricted/Hover";
import { MemoryRouter, Route } from "react-router-dom";
import WaitingComponent from "hocs/WaitingComponent";

const Intro = React.lazy(() => import("pages/Intro"));
const About = React.lazy(() => import("pages/About"));

function App() {
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);
  return (
    <RecoilRoot>
      <div id="dragabletop" />
      <Titlebar />
      <Hover
        right="3.65em"
        onClick={() => {
          alwaysOnTop
            ? ipcRenderer.send("alwaysOnTopDeActivate")
            : ipcRenderer.send("alwaysOnTopActivate");
          setAlwaysOnTop(!alwaysOnTop);
        }}
      >
        <PinButton isPinned={alwaysOnTop} />
      </Hover>
      <Hover
        onClick={() => {
          ipcRenderer.send("closeMainWindow");
        }}
      >
        <EscButton />
      </Hover>
      <MemoryRouter>
        <Route exact path="/" component={WaitingComponent(Intro)} />
        <Route exact path="/about" component={WaitingComponent(About)} />
      </MemoryRouter>
    </RecoilRoot>
  );
}

export default hot(module)(App);
