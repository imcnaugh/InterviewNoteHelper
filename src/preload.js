const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.send('request-keyboard-channel')
ipcRenderer.once('recive-keyboard-channel', (event) => {
    const [port] = event.ports;
    port.onmessage = (e) => {
        switch(e.data){
            case -1:
                setKeyboardConnected(true)
                break;
            case -2:
                setKeyboardConnected(false)
                break;
            default:
                log(e.data)
        }
    }
})

function setKeyboardConnected(isConnected){
    const isKeyboardConnectedIcon = document.getElementById('isKeyboardConnectedIcon');
    isKeyboardConnectedIcon.className = isConnected ? "keyboardConnected" : "keyboardDisconnected"
}

function log(value){
    const textArea = document.getElementById('textarea');
    const timerDisplay = document.getElementById('timerDisplay')
    const logTable = document.getElementById('interviewTable')

    const note = textArea.value
    const time = timerDisplay.innerText

    textArea.value = ''

    // add a new row to the table
    const row = document.createElement('tr')
    const valueCell = document.createElement('td')
    const timeCell = document.createElement('td')
    const noteCell = document.createElement('td')
    valueCell.innerText = value
    timeCell.innerText = time
    noteCell.innerText = note
    row.appendChild(valueCell)  
    row.appendChild(timeCell)
    row.appendChild(noteCell) 
    logTable.appendChild(row)

    ipcRenderer.send('save-notes', {value, time, note})
}
contextBridge.exposeInMainWorld('electronAPI', {
    logNote: (value) => log(value),
    startInterview: (name, position, round) => ipcRenderer.send('start-interview', {
        name: name,
        position: position,
        round: round
    }),
    stopInterview: () => ipcRenderer.send('stop-interview'),
})