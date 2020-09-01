import React from "react";
import { ipcRenderer } from "electron";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div>
        <button>윈도우 크기 조정</button>
        <button
          onClick={() =>
            ipcRenderer.send("notification", {
              title: "안녕",
              subtitle: "하세용",
              body: "내용 입니다",
            })
          }
        >
          노티피케이션
        </button>
      </div>
    </RecoilRoot>
  );
}

export default App;
