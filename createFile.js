function createOutputFile(fileName, content) {

    let fs = require('fs');
 
    // writeFile function with filename, content and callback function
    fs.writeFile(fileName, content, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
    });
    
    }

    module.exports = {
        createOutputFile
      };