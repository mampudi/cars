
async function OneWinner(winners, allTotal, outputFileName) {

  if (winners.length == 1) {
    output.createOutputFile(outputFileName, winners.toString());
  }
}
exports.OneWinner = OneWinner;
