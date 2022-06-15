

    function getoutputFileName() {

        const args = process.argv.slice(2);
        var fileName = args[3].toString();
        return fileName;
        
        }
        
    
    module.exports = {
        getoutputFileName
      };