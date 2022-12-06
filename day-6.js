const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString();

function getMarkers(window = 4) {
  return data.split('').reduce((acc, item, index) => {
    const chunk = data.slice(index, index + window).split('');
    const isUnique = chunk
      .reduce((chunkAcc, chunkItem) => (chunk
        .filter((filterItem) => filterItem !== chunkItem).length === window - 1) && chunkAcc, true);

    return isUnique ? [...acc, index + window] : acc;
  }, []);
}

console.log(`Part 1: ${getMarkers(4)[0]}`);
console.log(`Part 2: ${getMarkers(14)[0]}`);
