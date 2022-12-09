const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n').map((row) => row.split(' '));

function getNewH(h, direction) {
  const [x, y] = h;
  switch (direction) {
    case 'R':
      return [x + 1, y];
    case 'L':
      return [x - 1, y];
    case 'U':
      return [x, y + 1];
    case 'D':
      return [x, y - 1];
    default:
      return [x, y];
  }
}

function getNewT(t, h) {
  const [tX, tY] = t;
  const [hX, hY] = h;
  const dX = hX - tX;
  const dY = hY - tY;

  const diagonal = (Math.abs(dX) * Math.abs(dY) > 0);

  if ((diagonal && (Math.abs(dX) + Math.abs(dY) <= 2))
    || (!diagonal && (Math.abs(dX) + Math.abs(dY) <= 1))) {
    return t;
  }

  return [tX + (dX ? Math.abs(dX) / dX : 0), tY + (dY ? Math.abs(dY) / dY : 0)];
}

function getNewTs(p, h) {
  const currPositions = JSON.parse(JSON.stringify(p));
  currPositions[0] = h;

  for (let i = 1; i < 10; i += 1) {
    currPositions[i] = getNewT(currPositions[i], currPositions[i - 1]);
  }

  return (currPositions);
}

const positions = [
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
];
data.forEach((move) => {
  for (let i = 1; i <= parseInt(move[1]); i += 1) {
    const lastH = positions[positions.length - 1][0];
    const h = getNewH(lastH, move[0]);
    positions.push(getNewTs(positions[positions.length - 1], h));
  }
});

console.log(`Part 1: ${
  positions.reduce((acc, item) => (acc.includes(JSON.stringify(item[1]))
    ? acc : [...acc, JSON.stringify(item[1])]), []).length
}`);

console.log(`Part 1: ${
  positions.reduce((acc, item) => (acc.includes(JSON.stringify(item[9]))
    ? acc : [...acc, JSON.stringify(item[9])]), []).length
}`);
