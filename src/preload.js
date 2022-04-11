const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.send('request-keyboard-channel')
ipcRenderer.once('recive-keyboard-channel', (event) => {
    const [port] = event.ports;
    port.onmessage = (e) => {
        const isKeyboardConnected = document.getElementById('isKeyboardConnected');
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
    const isKeyboardConnectedText = document.getElementById('isKeyboardConnectedText');
    const isKeyboardConnectedIcon = document.getElementById('isKeyboardConnectedIcon');
    if(isConnected){
        isKeyboardConnectedText.innerText = "connected"
        isKeyboardConnectedIcon.className = "keyboardConnected"
    }
    else{
        isKeyboardConnectedText.innerText = "disconnected"
        isKeyboardConnectedIcon.className = "keyboardDisconnected"
    }
}

function log(value){
    const textArea = document.getElementById('textarea');
    const note = textArea.value
    textArea.value = ''

    console.log(value + ' ' + note)
}

contextBridge.exposeInMainWorld('electronAPI', {
    logNote: (value) => log(value)
})