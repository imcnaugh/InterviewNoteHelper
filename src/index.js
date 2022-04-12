const { app, BrowserWindow, ipcMain, MessageChannelMain, dialog } = require('electron');
const fs = require('fs')
const path = require('path');
const KeyboardDto = require('./keyboardDto.js');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  ipcMain.on('request-keyboard-channel', (event) => {
    const {port1, port2} = new MessageChannelMain();
    new KeyboardDto(port1);
    event.senderFrame.postMessage('recive-keyboard-channel', null, [port2] );
  });
  ipcMain.on('save-notes', saveNotes);

  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

async function saveNotes(_, data) {
  const fileName = new Date().toLocaleDateString().replaceAll('/', '-')+'_'+data.name.replaceAll(' ','_')+'.md';
  let fileContents = `# ${data.name}\n${new Date().toLocaleDateString()}\n${data.position}\n${data.round}\n\n`
  data.notes.forEach(note => {
    fileContents += `${note.value}\t${note.time}\t${note.note}\n`
  })

  const file = await dialog.showSaveDialog({
    title: 'Save Notes',
    defaultPath: fileName
  })
  console.log(file)
  if(file) {
    fs.writeFile(file.filePath, fileContents, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }
  )}
}