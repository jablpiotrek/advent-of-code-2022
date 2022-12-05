const fs = require('fs');

const rucksacks = fs.readFileSync('input.txt', 'utf8').toString().split('\n');

console.log(`Part 1: ${rucksacks.reduce((result, rucksack) => {
  const commonItem = rucksack.slice(0, (rucksack.length / 2))
    .split('').find((item) => rucksack.slice((rucksack.length / 2), rucksack.length).includes(item));

  return result + commonItem.charCodeAt(0) - (commonItem.toLowerCase() === commonItem ? 96 : 38);
}, 0)}`);

console.log(`Part 2: ${rucksacks.reduce((groups, rucksack, i) => {
  const groupIndex = Math.floor(i / 3);

  if (!groups[groupIndex]) {
    groups[groupIndex] = [];
  }
  groups[groupIndex].push(rucksack);

  return groups;
}, []).reduce((result, group) => {
  const commonItem = group[0].split('').find((item) => (group[1].includes(item) && group[2].includes(item)));

  return result + commonItem.charCodeAt(0) - (commonItem.toLowerCase() === commonItem ? 96 : 38);
}, 0)}`);
