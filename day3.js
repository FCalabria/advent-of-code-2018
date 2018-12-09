const input = require('./inputs.js').day3;

/**
 * Common functions
 */
function mapValue(v) {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const matches = v.match(regex);
  return {
    id: matches[1],
    x: parseInt(matches[2]),
    y: parseInt(matches[3]),
    width: parseInt(matches[4]),
    height: parseInt(matches[5])
  }
}

function createFabricMap(input, fabric, fillColumn) {
  input.forEach((value) => {
    const { x, y, width, height, id } = mapValue(value);
    for (let start = x; start < x + width; start++) {
      if (!fabric[start]) {
        fabric[start] = {};
      }
      fillColumn(fabric[start], y, y + height - 1, id);
    }
  });
}

/**
 * Part 1
 */

function usedSqInches(input) {
  const fabric = {};
  let duplicatedAreas = 0;

  function fillColumn(column, fromY, toY) {
    for (let coord = fromY; coord <= toY; coord++) {
      // Yep, modifing the input is bad, but performs way better than doing a clone
      // Must be a performant AND clean way to do this
      column[coord] = !column[coord] ? 1 : column[coord] + 1;
      if (column[coord] === 2) {
        duplicatedAreas++;
      }
    }
  }

  createFabricMap(input, fabric, fillColumn);
  return duplicatedAreas;
 }

/**
 * Part 2
 */

function findNotOverlaped(input) {
  const fabric = {};
  const ids = { usedOnce: {}, usedMore: {} };

  function updateUsedIds(column, coord, id) {
    const columnLength = column[coord].length;
    if (columnLength === 1 && !ids.usedMore[id]) {
      ids.usedOnce[id] = true;
    }
    else {
      const previousId = column[coord][columnLength - 2];
      delete ids.usedOnce[id];
      ids.usedMore[id] = true;
      if (previousId) {
        delete ids.usedOnce[previousId];
        ids.usedMore[previousId] = true;
      }
    }
  }

  function fillColumn(column, fromY, toY, id) {
    for (let coord = fromY; coord <= toY; coord++) {
      // Yep, modifing the input is bad, but performs way better than doing a clone
      // Must be a performant AND clean way to do this
      if (!column[coord]) {
        column[coord] = [id];
      } else {
        column[coord].push(id);
      }
      updateUsedIds(column, coord, id);
    }
  }
  createFabricMap(input, fabric, fillColumn);
  return Object.keys(ids.usedOnce)[0];
}


 console.log(findNotOverlaped(input));