const input = require('./inputs.js').day5;

function part1(input) {
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    const nextLetter = input[i + 1];
    if (letter && nextLetter && letter !== nextLetter && letter.toLowerCase() === nextLetter.toLowerCase()) {
      input = input.substring(0, i) + input.substring(i + 2);
      i = i - 2;
    }
  }
  return input.length;
}

const smallerSample = 'dabAcCaCBAcCcaDA';

console.log(part1(input));