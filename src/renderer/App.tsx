import { hot } from "react-hot-loader";
import React, { useState } from "react";
import { ipcRenderer } from "electron";
import "normalize.css";
import "styles/global.css";
import "animate.css";
import PinButton from "components/atoms/PinButton";
import EscButton from "components/atoms/EscButton";
import Titlebar from "components/restricted/Titlebar";
import Hover from "components/restricted/Hover";
import { ModalProvider } from "contexts/modalContext";
import { MemoryRouter, Redirect, Route } from "react-router-dom";
import { routes } from "routes";
import WaitingComponent from "hocs/WaitingComponent";

const Intro = React.lazy(() => import("pages/Intro"));

function App() {
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);
  return (
    <>
      <div id="dragabletop" />
      <Titlebar />
      <Hover
        right="3.65em"
        style={{ zIndex: 300 }}
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
        style={{ zIndex: 300 }}
        onClick={() => {
          ipcRenderer.send("hideMainWindow");
        }}
      >
        <EscButton />
      </Hover>
      <ModalProvider>
        <MemoryRouter>
          {/* <Route exact key="/" path="/" component={WaitingComponent(Intro)} /> */}
          {/* NOTE 디버그 목적 라우트 점핑입니다. */}
          <Route exact key="/" path="/">
            <Redirect to="/dashboard" />
          </Route>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </MemoryRouter>
      </ModalProvider>
    </>
  );
}

export default hot(module)(App);
