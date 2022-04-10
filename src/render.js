// function idk(event){
//     console.log("here")
//     console.log(event)
//     const [port] = event.ports
//     port.onmessage = (e) => {
//         switch(e){
//             case -1:
//                 console.log("connected")
//                 break;
//             case -2:
//                 console.log("disconnected")
//                 break;
//             default:
//                 console.log(e.data)
//         }
//     }
// }

// const portsSpan = document.getElementById('ports');
// const getPortsButton = document.getElementById('getPortsButton');
// getPortsButton.addEventListener('click', async () => {
//     const ports = await window.electronAPI.getSerialPorts()
//     portsSpan.innerText = JSON.stringify(ports);
//     console.log(ports)
// });

// const portPathInput = document.getElementById('portPathBox');
// const connectToPortButton = document.getElementById('connectToPortBut');
// connectToPortButton.addEventListener('click', async () => {
//     const path = portPathInput.value;
//     window.electronAPI.connect(path);
// })

const lastButtonSpan = document.getElementById('lastButtonPressed');
// window.electronAPI.handleIncomingData((event, value) => {
//     lastButtonSpan.innerText = value;
// })