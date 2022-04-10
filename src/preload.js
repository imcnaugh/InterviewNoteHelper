const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.send('request-keyboard-channel')
ipcRenderer.once('recive-keyboard-channel', (event) => {
    const [port] = event.ports;
    port.onmessage = (e) => {
        const lastButtonSpan = document.getElementById('lastButtonPressed');
        switch(e.data){
            case -1:
                lastButtonSpan.innerText = "connected"
                break;
            case -2:
                lastButtonSpan.innerText = "disconnected"
                break;
            default:
                lastButtonSpan.innerText = e.data
        }
    }
})

contextBridge.exposeInMainWorld('electronAPI', {
})