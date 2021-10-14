let boggle_solver = require('/home/codio/workspace/Boggle_Impl1/boggle_solver.js');

describe("Validate Submission", function() {
    test('returns all matching words', () => {
      let grid = [["A", "B"], ["C", "D"]];
      let dict = ["AB", "ABD", "DCA", "XY"];
      let solutions = boggle_solver.findAllSolutions(grid, dict);
      let expected = ["ABD", "DCA"];
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    test('handles Qu and St', () => {
      let grid = [["A", "QU"], ["C", "St"]];
      let dict = ["AQU", "STAC"];

      let solutions = boggle_solver.findAllSolutions(grid, dict);
      lowercaseStringArray(solutions);
      lowercaseStringArray(dict);
      expect(solutions.sort()).toEqual(dict.sort());
    });
});

/*
describe("Validate Submission", function() {
    test('returns all matching words', () => {
      let grid = [["A", "B"], ["C", "D"]];
      let dict = ["AB", "ABD", "DCA", "XY"];
      let solutions = boggle_solver.findAllSolutions(grid, dict);
      let expected = ["ABD", "DCA"];
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    test('handles QU', () => {
      let grid = [["A", "QU"], ["C", "D"]];
      let dict = ["AQU"];

      let solutions = boggle_solver.findAllSolutions(grid, dict);
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(dict);
      expect(solutions.sort()).toEqual(dict.sort());
    });
});

function ToGrid(...rows) {
  return rows.map(row => row.split(""));
}

describe("Basic Sanity Checks", function() {
  test('Empty Board', () => {
    let grid = [];
    let dict = ["ABC", "DEF"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });
  test('searches in all directions', () => {
    let grid = ToGrid("ABC", "DEF", "GHI");
    let dict = ["EAB", "EBC", "ECB", "EDB", "EFB", "EGH", "EHI", "EIH"];
    let solutions = boggle_solver.findAllSolutions(grid, dict);
    lowercaseStringArray(solutions);
    lowercaseStringArray(dict);
    expect(solutions.sort(), dict.sort());
  });
});

describe("Duplicate Letters", function() {
  test('Immediate Loop', () => {
    let grid = ToGrid("A");
    let dict = ["AA"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });
  test('Later Loop', () => {
    let grid = ToGrid("AB", "CD");
    let dict = ["ABCA"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });

  ////////REMOVE
  test('Legal Duplicate', () => {
    let grid = ["AB", "CA"];
    let dict = ["ABCA"];
    // Also verifies that "ABCA" doesn't appear in the solution twice.

    let solutions = boggle_solver.findAllSolutions(grid, dict);
    lowercaseStringArray(solutions);
    lowercaseStringArray(dict);
    expect(solutions.sort(), dict.sort());
  });
  ////////
});
*/
// describe('Pathologically Slow', function() {
//   test('Later Duplicate', () => {
//     let grid = ToGrid('AA', 'AA');  // Very slow if 10x10 instead of 2x2.
//     let dict = ['AAAA', 'AAAA'];
//     expect(boggle_solver.findAllSolutions(grid, dict), ['AAAA']);
//   });
// });

/*
describe("Recursive Steps", function() {
  test('Illegal Jumps', () => {
    let grid = ToGrid("ABC", "DEF", "GHI");
    let dict = ["ADC", "ABG"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });
  test('Windy Path', () => {
    let grid = ToGrid("ABC", "DEF", "GHI");
    let dict = ["ABFHDEC"]; // Snake through the grid.
    let solutions = boggle_solver.findAllSolutions(grid, dict);

      // Lowercasing for case-insensitive string array matching.
    lowercaseStringArray(solutions);
     lowercaseStringArray(dict);
    expect(solutions.sort(), dict.sort());
  });
});

describe("Handle Qu", function() {
  test('Basic Functionality', () => {
    let grid = [
      ["A", "QU"],
      ["C", "D"]
    ];
    let dict = ["AQUA", "AQUC", "QUA", "QUD"];
    let expected = ["AQUC","QUA","QUD"];

    let solutions = boggle_solver.findAllSolutions(grid, dict);

    lowercaseStringArray(solutions);
    lowercaseStringArray(expected);
    expect(solutions.sort(), expected.sort());
  });
  test('Trailing Q', () => {
    let grid = [
      ["A", "QU"],
      ["C", "D"]
    ];
    let dict = ["AQ"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });
  test('Q without a U', () => {
    let grid = [
      ["A", "QU"],
      ["C", "D"]
    ];
    let dict = ["QAC"];
    expect(boggle_solver.findAllSolutions(grid, dict), []);
  });
});
*/
/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}
/*
describe('Q w/o U', () => {
  test('Normal case q', () => {
      let grid = [
      ['A', 'QU'],
      ['C', 'D']
    ];
    let dict = ['QAC'];
       let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dict);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
  });
});
*/


describe('Boggle Solver tests', () => {
  describe('Normal input', () => {

    test('Normal case 3x3', () => {
      // Tests a normal 3x3 grid.
      let grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      let dictionary = ['abc', 'abdhi', 'abi'];
      let expected = ['abc', 'abdhi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal case 4x4', () => {
      let grid = [['V', 'E', 'R', 'Y'],
                    ['A', 'B', 'D', 'D'],
                    ['D', 'E', 'D', 'E'],
                    ['D', 'E', 'D', 'E']];
      let dictionary = ['dredd', 'bee', 'ready', 'very', 'acdb'];
      let expected = ['dredd', 'bee', 'very'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal case 5x5', () => {
      // Tests a normal 5x5 grid.
      let grid = [['Qu', 'A', 'X', 'St', 'L'],
                    ['A', 'R', 'R', 'I', 'L'],
                    ['Y', 'F', 'I', 'E', 'D'],
                    ['M', 'R', 'I', 'C', 'K'],
                    ['A', 'N', 'D', 'M', 'O']];
      let dictionary = ['arf', 'ciel', 'derrick', 'army', 'hawaii', 'hero', 'academia', 'still'];
      let expected = ['arf', 'ciel', 'derrick', 'army', 'still'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
/*
    test('No solutions', () => {
      // Tests a grid and dictionary with no possible solutions.
      let grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      let dictionary = ['alphabet', 'aeroplane', 'dijkstra'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Word that takes the entire grid', () => {
      // Tests a word that exactly takes the entire grid.
      let grid = [['A', 'B', 'S', 'T'],
                    ['E', 'S', 'E', 'M'],
                    ['S', 'N', 'I', 'O'],
                    ['S', 'E', 'S', 'U']];
      let dictionary = ['abstemiousnesses', 'asbestos', 'sessensuoimetsba', 'abstemiousnessesa'];
      let expected = ['abstemiousnesses', 'sessensuoimetsba'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    */
  });
/*

  describe('Problem contraints', () => {
    test('Only returns words with 3+ characters', () => {
      // Tests that the algorithm only returns words with 3+ characters.
      let grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      let dictionary = ['a', 'b', 'c', 'd', 'abc', 'ab', '', 'ghefi'];
      let expected = ['abc', 'ghefi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Qu tile counts as 2 letters (can\'t skip the \'u\')', () => {
      // Tests that the Qu block tile counts as a single unit.
      let grid = [['Qu', 'E', 'R'],
                    ['A', 'B', 'C'],
                    ['D', 'E', 'F']];
      // The Qu count as one unit, the 'u' cannot be skipped or ignored.
      let dictionary = ['querbe', 'qerbe'];
      let expected = ['querbe'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Word can\'t end in \'q\', but it can begin with q', () => {
      // Tests that no words can end in q, but some can actually start with q.
      let grid = [['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu']];
      let dictionary = ['iraq', 'iraqu', 'quari', 'quaa'];
      // Since 'iraq' ends with a q, and q's are always accompanied by a u, then
      // 'iraq' or any word ending in 'q', won't appear in a Boggle game.
      let expected = ['iraqu', 'quari', 'quaa'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('The same word can\'t use a block more than once', () => {
      // Tests that a sinbgle word does not recycle any chracters.
      let grid = [['A', 'D', 'E'],
                    ['X', 'X', 'X'],
                    ['X', 'X', 'X']];
      let dictionary = ['ade', 'ada', 'adexx', 'xxxxxx', 'xxxxxxx'];
      let expected = ['ade', 'adexx', 'xxxxxx'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
*/

  describe('Input edge cases', () => {
    test('Grid is 1x1', () => {
      // (Edge case) Since only 1 character words are possible, and these are
      // shorter than 3, then there are no possible solutions.
      let grid = [['A']];
      let dictionary = ['a', 'b', 'c'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is 0x0', () => {
      // (Edge case) Tests that the algorithm can correctly return an empty list
      // when given an empty grid.
      let grid = [[]];
      let dictionary = ['hello', 'there', 'general', 'kenobi'];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
