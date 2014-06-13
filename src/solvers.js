/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({ n : n });

  var rowOccupied = [];
  for (var row = 0; row < n; row++) {
    rowOccupied[row] = 0;
  }

  var search = function(currentColumn){
    for(var i = 0; i < n; i++){
      board.attributes[i][currentColumn] = 1;
      rowOccupied[i]++;
      if (rowOccupied[i] === 1) {
        if (currentColumn === (n-1)) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
          solution = board.rows();
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
      rowOccupied[i]--;
    }
  };

  search(0);

  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({ n : n });

  var search = function(currentColumn){
    for(var i = 0; i < n; i++){
      board.attributes[i][currentColumn] = 1;
      if (!board.hasAnyRooksConflicts()) {
        if (currentColumn === (n-1)) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
          solutionCount += 1;
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
    }
  };

  search(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.totalTime = 0;
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var startTime = new Date().getTime();
  var board = new Board({ n : n });

  var rowsOccupied = [];
  var majorOccupied = [];
  var minorOccupied = [];

  var search = function(currentColumn){
    for(var i = 0; i < n; i++){
      board.attributes[i][currentColumn] = 1;

      if (rowsOccupied[i] === undefined) {
        rowsOccupied[i] = 0;
      }
      rowsOccupied[i]++;

      var topMajorColIndex = currentColumn - i;
      var topMinorColIndex = currentColumn + i;
      if (majorOccupied[topMajorColIndex] === undefined) {
        majorOccupied[topMajorColIndex] = 0;
      }
      majorOccupied[topMajorColIndex]++;

      if (minorOccupied[topMinorColIndex] === undefined) {
        minorOccupied[topMinorColIndex] = 0;
      }
      minorOccupied[topMinorColIndex]++;

      if (rowsOccupied[i] === 1 && majorOccupied[topMajorColIndex] === 1 && minorOccupied[topMinorColIndex] === 1) {
        if (currentColumn === (n-1)) {
          solution = board.rows();
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
      rowsOccupied[i]--;
      majorOccupied[topMajorColIndex]--;
      minorOccupied[topMinorColIndex]--;
    }
  };

  search(0);
  var stopTime = new Date().getTime();
  window.totalTime += stopTime - startTime;
  console.log('totalTime: ' + window.totalTime);

  if (solution === undefined) {
    solution = new Board({ n: n }).rows();
  }

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solution;
};

window.totalTime = 0;
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var startTime = new Date().getTime();

  var solutionCount = 0;
  var board = new Board({ n : n });

  var rowsOccupied = [];
  var majorOccupied = [];
  var minorOccupied = [];

  var search = function(currentColumn){
    for(var i = 0; i < n; i++){
      board.attributes[i][currentColumn] = 1;

      if (rowsOccupied[i] === undefined) {
        rowsOccupied[i] = 0;
      }
      rowsOccupied[i]++;

      var topMajorColIndex = currentColumn - i;
      var topMinorColIndex = currentColumn + i;
      if (majorOccupied[topMajorColIndex] === undefined) {
        majorOccupied[topMajorColIndex] = 0;
      }
      majorOccupied[topMajorColIndex]++;

      if (minorOccupied[topMinorColIndex] === undefined) {
        minorOccupied[topMinorColIndex] = 0;
      }
      minorOccupied[topMinorColIndex]++;

      if (rowsOccupied[i] === 1 && majorOccupied[topMajorColIndex] === 1 && minorOccupied[topMinorColIndex] === 1) {
        if (currentColumn === (n-1)) {
          solutionCount += 1;
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
      rowsOccupied[i]--;
      majorOccupied[topMajorColIndex]--;
      minorOccupied[topMinorColIndex]--;
    }
  };

  search(0);
  var stopTime = new Date().getTime();
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensSolutionsBitShifting = function(n) {
  var all, count;

  var tryFunc = function (ld, cols, rd) {
    if (cols === all) {
      count++;
      return;
    }

    var poss = ~(ld | cols | rd) & all;

    while (poss) {
      var bit = poss & -poss;
      poss = poss - bit; // poss -:= bit ???? Does this work?
      tryFunc((ld | bit) << 1, cols | bit, (rd | bit) >> 1);
    }
  };

  all = 1;

  for (var i = 1; i < n; i++) {
    all = 2*all + 1;
  }

  count = 0;
  tryFunc(0, 0, 0);
  console.log("There are " + count + " solutions to " + n + "-queens problem");

  return count;
};



