import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').toString().split('\n').map((row) => row.split(' '));

const cycles = data.reduce((acc, item) => {
  const x1 = acc[acc.length - 1]?.x2 ?? 1;
  if (item.length === 1) {
    return [...acc, {
      x1,
      x2: x1,
    }];
  }

  return [...acc, {
    x1,
    x2: x1,
  }, {
    x1,
    x2: x1 + parseInt(item[1]),
  }];
}, []);

const points = [];

for (let i = 19; i < cycles.length; i += 40) {
  points.push(i);
}

console.log(`Part 1: ${points.reduce((acc, item) => acc + (item + 1) * cycles[item].x1, 0)}`);
console.log('Part 2:');

for (let row = 0; row < 6; row += 1) {
  let line = '';
  for (let col = 0; col < 40; col += 1) {
    const x = cycles[row * 40 + col].x1;
    line += ((col >= (x - 1)) && (col <= (x + 1)) ? '█' : '░');
  }
  console.log(line);
}
