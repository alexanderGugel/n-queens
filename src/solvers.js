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

  var search = function(currentColumn){
    displayBoard(board.rows());
    for(var i = 0; i < n; i++){
      displayBoard(board.rows());
      board.attributes[i][currentColumn] = 1;
      displayBoard(board.rows());
      if (!board.hasAnyRooksConflicts()) {
        if (currentColumn === (n-1)) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
          solution = board.rows();
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
      displayBoard(board.rows());
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
    displayBoard(board.rows());
    for(var i = 0; i < n; i++){
      displayBoard(board.rows());
      board.attributes[i][currentColumn] = 1;
      displayBoard(board.rows());
      if (!board.hasAnyRooksConflicts()) {
        if (currentColumn === (n-1)) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
          solutionCount += 1;
        } else {
          search(currentColumn+1);
        }
      }
      board.attributes[i][currentColumn] = 0;
      displayBoard(board.rows());
    }
  };

  search(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
