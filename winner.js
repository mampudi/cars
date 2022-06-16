//initialise special cards and suits
const J = 11,
  Q = 12,
  K = 13,
  A = 1;
const S = 4,
  H = 3,
  D = 2,
  C = 1;



async function ProcessFile(inputFileName, outputFileName) {
  //initialise variables 
  let allTotal = [],
  allCards = []
  //validate and get player totals
  let cardvalidation = await GetAllCardTotals(allCards, J, A, Q, K, allTotal, inputFileName);
  
  if (cardvalidation.length == 0) {
    //loop array and get the biggest
    
    let {
      winners,
      winnerRows
    } = await GetBiggestCardCount(allTotal);
    
    //only do this if the is one winner
    if (winners.length === 1) {
      await OneWinner(winners, outputFileName);
    }

    //only do this for a tire breaker and calculate using suites
    if (winners.length > 1) {
      
      await TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName);
    }
  } else {
    //save error to file
    createOutputFile(outputFileName, cardvalidation)
    console.log(cardvalidation);
  }

}

function validateParameters() {

  const args = process.argv.slice(2);

  if (args.length !== 4) {
    return 'Please supply the correct parameters';
  }

  if (!args.includes('--in')) {
    return 'Parameter --in is required'
  }

  if (!args.includes('--out')) {
    return 'Parameter --out is required';
  }

  return ''

}

function getInputFileName() {
  const args = process.argv.slice(2);

  const inputIndex = args.indexOf('--in');
  //the file next is what ever argument come after --in
  let fileName = args[inputIndex + 1].toString();
  console.log(fileName)
  return fileName;

}

function getoutputFileName() {
  const args = process.argv.slice(2);
  const inputIndex = args.indexOf('--out');
  //the output file next is what ever argument come after --out
  let fileName = args[inputIndex + 1].toString();
  return fileName;

}

function createOutputFile(fileName, content) {
  let fs = require('fs');
  // writeFile function with filename, content and callback function
  fs.writeFile(fileName, content, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}

async function GetAllCardTotals(allCards, J, A, Q, K, allTotal, inputFileName) {
  const fs = require('fs');
  const fileStream = fs.createReadStream(inputFileName);
  const readline = require('readline');
  let validation = '';
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  //foreach line in file
  for await (const line of rl) {
    let counter = 0;

    if (line.length == 0) {
      validation = 'ERROR'
      return validation;
    }

    let all = line.split(":");

    //make sure the format is name and cards
    if (all.length !== 2) {
      validation = 'ERROR'
      return validation;
    }

    let cards = all[1].split(',');

    let numberOfCards = 0;
    allCards.push(cards)
    for (const card of cards) {

      let cardValue = card[0];

      //player has too many cards
      numberOfCards++;
      if(numberOfCards > 5)
      {
        validation = 'Player has too many cards';
        return validation;
      }

      

      //make sure the card number can't be more that 11
      if (card.length > 2) {
        if (card.slice(0, 2) !== '10') {
          validation = 'ERROR';
          return validation;
        }
        cardValue = '10';
      }


      if (!isNaN(cardValue)) {
        //it's a number
        //return validation if the card is illegal

        counter = counter + parseInt(cardValue);

      } else {
        //make sure it is only valid cards
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
          default:
            return 'ERROR';
        }
      }

    }
    allTotal.push(all[0] + ':' + counter);
  }

  //there has to be 5 players
  if (allTotal.length !== 5) {
    validation = 'ERROR';
  }
  return validation;
}

async function GetBiggestCardCount(allTotal) {
  let highest = 0;
  let winners = [];
  let winnerRows = [];
  let isFirst = true;

  //get players with the highest card count and return
  for (let i = 0; i < allTotal.length; i++) {
    let current = parseInt(allTotal[i].split(':')[1]);

    if (current >= highest) {

      if (!isFirst) {

        //remove previous lower ones
        if (current !== highest) {
          console.log('kgang')
          winners = [];
          winnerRows = [];
        }

        winners.push(allTotal[i]);
        winnerRows.push(i);


      } else {
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

async function OneWinner(winners, outputFileName) {

  if (winners.length == 1) {
    createOutputFile(outputFileName, winners.toString());
  }
}

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
    
    createOutputFile(outputFileName, finalwinners.toString() + ':' + winners[0].split(':')[1]);
  }
}

//validate parameters
let parameterValidation = validateParameters();
if (parameterValidation.length === 0) {
  let fileName = getInputFileName();
  let outputFile = getoutputFileName();
  ProcessFile(fileName, outputFile);
} else {
  //create err.txt if the parameter where not correct
  const daytime = new Date();
  createOutputFile('err.txt', daytime + ' -  ' + parameterValidation)
  console.log(parameterValidation);
}