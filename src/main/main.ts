import path from "path";

import { BrowserWindow, Menu, Tray, app } from "electron";
import isDev from "electron-is-dev";

import { registerIPCs } from "./ipc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let trayIcon = null;
let mainWindow: BrowserWindow;

let isQuiting = isDev ? true : false; // false인데 디버깅하기 싫어서 true로 바꿈
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const contextMenu = Menu.buildFromTemplate([
  {
    label: "엑스칼리버 꺼내기",
    click: function () {
      mainWindow.show();
    },
  },
  {
    label: "종료",
    click: function () {
      isQuiting = true;
      app.quit();
    },
  },
]);

const createWindow = (): void => {
  if (process.platform === "darwin") app.dock.hide();
  mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "assets/icons/mac/icon.icns"),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  registerIPCs(mainWindow);
  app.commandLine.appendSwitch("disable-web-security");
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  isDev && mainWindow.webContents.openDevTools();

  mainWindow.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

app.on("ready", createWindow);

app.on("activate", () => {
  mainWindow.show();
});

app.whenReady().then(() => {
  trayIcon = new Tray(
    "./assets/excalibur.png",
    "excalibur-swordmaster-client-my-guid"
  );
  trayIcon.setContextMenu(contextMenu);
});
