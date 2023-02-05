const { app, BrowserWindow, ipcMain, MessageChannelMain, dialog } = require('electron');
const path = require('path');
const KeyboardDto = require('./dto/keyboardDto.js');
const { startInterview, stopInterview, addThought } = require('./service/interviewService.js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
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