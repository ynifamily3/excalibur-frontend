import {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  NotificationConstructorOptions,
} from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import { PythonShell } from "python-shell";
import * as fs from "fs";
const psList = require("ps-list");
// import psList from "ps-list";

// TODO: electron-reloader를 작동시킨다.
// try {
//   require("electron-reloader")(module, {
//     watchRenderer: false,
//   });
// } catch (_) {}

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    //alwaysOnTop: true,
    center: true,
    //fullscreen: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 각종 emit event 리스너 등록
  ipcMain.on("resize", (event, { x, y }: { x: number; y: number }) => {
    mainWindow.setSize(x, y, true);
  });

  ipcMain.on("execPython", (event, args) => {
    PythonShell.runString(args, undefined, function (error, output) {
      if (error) throw error;
      console.log(output);
    });
  });

  ipcMain.on("saveFile", (event, args) => {
    const myNotification = new Notification({
      title: "아인",
      subtitle: "맥에서만",
      body: " 내용입니다.",
    });
    myNotification.show();
  });

  ipcMain.on("getProcList", (event, args) => {
    const myNotification = new Notification({
      title: "프로세스 분석",
      body: "겟 프락 리스트",
    });
    myNotification.show();
    psList().then(
      (value: any) => {
        event.sender.send("getProcListReply", value);
      },
      (error: any) => {
        event.sender.send("getProcListReply", error);
      }
    );
  });

  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = undefined!;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
