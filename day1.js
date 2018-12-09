const {performance} = require('perf_hooks');
const input = require('./inputs.js').day1;

/**
 * Part 1
 */
function sumInput(input, startFrom) {
  return input.reduce((total, current) => total + current, startFrom);
}

/**
 * Part 2
 * Takes around 20300ms
 */
function repeatedFrec(input) {
  const t0 = performance.now();
  let frecs = [];
  let result;
  do {
    let starting = frecs[frecs.length - 1] || 0;
    for (let i = 1; i <= input.length; i++) {
      const partialArray = [0].concat(input.slice(0, i));
      const resultFrec = sumInput(partialArray, starting);
      if (frecs.includes(resultFrec)) {
        result = resultFrec;
        console.log(`took ${performance.now() - t0}ms`);
        return result;
      }
      frecs.push(resultFrec);
    }
  } while (result === undefined);
}

/**
 * Part 2 optimized
 * Takes around 19800ms
 */
function repeatedFrecOpt(input) {
  const t0 = performance.now();
  let frecs = [0];
  let result;
  do {
    for (const value of input) {
      const lastFrec = frecs[frecs.length - 1];
      const resultFrec = lastFrec + value;
      if (frecs.includes(resultFrec)) {
        result = resultFrec;
        console.log(`took ${performance.now() - t0}ms`);
        return result;
      }
      frecs.push(resultFrec);
    }
  } while (result === undefined);
}

console.log(repeatedFrecOpt(input))