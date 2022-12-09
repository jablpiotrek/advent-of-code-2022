import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8');
const caloriesTotal = [0];

data.toString().split(/\s/).forEach((line) => {
  if (line !== '') {
    caloriesTotal[caloriesTotal.length - 1] += parseInt(line);
  } else {
    caloriesTotal.push(0);
  }
});

console.log(`Top Elve calories: ${caloriesTotal.sort((a, b) => b - a)[0]}`);
console.log(`Top 3 Elves calories: ${caloriesTotal.sort((a, b) => b - a).slice(0, 3).reduce((acc, a) => acc + a)}`);
