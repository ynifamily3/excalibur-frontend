import { exec } from "child_process";
import path from "path";

import electron, {
  BrowserWindow,
  Menu,
  Notification,
  Tray,
  app,
  ipcMain,
} from "electron";
import isDev from "electron-is-dev";

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

ipcMain.on("resizeWindow", (event, argument) => {
  const { width, height, animated } = argument;
  mainWindow.setMinimumSize(width, height);
  mainWindow.setSize(width, height, animated);
});

ipcMain.on("positionWindow", (event, argument) => {
  const { w, h } = argument;
  const { x, y, width, height } = electron.screen.getDisplayMatching(
    mainWindow.getBounds()
  ).workArea;
  mainWindow.setPosition(x + width - w, y + height - h - 100, true);
});

ipcMain.on("centerWindow", (event, argument) => {
  const { _w, _h } = argument;
  const { x, y, width, height } = electron.screen.getDisplayMatching(
    mainWindow.getBounds()
  ).workArea;
  mainWindow.setPosition(
    (x + width) / 2 - (_w ? _w : 800) / 2,
    (y + height) / 2 - (_h ? _h : 600) / 2,
    true
  );
});

ipcMain.on("notification", (event, argument) => {
  const noti = new Notification(argument);
  noti.show();
  noti.on("click", () => {
    noti.close();
  });
});

ipcMain.on("alwaysOnTopActivate", () => {
  mainWindow.setAlwaysOnTop(true);
});

ipcMain.on("alwaysOnTopDeActivate", () => {
  mainWindow.setAlwaysOnTop(false);
});

ipcMain.handle("getAlwaysOnStatus", async () => {
  return mainWindow.isAlwaysOnTop();
});

ipcMain.on("hideMainWindow", () => {
  mainWindow.hide();
});

ipcMain.handle("getProcessList", async () => {
  const scriptPath =
    process.platform === "darwin"
      ? path.resolve(__dirname, "processAnalysisMac.py")
      : path.resolve(__dirname, "processAnalysisWin.py");
  const res = new Promise<string>((resolve, reject) => {
    exec(`python ${scriptPath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("콘솔프린트 보고: ", stderr);
        resolve(stdout);
      }
    });
  });
  return await res;
});

function noDuplicateCode({
  w,
  h,
  opacity,
}: {
  w: number;
  h: number;
  opacity?: number;
}) {
  mainWindow.setResizable(true);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.setMinimumSize(w, h);
  const { x, y, width, height } = electron.screen.getDisplayMatching(
    mainWindow.getBounds()
  ).workArea;

  mainWindow.setSize(w, h, true);
  mainWindow.setPosition(x + width - w, y + height - h - 100, true);
  if (typeof opacity === "number") mainWindow.setOpacity(0.7);
  mainWindow.setResizable(false);
}

ipcMain.on("analysisMode", () => {
  noDuplicateCode({
    w: 618,
    h: 102,
    opacity: 0.7,
  });
});

ipcMain.on("analysisFold", () => {
  noDuplicateCode({ w: 100, h: 102 });
});

ipcMain.on("analysisOpen", () => {
  noDuplicateCode({ w: 618, h: 102, opacity: 0.7 });
});

ipcMain.on("normalMode", (event, argument) => {
  mainWindow.setAlwaysOnTop(argument);
  mainWindow.setResizable(true);
  mainWindow.setOpacity(1);
  mainWindow.setMinimumSize(800, 600);
  const { x, y, width, height } = electron.screen.getDisplayMatching(
    mainWindow.getBounds()
  ).workArea;
  mainWindow.setPosition(
    (x + width) / 2 - 800 / 2,
    (y + height) / 2 - 600 / 2,
    true
  );
  mainWindow.setSize(800, 600, true);
  // mainWindow.center();
});

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
