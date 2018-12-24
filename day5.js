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

function part2(input) {
  return 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(letter => new RegExp(letter, 'gi'))
    .map(regex => input.replace(regex, ''))
    .map(s => part1(s))
    .reduce((smaller, current) => smaller < current ? smaller : current);
}

const smallerSample = 'dabAcCaCBAcCcaDA';

console.log(part2(input));