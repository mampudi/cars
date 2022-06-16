
async function TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName) {
  if (winners.length > 1) {
    let names = [];
    for (let i = 0; i < winners.length; i++) {
      names.push(winners[i].split(':')[0]);
    }
    let tieMax = 0;
    let highest = 0;
    let finalwinners = [];
    let isFirst = true;

    for (i = 0; i < winnerRows.length; i++) {
      let winnerRow = winnerRows[i];
      console.log('winning rows ' + winnerRow);
      console.log('Current player ' + names[winnerRow]);
      

      let winnerCards = allCards[winnerRow]; 


      //console.log(c);
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

      if(tieCount >= highest){
        if (!isFirst) {
          //remove previous lower ones
          if (tieCount !== highest) {
            finalwinners.pop();

          }

          finalwinners.push(names[winnerRow]);
        }else{
          finalwinners.push(names[winnerRow]);
        }
        highest = tieCount;
        isFirst = false;
      }

      console.log('Suite score total ' + tieCount);

      //console.log('row cards ' + c.toString().split(',')[1])
    }
    output.createOutputFile(outputFileName, finalwinners.toString() + ':' + winners[0].split(':')[1]);



  }
}
exports.TieBreaker = TieBreaker;
