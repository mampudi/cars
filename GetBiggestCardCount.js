
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
exports.GetBiggestCardCount = GetBiggestCardCount;
