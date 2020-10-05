import electron, {
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
  mainWindow.setMinimumSize(width, height);
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

ipcMain.on("analysisMode", () => {
  mainWindow.setAlwaysOnTop(true);
  console.log("셋 사이즈..");
  mainWindow.setMinimumSize(618, 102);
  mainWindow.setSize(618, 102, true);
  mainWindow.setResizable(false);
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setPosition(width - 618, height - 102 - 100, true);
  mainWindow.setOpacity(0.7);
});

ipcMain.on("analysisFold", () => {
  mainWindow.setMinimumSize(100, 102);
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setPosition(width - 100, height - 102 - 100, true);
  mainWindow.setResizable(true);
  mainWindow.setSize(100, 102, true);
  mainWindow.setResizable(false);
});

ipcMain.on("analysisOpen", () => {
  mainWindow.setMinimumSize(618, 102);
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setPosition(width - 618, height - 102 - 100, true);
  mainWindow.setResizable(true);
  mainWindow.setSize(618, 102, true);
  mainWindow.setResizable(false);
});

ipcMain.on("normalMode", (event, argument) => {
  mainWindow.setAlwaysOnTop(argument);
  mainWindow.setResizable(true);
  mainWindow.setSize(1280, 720, true);
  mainWindow.setMinimumSize(1280, 720);
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
  if (isDev) {
    console.log("** 개발 모드입니다. 크롬 확장을 설치하겠습니다.");
    console.log(
      "https://github.com/MarshallOfSound/electron-devtools-installer#readme"
    );
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`확장 추가됨:  ${name}`))
      .catch((err) => console.log("에러 발생: ", err));
  }
});
