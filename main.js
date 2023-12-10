// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { exec } = require("child_process");
const electronReload = require("electron-reload");

// Enable live reload for the main process
electronReload(__dirname);
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on("getFiles", (event, directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      event.sender.send("fileList", { error: err.message });
    } else {
      event.sender.send("fileList", { files });
    }
  });
});

ipcMain.on("get-title", (e, t) => {
  const webContent = e.sender;
  const win = BrowserWindow.fromWebContents(webContent);
  win.setTitle(t);
});

ipcMain.on("checkSecurity", (event, filePath) => {
  // securityChecker(filePath, (err, issues) => {
  //   if (err) {
  //     event.sender.send("securityResult", { error: err.message });
  //   } else {
  //     event.sender.send("securityResult", { issues });
  //   }
  // });
});
