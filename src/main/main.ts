import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Notification,
  Tray,
} from "electron";
import path from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import isDev from "electron-is-dev";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let trayIcon = null;
let mainWindow: BrowserWindow;
let isQuiting = false;
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

ipcMain.on("alwaysOnTopActivate", () => {
  mainWindow.setAlwaysOnTop(true);
});

ipcMain.on("alwaysOnTopDeActivate", () => {
  mainWindow.setAlwaysOnTop(false);
});

ipcMain.on("hideMainWindow", () => {
  mainWindow.hide();
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
  mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "assets/excalibur.ico"),
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  isDev && mainWindow.webContents.openDevTools();

  //
  mainWindow.on("blur", () => {
    // mainWindow.setOpacity(0.5);
  });
  mainWindow.on("focus", () => {
    // mainWindow.setOpacity(1);
  });
  mainWindow.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
  // app.quit();
  // }
});

app.on("activate", () => {
  mainWindow.show();
});

if (isDev) {
  console.log("** 개발 모드입니다. 크롬 확장을 설치하겠습니다.");
  console.log(
    "https://github.com/MarshallOfSound/electron-devtools-installer#readme"
  );
  app.whenReady().then(() => {
    trayIcon = new Tray(
      "./assets/excalibur.png",
      "excalibur-swordmaster-client-my-guid"
    );
    trayIcon.setContextMenu(contextMenu);
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`확장 추가됨:  ${name}`))
      .catch((err) => console.log("에러 발생: ", err));
  });
}
