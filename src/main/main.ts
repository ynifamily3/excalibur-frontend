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
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";
import isDev from "electron-is-dev";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

let trayIcon = null;
let mainWindow: BrowserWindow;
enum MODE {
  NORMAL,
  ANALYSIS,
}
let mode = MODE.NORMAL;
let isQuiting = isDev ? true : false; // false인데 디버깅하기 싫어서 true로 바꿈
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

ipcMain.handle("getAlwaysOnStatus", async () => {
  return mainWindow.isAlwaysOnTop();
});

ipcMain.on("hideMainWindow", () => {
  mainWindow.hide();
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
  mode = MODE.ANALYSIS;
  noDuplicateCode({ w: 618, h: 102, opacity: 0.7 });
});

ipcMain.on("analysisFold", () => {
  noDuplicateCode({ w: 100, h: 102 });
});

ipcMain.on("analysisOpen", () => {
  noDuplicateCode({ w: 618, h: 102, opacity: 0.7 });
});

ipcMain.on("normalMode", (event, argument) => {
  mode = MODE.NORMAL;
  mainWindow.setAlwaysOnTop(argument);
  mainWindow.setResizable(true);
  mainWindow.setOpacity(1);
  mainWindow.setMinimumSize(1280, 720);
  const { x, y, width, height } = electron.screen.getDisplayMatching(
    mainWindow.getBounds()
  ).workArea;
  mainWindow.setPosition(
    (x + width) / 2 - 1280 / 2,
    (y + height) / 2 - 720 / 2,
    true
  );
  mainWindow.setSize(1280, 720, true);
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
  mainWindow = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
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
    installExtension([REDUX_DEVTOOLS])
      .then((name) => console.log(`확장 추가됨:  ${name}`))
      .catch((err) => console.log("에러 발생: ", err));
  }
});
