// electron App의 진입점
import { app, BrowserWindow } from "electron";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

(async () => {
  await app.whenReady();
  createWindow();
  console.log("안녕하신가요!");
  setInterval(() => {
    console.log(Math.random());
  }, 1000);
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})();

app.on("window-all-closed", function () {
  app.quit();
});
