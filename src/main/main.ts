// electron App의 진입점
import { app, BrowserWindow, ipcMain, Notification } from "electron";
import * as path from "path";
import * as url from "url";
import * as dotenv from "dotenv";
import isDev from "electron-is-dev";

dotenv.config();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  ipcMain.on("notification", (event, args) => {
    const myNotification = new Notification(args);
    myNotification.show();
  });

  mainWindow.loadURL(
    isDev ? process.env.EXC_RENDERER_FE_DEV! : process.env.EXC_RENDERER_FE_PROD!
  );
}

(async () => {
  await app.whenReady();
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})();

app.on("window-all-closed", function () {
  app.quit();
});
