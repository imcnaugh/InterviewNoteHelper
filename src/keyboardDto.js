const SerialPort = require('serialport')

module.exports = class KeyboardDto {
  
  #vendorId = '2341'
  #productId = '8037'  
  #port = null
  #intervalId = null
  #messagePort

  connected = false;

  constructor(messagePort) {
    this.#messagePort = messagePort
    if(!this.connected){
      this.#intervalId = setInterval(() => this.#tryToConnect(), 1000)
    }
  }

  async #tryToConnect(){
    console.log('trying to connect')
    const ports = await this.#getPorts()
    console.log(JSON.stringify(ports))
    const portPath = ports.find(p => {
      return p.vendorId && p.productId && p.vendorId === this.#vendorId && p.productId === this.#productId
    })

    if(!portPath){
      console.log('cant find the correct port')
      return
    }
    
    this.#port = new SerialPort(portPath.path, {
      baudRate: 9600
      }, (err) => {
        if (err) {
          console.log('error message ' + err)
        } else{
          this.connected = true;
          console.log('connected')
          clearInterval(this.#intervalId)
        }
    })

    this.#port.on('close', () => {
      console.log('port closed')
      this.#messagePort.postMessage(-2)
      this.connected = false;
      this.#intervalId = setInterval(() => this.#tryToConnect(), 500)
    })

    this.#port.on('data', (data) => {
      this.#messagePort.postMessage(data)
    })

    this.#messagePort.postMessage(-1)
  }

  async #getPorts() {
    return SerialPort.list()
  }
}

