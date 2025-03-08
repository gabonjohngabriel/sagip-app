const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Allows Node.js modules
    },
  });

  // Load your React/Vue/HTML app
  mainWindow.loadURL("http://localhost:3000/");
  // mainWindow.loadURL("http://localhost:3000"); // If running React/Vue in dev mode

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
