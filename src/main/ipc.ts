import { exec } from "child_process";
import path from "path";

import electron, { BrowserWindow, Notification, ipcMain } from "electron";

function registerIPCs(mainWindow: BrowserWindow): void {
  console.log(mainWindow);
  ipcMain.on("resizeWindow", (event, argument) => {
    const { width, height } = argument;
    mainWindow.setMinimumSize(width, height);
    mainWindow.setSize(width, height, false);
  });

  ipcMain.on("positionWindow", (event, argument) => {
    const { w, h } = argument;
    const { x, y, width, height } = electron.screen.getDisplayMatching(
      mainWindow.getBounds()
    ).workArea;
    mainWindow.setPosition(x + width - w, y + height - h - 100, false);
  });

  ipcMain.on("centerWindow", (event, argument) => {
    // const { _w, _h } = argument;
    // const { x, y, width, height } = electron.screen.getDisplayMatching(
    //   mainWindow.getBounds()
    // ).workArea;
    // mainWindow.setPosition(
    //   (x + width) / 2 - (_w ? _w : 800) / 2,
    //   (y + height) / 2 - (_h ? _h : 600) / 2,
    //   false
    // );
    mainWindow.center();
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
          console.log("표준 에러: ", stderr);
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

    mainWindow.setSize(w, h, false);
    mainWindow.setPosition(x + width - w, y + height - h - 100, false);
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
    // const { x, y, width, height } = electron.screen.getDisplayMatching(
    //   mainWindow.getBounds()
    // ).workArea;
    // mainWindow.setPosition(
    //   (x + width) / 2 - 800 / 2,
    //   (y + height) / 2 - 600 / 2,
    //   false
    // );
    mainWindow.center();
    mainWindow.setSize(800, 600, false);
  });
}

export { registerIPCs };
