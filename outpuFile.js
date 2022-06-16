function getoutputFileName() {
    const args = process.argv.slice(2);
    const inputIndex = args.indexOf('--out');
    //the output file next is what ever argument come after --out
    let fileName = args[inputIndex+1].toString();
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