validate = require("./validators/parameterValidator");
inputFile = require("./inputFile");
outputFile = require("./outpuFile");
createFile = require("./createFile");
const fs = require('fs');
const readline = require('readline');

async function processLineByLine(inputFileName, outputFileName) {
  const fileStream = fs.createReadStream(inputFileName);


  var J = 11, Q = 12, K = 13, A = 1;
  var S = 4, H = 3,D = 2, C = 1;

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  var max = 0;
  const allTotal = []
  const allCards = []
  for await (const line of rl) {
    var counter = 0;
    var all = line.split(":"); 
    var cards = all[1].split(",");
    allCards.push(cards);
    for(const card of cards){
        var cardValue = card[0];
        
        //console.log(cardValue);
        if (!isNaN(cardValue)) {
            //it's a number
            
            counter = counter + parseInt(cardValue);
            
        }else{
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
    allTotal.push(all[0] + ':' + counter)
    
    
  }
  console.log('totals: ' + allTotal)

  //loop array and get the biggest
  var highest = 0;
  const winners = [];
  const winnerRows = [];
  var isFirst = true;
  for(let i=0;i<allTotal.length;i++){
    var current = parseInt(allTotal[i].split(':')[1]);

    if(current >= highest){
        
        if(!isFirst){

            //remove previous lower ones
            if(current !== highest){
                winners.pop()
                winnerRows.pop();
            }
            
            
            winners.push(allTotal[i])
            winnerRows.push(i);

            
        }
        highest = current;
        isFirst = false; 

    }
        
  }

    //if second going forward didn't win then the winner is the first player
    if(winners.length == 0){
        winners.push(allTotal[o])
    }
    
    if(winners.length == 1)
    {
        console.log(winners.toString());
        createFile.createOutputFile(outputFileName, winners.toString());
    }

    if(winners.length > 1)
    {
        var names = [];
        for(let i=0;i<winners.length;i++){
            names.push(winners[i].split(':')[0])
        }
        console.log(names.toString() + ':' + winners[0].split(':')[1])
        var tieMax = 0;
        for (i = 0; i < winnerRows.length; i++) {
            var r = winnerRows[i];
            console.log('winning rows ' + r)

                var c =  allCards[r];//.split(',')[1];
                //console.log(c);
                var tieCount = 0
                for(var a in c)
                {
                    var val = c[a][1];

                    if(val == 0)
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
          createFile.createOutputFile(outputFileName, names.toString() + ':' + winners[0].split(':')[1]);
        
        
        
    }
    
}
var parameterValidation = validate.validateParameters();
if(parameterValidation.length === 0){
    var fileName = inputFile.getInputFileName();
    var outputFile = outputFile.getoutputFileName();
    processLineByLine(fileName, outputFile);
}else{
    console.log(parameterValidation);
}