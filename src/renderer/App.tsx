import "normalize.css";
import "styles/global.css";
import "animate.css";

import EscButton from "components/atoms/EscButton";
import PinButton from "components/atoms/PinButton";
import Hover from "components/restricted/Hover";
import Titlebar from "components/restricted/Titlebar";
import { ModalProvider } from "contexts/modalContext";
import { ipcRenderer } from "electron";
import WaitingComponent from "hocs/WaitingComponent";
import React, { useEffect, useMemo, useState } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { RootState } from "rootReducer";

import { routes } from "./routes";
const Intro = React.lazy(() => import("pages/Intro"));

function App() {
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);
  const { isTransparent } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    // 항상 위 상태를 메인 프로세스로부터 불러옵니다.
    (async function () {
      setAlwaysOnTop(await ipcRenderer.invoke("getAlwaysOnStatus"));
    })();
  }, []);
  return (
    <>
      {!isTransparent && (
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
        </>
      )}
      <ModalProvider>
        <HashRouter>
          <Route exact key="/" path="/" component={WaitingComponent(Intro)} />
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </HashRouter>
      </ModalProvider>
    </>
  );
}

export default hot(module)(App);
