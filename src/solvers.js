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
  var solution = []; //fixme
  var results = 0;
  if (n === 0 || n === 2 || n === 3) {
    var emptyBoard = new Board({n: n});
    return emptyBoard.rows();
  } 

  var newBoard = new Board({n: n});
  
  var recursiveQueens = function(board, rowNum) {
    var changeBoard = board;
    //base case 
    if (rowNum === 0) {
      //check collumn conficts 
      if (!changeBoard.hasAnyRooksConflicts() && !changeBoard.hasAnyMajorDiagonalConflicts() && !changeBoard.hasAnyMinorDiagonalConflicts()) {
      //if this is false then push the changeBoard into results array
        //debugger;
        // console.log('SOLUTION: ', changeBoard.rows());
        solution.push(changeBoard.rows());
        //return board;
      }
      return;
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
        //set the changeBoard based on row # === n
        // console.log('rowNumber: ', rowNum, 'full set ', setRow);
        changeBoard.set(rowNum - 1, setRow);
        // console.log('changeBoard ', changeBoard);
        
        //call recursive function --- decrement the row number passing in the current changeBoard that we changed
        recursiveQueens(changeBoard, rowNum - 1);
      }
    }
    //return;
  };
  recursiveQueens(newBoard, n);

  // console.log('hello')
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var results = 0;
  if (n === 0) {
    return ++results;
  } 
  //iterate through n number
  //for (var i = 0; i < n; i++) {
    //create a new board every iteration
  var newBoard = new Board({n: n});
    //create recursive funciton takes parameters of current Board and row number
  var recursiveQueens = function(board, rowNum) {
    var changeBoard = board;
    //base case 
    if (rowNum === 0) {
      //check collumn conficts 
      if (!changeBoard.hasAnyRooksConflicts() && !changeBoard.hasAnyMajorDiagonalConflicts() && !changeBoard.hasAnyMinorDiagonalConflicts()) {
      //if this is false then push the changeBoard into results array
        //debugger;
        results ++;
      }
      return;
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
        //set the changeBoard based on row # === n
        changeBoard.set(rowNum - 1, setRow);
        //call recursive function --- decrement the row number passing in the current changeBoard that we changed
        recursiveQueens(changeBoard, rowNum - 1);
      }
    }
    //return;
  };
  recursiveQueens(newBoard, n);
  //}     
  //var solutionCount = results;
  console.log('Number of solutions for ' + n + ' queens:', results);
  return results;
};







