// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
      //   console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
      //   console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
      //   console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      return this.hasAnyColConflicts() || this.hasAnyRowConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex, colIndex) ||
        this.hasColConflictAt(rowIndex, colIndex) ||
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
      var numberOfPieces = 0;
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        numberOfPieces += this.get(rowIndex)[i];
        if (numberOfPieces > 1) {
          return true;
        }
      }
      return false;
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return _.any(_.range(this.get('n')), function (rowIndex) {
        return this.hasRowConflictAt(rowIndex);
      }.bind(this));
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var numberOfPieces = 0;
      for (var i = 0; i < this.get('n'); i++) {
        numberOfPieces += this.get(i)[colIndex];
        if (numberOfPieces > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return _.any(_.range(this.get('n')), function (colIndex) {
        return this.hasColConflictAt(colIndex);
      }.bind(this));
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var row;
      var column;
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        row = majorDiagonalColumnIndexAtFirstRow*(-1);
        column = 0;
      } else {
        row = 0;
        column = majorDiagonalColumnIndexAtFirstRow;
      }
      var numberOfPieces = 0;
      while (row < this.get('n') && column < this.get('n')) {
        numberOfPieces += this.get(row)[column];
        if (numberOfPieces > 1) {
          return true;
        }
        row++;
        column++;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return _.any(_.range(-this.get('n'), this.get('n')), function (colIndex) {
        return this.hasMajorDiagonalConflictAt(colIndex);
      }.bind(this));
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var row;
      var column;
      if (minorDiagonalColumnIndexAtFirstRow > this.get('n')-1) {
        row = minorDiagonalColumnIndexAtFirstRow-(this.get('n')-1);
        column = this.get('n') - 1;
      } else {
        row = 0;
        column = minorDiagonalColumnIndexAtFirstRow;
      }
      var numberOfPieces = 0;
      while (row < this.get('n') && column > -1) {
        numberOfPieces += this.get(row)[column];
        if (numberOfPieces > 1) {
          return true;
        }
        row++;
        column--;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return _.any(_.range(this.get('n')*2), function (colIndex) {
        return this.hasMinorDiagonalConflictAt(colIndex);
      }.bind(this));
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
