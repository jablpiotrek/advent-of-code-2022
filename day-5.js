const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n');

const layers = data.slice(0, data.indexOf('') - 1).reverse().map((layer) => layer.replaceAll(/\[|\]/g, '').replaceAll('    ', ' X ').split(' ').filter((item) => item !== ''));
const columns = layers[0].map((column, i) => layers.map((layer) => layer[i])).map((layer) => layer.filter((item) => item !== 'X'));
const columnsB = JSON.parse(JSON.stringify(columns));
const instructions = data.slice(data.indexOf('') + 1, data.length).map((instruction) => instruction.split(' ').filter((item) => !['move', 'from', 'to'].includes(item)).map((item) => parseInt(item)));

instructions.forEach((instruction) => {
  const n = instruction[0];
  const payload = columns[instruction[1] - 1].splice(columns[instruction[1] - 1].length - n, n);

  columns[instruction[2] - 1].push(...payload.reverse());
});

instructions.forEach((instruction) => {
  const n = instruction[0];
  const payload = columnsB[instruction[1] - 1].splice(columnsB[instruction[1] - 1].length - n, n);

  columnsB[instruction[2] - 1].push(...payload);
});

console.log(`Part 1: ${columns.map((column) => column[column.length - 1]).join('')}`);
console.log(`Part 1: ${columnsB.map((column) => column[column.length - 1]).join('')}`);
