const { app, BrowserWindow, ipcMain, MessageChannelMain } = require('electron');
const KeyboardDto = require('./dto/keyboardDto.js');
const { startInterview, stopInterview, addThought } = require('./service/interviewService.js');

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
  ipcMain.on('request-keyboard-channel', (event) => {
    const {port1, port2} = new MessageChannelMain();
    new KeyboardDto(port1);
    event.senderFrame.postMessage('receive-keyboard-channel', null, [port2] );
  });
  ipcMain.on('save-notes', addThought);
  ipcMain.on('start-interview', startInterview);
  ipcMain.on('stop-interview', stopInterview);

  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});