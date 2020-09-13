import { app, BrowserWindow, ipcMain, Notification } from "electron";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let mainWindow: BrowserWindow;

import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import isDev from "electron-is-dev";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

ipcMain.on("resizeWindow", (event, argument) => {
  const { width, height, animated } = argument;
  mainWindow.setSize(width, height, animated);
});

ipcMain.on("notification", (event, argument) => {
  const noti = new Notification(argument);
  noti.show();
  noti.on("click", () => {
    noti.close();
  });
});

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  isDev && mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (isDev) {
  console.log("** 개발 모드입니다. 크롬 확장을 설치하겠습니다.");
  console.log(
    "https://github.com/MarshallOfSound/electron-devtools-installer#readme"
  );
  app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`확장 추가됨:  ${name}`))
      .catch((err) => console.log("에러 발생: ", err));
  });
}
