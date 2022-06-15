function getoutputFileName() {
    const args = process.argv.slice(2);
    let fileName = args[3].toString();
    return fileName;

}

function createOutputFile(fileName, content) {
    let fs = require('fs');
    // writeFile function with filename, content and callback function
    fs.writeFile(fileName, content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}

module.exports = {
    getoutputFileName,
    createOutputFile
};