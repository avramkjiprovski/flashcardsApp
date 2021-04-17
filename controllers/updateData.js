let fs = require('fs')
let readData = require('../controllers/readData')

module.exports = (filepath, data) => {
    {
        fs.writeFile(filepath, JSON.stringify(data), err => {
            if (err) {
              console.error(err)
              return
            }
            console.log("updateData:", data)
        })
    }
}