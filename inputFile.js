function getInputFileName() {
  const args = process.argv.slice(2);
  let fileName = args[1].toString();
  return fileName;

}

module.exports = {
  getInputFileName
};