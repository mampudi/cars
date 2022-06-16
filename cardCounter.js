const fs = require('fs');
const readline = require('readline');

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

  module.exports = {
    GetAllCardTotals
  };