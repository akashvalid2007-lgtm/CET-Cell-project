// AgriPulse™ Standalone Desktop Main Process (Electron)
// 100% Offline & Airplane-Mode Operational
// Directly loads local files from disk (file:// protocol)

const { app, BrowserWindow, session, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 880,
    minWidth: 960,
    minHeight: 650,
    title: "AgriPulse™ — Offline Agronomic Intelligence Suite",
    backgroundColor: "#08160f",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Enable Web Serial API for USB Arduino/ESP32 connections
  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission) => {
    if (permission === "serial") {
      return true;
    }
    return false;
  });

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === "serial") {
      return true;
    }
    return false;
  });

  // Automatically approve serial port selection prompt
  mainWindow.webContents.session.on("select-serial-port", (event, portList, webContents, callback) => {
    event.preventDefault();
    if (portList && portList.length > 0) {
      callback(portList[0].portId);
    } else {
      callback("");
    }
  });

  // Load the built offline distribution directly from the local filesystem
  const indexPath = path.join(__dirname, "../dist/index.html");
  mainWindow.loadFile(indexPath);

  // Remove default menu for sleek classic appearance
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
