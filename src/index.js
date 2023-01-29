const { app, BrowserWindow, ipcMain, MessageChannelMain, dialog } = require('electron');
const path = require('path');
const { prettyPrint } = require('md_table_prettyprint');
const KeyboardDto = require('./dto/keyboardDto.js');
const FileDto = require('./dto/fileDto.js');


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
    event.senderFrame.postMessage('recive-keyboard-channel', null, [port2] );
  });
  ipcMain.on('save-notes', saveNotes);

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

async function saveNotes(_, data) {
  const fileName = new Date().toLocaleDateString().replaceAll('/', '-')+'_'+data.name.replaceAll(' ','_')+'.md';
  let header = `# ${data.name}\n${new Date().toLocaleDateString()}\n${data.position}\n${data.round}\n\n`;
  let fileContents = header

  let tableRows = data.notes.map(n => {
    return `${n.value} | ${n.time} | ${n.note}`
  }).join('\n');
  let tableHeader = 'Key | Time | Note\n';
  let prettyTable = prettyPrint(tableHeader + tableRows);

  fileContents += prettyTable;

  const file = await dialog.showSaveDialog({
    title: 'Save Notes',
    defaultPath: fileName
  })

  if(file) {
    let fileDto = new FileDto(file.filePath);
    await fileDto.write(fileContents);
  }
}