const { app, BrowserWindow, session } = require('electron');
const path = require('node:path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Whale/3.23.232.17 Chrome/111.0.5563.147 Safari/537.36');

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('https://web-study.whaleon.naver.com/preview/eyJzdHVkeUNvZGUiOiJlMzAwYzNiMWU1YmY0Y2NjYTlhOTlhNmJkNDNlMDM5ZiIsInBhc3N3b3JkIjoiMTIzNDU2In0=');

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      event.preventDefault();
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
