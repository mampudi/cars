async function TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName) {
  //only do this if there is more than one winner
  if (winners.length > 1) {
    //get the names of the winners
    let names = [];
    for (let i = 0; i < winners.length; i++) {
      names.push(winners[i].split(':')[0]);
    }

    let highest = 0;
    let finalwinners = [];
    let isFirst = true;

    //calculate the total for the suite as the tie breaker
    for (i = 0; i < winnerRows.length; i++) {
      let winnerRow = winnerRows[i];
      let winnerCards = allCards[winnerRow];
      let tieCount = 0;

      for (let a in winnerCards) {
        let cardSuite = winnerCards[a][1];

        if (cardSuite == 0)
          cardSuite = winnerCards[a][2];

        switch (cardSuite) {
          case 'S':
            tieCount = tieCount + S;
            break;
          case 'H':
            tieCount = tieCount + H;
            break;
          case 'D':
            tieCount = tieCount + D;
            break;
          case 'C':
            tieCount = tieCount + C;
            break;
        }


      }

      if (tieCount >= highest) {
        if (!isFirst) {
          //remove previous lower ones
          if (tieCount !== highest) {
            finalwinners = [];

          }

          finalwinners.push(names[i]);
        } else {
          finalwinners.push(names[i]);
        }
        highest = tieCount;
        isFirst = false;
      }
    }
    output.createOutputFile(outputFileName, finalwinners.toString() + ':' + winners[0].split(':')[1]);
  }
}
exports.TieBreaker = TieBreaker;