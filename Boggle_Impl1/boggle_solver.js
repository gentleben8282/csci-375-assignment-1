/*
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 * 
 * Programmer (Student ID): Ben Corriette (@02956064)
 * Last modified date: 10/09/2021
 * 
 * Comments: The software specification has these requirements:
 * 1. The words must be at least three letters in length.
 * 2. A word tile cannot be used twice for the same word.
 * 3. Words can be formed from adjacent tiles, including diagonal ones.
 */
 exports.findAllSolutions = function(gridParam, dictParam) {
  let solutions = [];
  let grid = gridParam;
  let dictionary = dictParam;

  // Iterate through the grid, applying the specification criteria to determine what will be added to the solutions array.
   for (let i = 0; i <= grid.length - 1; i++) {
     for (let j = 0; j <= grid[i].length - 1; j++) {
       peekAtTilesInAllDirections(i, j, '', grid, dictionary);
     }
   }
  solutions = wordMatches;
  return solutions;
}

// Check if the tiles in the word candidate match the beginning of a word in the dictionary
function checkIfTilesStartWord(word, dictionary) {
  for (let i = 0; i <= dictionary.length - 1; i++) {
    if(dictionary[i].startsWith(word)) {
      return true;
    }
  }
  return false;
}

// Check if the tiles in the word candidate match the end of a word in the dictionary
function checkIfTilesEndWord(word, dictionary) {
  for (let i = 0; i <= dictionary.length - 1; i++) {
    if(dictionary[i].endsWith(word)) {
      return true;
    }
  }
  return false;
}

// Check if the confirmed word candidate is in the dictionary
function checkIfWordInDictionary(word, dictionary) {
   // First, check if the tiles contain three or more letters
   if (word.length >= 3){
      // Check the dictionary for a match
      if (dictionary.includes(word)) {
        return true;
      }
   }
  return false;
}

// Checks if word contains a 'Qu' or 'St' tile
function checkIfWordHasQuOrSt(word) {
  if (word.match(/(Qu|St)/)) {
    return true;
  }
  return false;
}

// Set the index position(s) of the next tile to peek from
function setPositionOfTileToPeekFrom(i, j, peekDir, wordCC, grid, dictionary) {
  switch (peekDir) {
         case 'up':
           --i;
           break;
         case 'down':
           ++i;
           break;
         case 'left':
           --j;
           break;
         case 'right':
           ++j;
           break;
         case 'diag-up-left':
           --i;
           --j;
           break;
         case 'diag-down-left':
           ++i;
           --j;
           break;
         case 'diag-up-right':
           --i;
           ++j;
           break;
         case 'diag-down-right':
           ++i;
           ++j;
           break;
         default:
           break;
       }
   peekAtTilesInAllDirections(i, j, wordCC, grid, dictionary);
}

