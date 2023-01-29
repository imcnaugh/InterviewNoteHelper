const fs = require('fs')

module.exports = class FileDto {

    constructor(pathToFile) {
        this.pathToFile = pathToFile
    }

    async write(data) {
        const file = await this.#getFile()
        await file.write(data)
    }

    async #getFile() {
        return await fs.promises.open(this.pathToFile, 'a')
    }
}