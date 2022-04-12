const { contextBridge, ipcRenderer } = require('electron');
const notes = []

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

    // create a dictionary of the data
    const dict = {
        0: '//',
        1: '??',
        2: '?',
        3: '?!',
        4: '!?',
        5: '!',
        6: '!!',
    }

    // add a new row to the table
    const row = document.createElement('tr')
    const valueCell = document.createElement('td')
    const timeCell = document.createElement('td')
    const noteCell = document.createElement('td')
    valueCell.innerText = dict[value]
    timeCell.innerText = time
    noteCell.innerText = note
    row.appendChild(valueCell)  
    row.appendChild(timeCell)
    row.appendChild(noteCell) 
    logTable.appendChild(row)

    // append data to the notes array
    notes.push({
        value: dict[value],
        time: time,
        note: note
    })
}

function saveNotes(name, position, round){
    const data = {
        name: name,
        position: position,
        round: round,
        notes: notes
    }
    ipcRenderer.send('save-notes', data)
}

contextBridge.exposeInMainWorld('electronAPI', {
    logNote: (value) => log(value),
    stopInterview: (name, position, round) => saveNotes(name, position, round),
})