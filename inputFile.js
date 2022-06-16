function getInputFileName() {
  const args = process.argv.slice(2);

  const inputIndex = args.indexOf('--in');
  //the file next is what ever argument come after --in
  let fileName = args[inputIndex+1].toString();
  console.log(fileName)
  return fileName;

}

module.exports = {
  getInputFileName
};