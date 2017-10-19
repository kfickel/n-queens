// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var conflicts = 0;
      //iterate through the given row
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          conflicts++; 
        }
        if (conflicts >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var table = this.rows();

      for (var i = 0; i < table.length; i++) {
        var conflicts = this.hasRowConflictAt(i);
        if (conflicts) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //variable table equals access the whole table with rows()
      var table = this.rows();
      //variable for conflicts
      var conflicts = 0;
      //iterate through the rows
      for (var i = 0; i < table.length; i++) {
        // for (var j = 0; j < table[i].length; j++) {
        if (table[i][colIndex] === 1) {
          //if any of the numbers are adding to conflicts to every one
          conflicts++;
        }
          //if conflicts is greater than or equal to two
        if (conflicts >= 2) {
          return true;
        }
        // }
      }
          //return true
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //variable for table with rows()
      var table = this.rows();
      //iterate through the columns
      for (var i = 0; i < table.length; i++) {
        //create conflict variable equal to result of hascolconflictAt
        var conflict = this.hasColConflictAt(i);
        //check if conflict var is true
        if (conflict) {
          //return true;
          return true;
        }
      }
      //return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
  
      console.log('START OF TESTTTT');
      //variable conflicts
      var conflicts = 0;
      //varaiable table for all arrays
      var table = this.rows();
      //variable for column index
      var column = majorDiagonalColumnIndexAtFirstRow;
      //iterate through the rows
      for (var i = 0; i < table.length; i++) {
        console.log( 'value: ', table[i][column], 'i ', i, 'columnIndex (MDIC) ', majorDiagonalColumnIndexAtFirstRow, 'tableLength', table.length, 'conflicts: ', conflicts); //if starting at the MDCIF equal to one
        if (table[i][column] === 1) {
          //add to conflict
          conflicts++;
        }
        //MDCIF increment one
        column++;
      }
      //if conflict is greater than or equal to  2
      if (conflicts >= 2) {
        //return true
        console.log('TRUE');
        return true;
      }
      console.log('FALSE');
      //return false
      return false; // fixme

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var conflicts = false;
      var table = this.rows();
      
      for (var i = -(table.length); i < table.length; i++) {
        conflicts = this.hasMajorDiagonalConflictAt(i);
        if (conflicts) {
          return true;
        }
      }
      
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      console.log('START OF TESTTTT');
      //variable conflicts
      var conflicts = 0;
      //varaiable table for all arrays
      var table = this.rows();
      //variable for column index
      var column = minorDiagonalColumnIndexAtFirstRow;
      //iterate through the rows
      for (var i = 0; i < table.length; i++) {
        console.log( 'value: ', table[i][column], 'i ', i, 'columnIndex (MDIC) ', minorDiagonalColumnIndexAtFirstRow, 'tableLength', table.length, 'conflicts: ', conflicts); //if starting at the MDCIF equal to one
        if (table[i][column] === 1) {
          //add to conflict
          conflicts++;
        }
        //MDCIF increment one
        column--;
      }
      //if conflict is greater than or equal to  2
      if (conflicts >= 2) {
        //return true
        console.log('TRUE');
        return true;
      }
      console.log('FALSE');
      //return false
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var conflicts = false;
      var table = this.rows();
      
      for (var i = -(table.length); i < table.length; i++) {
        conflicts = this.hasMinorDiagonalConflictAt(i);
        if (conflicts) {
          return true;
        }
      }
      
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
