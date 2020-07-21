"use strict";
exports.__esModule = true;
// public/electron.ts
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var python_shell_1 = require("python-shell");
var fs = require("fs");
// electron-reloader를 작동시킨다.
// try {
//   require("electron-reloader")(module, {
//     watchRenderer: false,
//   });
// } catch (_) {}
// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
        //alwaysOnTop: true,
        center: true,
        //fullscreen: true,
        kiosk: !isDev,
        resizable: true,
        webPreferences: {
            // 2.
            // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
            // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
            // true 해야 합니다.
            nodeIntegration: true
        }
    });
    // 콘솔 로그를 찍을 수 없으니 (카메라 허용 모드로 실행 시) 여기로 릴레이 (open이라서..)
    electron_1.ipcMain.on("log", function (event, logs) {
        if (Array.isArray(logs))
            logs = logs.join(", ");
        fs.appendFileSync("dev/log.txt", logs, "utf8"); // 근데 권한 오류 뜸 ㅅㅂ
    });
    // 각종 emit event 리스너 등록
    electron_1.ipcMain.on("resize", function (event, _a) {
        var x = _a.x, y = _a.y;
        // console.log(event);
        mainWindow.setSize(x, y, true);
    });
    //
    electron_1.ipcMain.on("execPython", function (event, args) {
        python_shell_1.PythonShell.runString(args, undefined, function (error, output) {
            console.log("[JS] triggered");
            if (error)
                throw error;
            console.log("=>", output);
        });
    });
    // 3. and load the index.html of the app.
    if (isDev) {
        // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
        mainWindow.loadURL("http://localhost:3000");
        mainWindow.webContents.openDevTools();
    }
    else {
        // 프로덕션 환경에서는 =패키지 내부 리소스에 접근
        mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        mainWindow = undefined;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
