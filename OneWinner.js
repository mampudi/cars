async function OneWinner(winners, outputFileName) {

  if (winners.length == 1) {
    output.createOutputFile(outputFileName, winners.toString());
  }
}
exports.OneWinner = OneWinner;