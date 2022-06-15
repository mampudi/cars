function getInputFileName() {

    const args = process.argv.slice(2);
    var fileName = args[1].toString();
    return fileName;
    
    }
    
    module.exports = {
        getInputFileName
      };