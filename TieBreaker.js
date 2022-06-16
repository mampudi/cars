
async function TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName) {
  if (winners.length > 1) {
    let names = [];
    for (let i = 0; i < winners.length; i++) {
      names.push(winners[i].split(':')[0]);
    }
    console.log(names.toString() + ':' + winners[0].split(':')[1]);
    let tieMax = 0;
    for (i = 0; i < winnerRows.length; i++) {
      let r = winnerRows[i];
      console.log('winning rows ' + r);

      let c = allCards[r]; //.split(',')[1];


      //console.log(c);
      let tieCount = 0;
      for (let a in c) {
        let val = c[a][1];

        if (val == 0)
          val = c[a][2];

        console.log(val);

        switch (val) {
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
      console.log('Suite score total ' + tieCount);

      //console.log('row cards ' + c.toString().split(',')[1])
    }
    output.createOutputFile(outputFileName, names.toString() + ':' + winners[0].split(':')[1]);



  }
}
exports.TieBreaker = TieBreaker;
