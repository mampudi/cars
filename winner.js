validate = require("./validators/parameterValidator");
inputFile = require("./inputFile");
output = require("./outpuFile");

const fs = require('fs');
const readline = require('readline');
const J = 11,
  Q = 12,
  K = 13,
  A = 1;
const S = 4,
  H = 3,
  D = 2,
  C = 1;
let allTotal = [],
  allCards = []

async function ProcessFile(inputFileName, outputFileName) {
  await GetAllCardTotals(allCards, J, A, Q, K, allTotal, inputFileName);
  //loop array and get the biggest
  let {
    winners,
    winnerRows
  } = await GetBiggestCardCount(allTotal);

  await OneWinner(winners, allTotal, outputFileName);

  await TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName);

}

let parameterValidation = validate.validateParameters();
if (parameterValidation.length === 0) {
  let fileName = inputFile.getInputFileName();
  let outputFile = output.getoutputFileName();
  ProcessFile(fileName, outputFile);
} else {
  console.log(parameterValidation);
}

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

async function GetBiggestCardCount(allTotal) {
  let highest = 0;
  let winners = [];
  let winnerRows = [];
  let isFirst = true;
  for (let i = 0; i < allTotal.length; i++) {
    let current = parseInt(allTotal[i].split(':')[1]);

    if (current >= highest) {

      if (!isFirst) {

        //remove previous lower ones
        if (current !== highest) {
          winners.pop();
          winnerRows.pop();
        }


        winners.push(allTotal[i]);
        winnerRows.push(i);


      }
      highest = current;
      isFirst = false;

    }

  }
  return {
    winners,
    winnerRows
  };
}

async function GetAllCardTotals(allCards, J, A, Q, K, allTotal, inputFileName) {
  const fileStream = fs.createReadStream(inputFileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    let counter = 0;
    let all = line.split(":");
    let cards = all[1].split(",");
    allCards.push(cards);
    for (const card of cards) {
      let cardValue = card[0];

      //console.log(cardValue);
      if (!isNaN(cardValue)) {
        //it's a number
        counter = counter + parseInt(cardValue);

      } else {
        switch (cardValue) {
          case 'J':
            counter = counter + J;
            break;
          case 'A':
            counter = counter + A;
            break;
          case 'Q':
            counter = counter + Q;
            break;
          case 'K':
            counter = counter + K;
            break;
        }
      }

    }
    allTotal.push(all[0] + ':' + counter);


  }
}