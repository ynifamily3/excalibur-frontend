import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import { PythonShell } from "python-shell";
import * as fs from "fs";

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
