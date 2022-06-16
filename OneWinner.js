
async function OneWinner(winners, allTotal, outputFileName) {
  //if second going forward didn't win then the winner is the first player
  if (winners.length == 0) {
    winners.push(allTotal[0]);
  }

  if (winners.length == 1) {
    console.log(winners.toString());
    output.createOutputFile(outputFileName, winners.toString());
  }
}
exports.OneWinner = OneWinner;
