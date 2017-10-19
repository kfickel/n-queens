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
  var possibleArr = [];
  var solution = [];
  //iterate through the rows of the table
  for (var i = 0; i < n; i++) {
    //iterate through the values in the row
    for (var j = 0; j < n; j++) {
      //if(i index value is equal to the j index value)
      if (i === j) {
        possibleArr.push(1);
      } else {
        possibleArr.push(0);
      }
        //push up possible array[1]
      //else push up zero
    }
    solution.push(possibleArr);
    possibleArr = [];
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; 
  //fibonacci sequence the n;
  for (var i = n; i > 0; i--) {
    solutionCount = solutionCount * i;
  }
  //create a test and if this test passes both the col and row conflicts
  
    //increase solutionCount;

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
  var results = [];
  if (n === 0) {
    results.push(1);
  } 
  //iterate through n number
  for (var i = 0; i < n; i++) {
    //create a new board every iteration
    var newBoard = new Board({n: n});
    console.log('board ', n);
      //create recursive funciton takes parameters of current Board and row number
    var recursiveQueens = function(board, rowNum) {
      //base case 
      if (rowNum === 0) {
        //check collumn conficts 
        if (!board.hasAnyRooksConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
        //if this is false then push the board into results array
          results.push(board);
        }
      } else {
        //for loop iterates based on "n"
        for (var b = 0; b < n; b++) {
          //var for setRow
          var setRow = [];
          // for loop iterates to create new array 
          for (var k = 0; k < n; k++) {
            //if i === j then push '1' into new array
            if (b === k) {
              setRow.push(1);
            //else push '0';
            } else {
              setRow.push(0);
            }
          }
          //set the board based on row # === n
          board.set(rowNum - 1, setRow);
          //call recursive function --- decrement the row number passing in the current board that we changed
          recursiveQueens(board, rowNum - 1);
        }
      }
    };
    recursiveQueens(newBoard, n);
  }     
  var solutionCount = results.length;
  console.log('results', results);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};







