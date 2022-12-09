import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').toString().split('\n');

const ranges = input.map((pair) => pair.split(',').map((section) => {
  const [start, end] = section.split('-').map((sectionId) => parseInt(sectionId));

  return [...Array(end - start + 1).keys()].map((x) => x + start);
}));

console.log(`Part 1: ${ranges.map((pair) => pair[0]
  .filter((item) => !pair[1].includes(item)).length === 0 || pair[1]
  .filter((item) => !pair[0].includes(item)).length === 0)
  .reduce((acc, overlaps) => acc + (overlaps ? 1 : 0), 0)}`);

console.log(`Part 2: ${ranges.map((pair) => pair[0].filter((item) => pair[1].includes(item))).reduce((acc, duplicates) => acc + (duplicates.length ? 1 : 0), 0)}`);
