let fs = require('fs')

module.exports = function readData(filePath, cb){
    var str = '';
    fs.readFile(filePath, 'utf8', function(err, data){
      if(err) throw err;
      cb(data);
    });
  }