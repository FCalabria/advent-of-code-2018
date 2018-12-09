const input = require('./inputs.js').day2;

/**
 * Part 1
 */
  function calculateChecksum(input) {
    let doubleLetter = 0;
    let tripleLetter = 0;

    function getIdCheckSum(id) {
      const sortedId = id.split('').sort().join('');
      const repeatedGroups = sortedId.match(/(\w)\1{1,}/g);
      return {
        hasDouble: repeatedGroups && repeatedGroups.some(v => v.length === 2),
        hasTriple: repeatedGroups && repeatedGroups.some(v => v.length === 3)
      }
    }

    input.forEach((id) => {
      const idCheckSum = getIdCheckSum(id);
      if (idCheckSum.hasDouble) doubleLetter++;
      if (idCheckSum.hasTriple) tripleLetter++;
    });

    return doubleLetter * tripleLetter;
  }


  /**
   * Part 2
   */
  function getCommonLetters(input) {
    function getCommonLettersInPair(a, b) {
      return a.split('').reduce((common, letter, i) => {
        if (letter === b[i]) {
          common.push(letter);
        }
        return common;
      }, []);
    }
    for (let i = 0; i < input.length; i++) {
      const baseElement = input[i];
      for (let j = i + 1; j < input.length; j++) {
        const commonLetters = getCommonLettersInPair(baseElement, input[j]);
        if (commonLetters.length === baseElement.length - 1) {
          return commonLetters.join('');
        }
      }
    }
  }
  console.log(getCommonLetters(input))