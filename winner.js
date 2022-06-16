const {
  GetBiggestCardCount
} = require("./GetBiggestCardCount");
const {
  OneWinner
} = require("./OneWinner");
const {
  TieBreaker
} = require("./TieBreaker");

validate = require("./validators/parameterValidator");
inputFile = require("./inputFile");
output = require("./outpuFile");
cardCounter = require("./cardCounter")

//initialise special cards and suits
const J = 11,
  Q = 12,
  K = 13,
  A = 1;
const S = 4,
  H = 3,
  D = 2,
  C = 1;

//initialise variables 
let allTotal = [],
  allCards = []

async function ProcessFile(inputFileName, outputFileName) {
  //validate and get player totals
  let cardvalidation = await cardCounter.GetAllCardTotals(allCards, J, A, Q, K, allTotal, inputFileName);

  if (cardvalidation.length == 0) {
    //loop array and get the biggest
    let {
      winners,
      winnerRows
    } = await GetBiggestCardCount(allTotal);

    //only do this if the is one winner
    if (winners.length > 1) {
      await OneWinner(winners, outputFileName);
    }

    //only do this for a tire breaker and calculate using suites
    if (winners.length > 1) {
      await TieBreaker(winners, winnerRows, allCards, S, H, D, C, outputFileName);
    }
  } else {
    //save error to file
    output.createOutputFile(outputFileName, cardvalidation)
    console.log(cardvalidation);
  }

}


//validate parameters
let parameterValidation = validate.validateParameters();
if (parameterValidation.length === 0) {
  let fileName = inputFile.getInputFileName();
  let outputFile = output.getoutputFileName();
  ProcessFile(fileName, outputFile);
} else {
  //create err.txt if the parameter where not correct
  const daytime = new Date();
  output.createOutputFile('err.txt', daytime + ' -  ' + parameterValidation)
  console.log(parameterValidation);
}