// Peek at the tiles in all directions, and see if there is a match in the dictionary
function peekAtTilesInAllDirections(i, j, wordCC, grid, dictionary) {
  let gridTile = '';
  let gridTilePeek = '';
  let peekDirection = '';
  if (i > -1 && j > -1) {
    gridTile = grid[i][j];
  }
  
  // Peek Up
  if (i > 0) {
   gridTilePeek = grid[i - 1][j];
   peekDirection = 'up';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Diagonal Up Right
  if (i > 0 && j < grid[i].length - 1) {
   gridTilePeek = grid[i - 1][j + 1];
   peekDirection = 'diag-up-right';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Right
  if (gridTile && j < grid[i].length - 1) {
   gridTilePeek = grid[i][j + 1];
   peekDirection = 'right';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Diagonal Down Right
  if (gridTile && i < grid.length - 1 && j < grid[i].length - 1) {
   gridTilePeek = grid[i + 1][j + 1];
   peekDirection = 'diag-down-right';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Down
  if (i < grid.length - 1) {
   gridTilePeek = grid[i + 1][j];
   peekDirection = 'down';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Diagonal Down Left
  if (gridTile && i < grid.length - 1 && j > 0) {
   gridTilePeek = grid[i + 1][j - 1];
   peekDirection = 'diag-down-left';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Left
  if (gridTile && j > 0) {
   gridTilePeek = grid[i][j - 1];
   peekDirection = 'left';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
  // Peek Diagonal Up Left
  if (i > 0 && j > 0) {
   gridTilePeek = grid[i - 1][j - 1];
   peekDirection = 'diag-up-left';
   verifyWordStatus(i, j, gridTile, gridTilePeek, peekDirection, wordCC, grid, dictionary);
  }
}    

// Verify the status of the word candidate
function verifyWordStatus(i, j, tile, tilePeek, peekDir, wordCC, grid, dictionary) {
  let wordC = '';
  if (!wordCC) {
     wordC = tile + tilePeek;
     let hasQuOrSt = checkIfWordHasQuOrSt(wordC);
     // Convert the tiles to lowercase
     wordC = wordC.toLowerCase();
     let reverseWordC = wordC.split('').reverse().join('');
     // Check if the tiles start or end a word
     if (checkIfTilesStartWord(wordC, dictionary)) {
       if (!hasQuOrSt) {
         wordCC = wordC;
         setPositionOfTileToPeekFrom(i, j, peekDir, wordCC, grid, dictionary);
       }
       else {
         checkWordCandidate(wordC, i, j, peekDir, grid, dictionary);
       }
     }
     if (checkIfTilesEndWord(wordC, dictionary)) {
       if (!hasQuOrSt) {
         wordCC = wordC;
         setPositionOfTileToPeekFrom(i, j, peekDir, wordCC, grid, dictionary);
       }
       else {
         checkWordCandidate(wordC, i, j, peekDir, grid, dictionary);
       }
     }
     if (wordC !== reverseWordC) {
       if (checkIfTilesStartWord(reverseWordC, dictionary)) {
         if (!hasQuOrSt) {
           wordCC = reverseWordC;
           setPositionOfTileToPeekFrom(i, j, peekDir, wordCC, grid, dictionary);
         }
         else {
           checkWordCandidate(reverseWordC, i, j, peekDir, grid, dictionary);
         }
       }
       if (checkIfTilesEndWord(reverseWordC, dictionary)) {
         if (!hasQuOrSt) {
           wordCC = reverseWordC;
           setPositionOfTileToPeekFrom(i, j, peekDir, wordCC, grid, dictionary);
         }
         else {
           checkWordCandidate(reverseWordC, i, j, peekDir, grid, dictionary);
         }
       }
     } 
   }
   else {
     let wordCCPeek = wordCC + tilePeek;
     let wordCCPeekBack = tilePeek + wordCC;
     checkWordCandidate(wordCCPeek, i, j, peekDir, grid, dictionary);
     checkWordCandidate(wordCCPeekBack, i, j, peekDir, grid, dictionary);
   }
}

// Check if the word candidate is a match
function checkWordCandidate(wordCCToCheck, i, j, peekDir, grid, dictionary) {
  // Convert the tiles to lowercase
   wordCCToCheck = wordCCToCheck.toLowerCase();
   let reverseWord = wordCCToCheck.split('').reverse().join('');
   // Check if the word candidate starts or ends a word in the dictionary, then check if it's a word itself
   if (checkIfTilesStartWord(wordCCToCheck, dictionary)) {
     if (checkIfWordInDictionary(wordCCToCheck, dictionary)) {
       if (!wordMatches.includes(wordCCToCheck)) {
        wordMatches.push(wordCCToCheck);
       }
      }
     setPositionOfTileToPeekFrom(i, j, peekDir, wordCCToCheck, grid, dictionary);
     }
   else if (checkIfTilesEndWord(wordCCToCheck, dictionary)) {
     if (checkIfWordInDictionary(wordCCToCheck, dictionary)) {
      if (!wordMatches.includes(wordCCToCheck)) {
        wordMatches.push(wordCCToCheck);
       }
     }
     setPositionOfTileToPeekFrom(i, j, peekDir, wordCCToCheck, grid, dictionary);
   }
   if (wordCCToCheck !== reverseWord) {
     if (checkIfTilesStartWord(reverseWord, dictionary)) {
       if (checkIfWordInDictionary(reverseWord, dictionary)) {
         if (!wordMatches.includes(reverseWord)) {
          wordMatches.push(reverseWord);
         }
        }
      }
     else if (checkIfTilesEndWord(reverseWord, dictionary)) {
       if (checkIfWordInDictionary(reverseWord, dictionary)) {
        if (!wordMatches.includes(reverseWord)) {
          wordMatches.push(reverseWord);
        }
       }
     }
   }
}
<<<<<<< HEAD
/*let grid = [['A', 'B'],
            ['C', 'D']];
let dictionary = ['AB','ABD','DCA','XY'];

console.log(exports.findAllSolutions(grid, dictionary));*/
=======

let wordMatches = [];
/*let grid = [['T', 'W', 'Y', 'R'],
            ['E', 'N', 'P', 'H'],
            ['G', 'St', 'Qu', 'R'],
            ['O', 'N', 'T', 'A']];
let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'stont', 'stqura'];*/

//console.log(exports.findAllSolutions(grid, dictionary));
>>>>>>> parent of 8db0849... Second commit; the solver now works as expected.
