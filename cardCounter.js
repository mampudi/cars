const fs = require('fs');
const readline = require('readline');
let validation = '';

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

        if (line.length == 0) {
            validation = 'ERROR'
            return validation;
        }

        let all = line.split(":");

        if(all.length !== 2)
        {
            validation = 'ERROR'
            return validation;
        }

        let cards = all[1].split(',');
        allCards.push(cards);
        for (const card of cards) {
            
            let cardValue = card[0];

            if(card.length > 2)
            {
                if(card.slice(0, 2) !== '10'){
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
  
    if (allTotal.length !== 5) {
        validation = 'ERROR';
    }
    return validation;
}

module.exports = {
    GetAllCardTotals
};