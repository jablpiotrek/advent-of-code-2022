const fs = require('fs');

const nodesCount = 10;

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n').map((row) => row.split(' '));

function pullHead(h, direction) {
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

function pullNode(t, h) {
  const [tX, tY] = t;
  const [hX, hY] = h;
  const dX = hX - tX;
  const dY = hY - tY;

  if ((Math.abs(dX) < 2) && (Math.abs(dY) < 2)) {
    return t;
  }

  return [tX + (dX ? Math.abs(dX) / dX : 0), tY + (dY ? Math.abs(dY) / dY : 0)];
}

function getNewTail(p, h) {
  const currPositions = JSON.parse(JSON.stringify(p));
  currPositions[0] = h;

  for (let i = 1; i < nodesCount; i += 1) {
    currPositions[i] = pullNode(currPositions[i], currPositions[i - 1]);
  }

  return (currPositions);
}
const positions = [new Array(nodesCount).fill([0, 0])];

data.forEach((move) => {
  for (let i = 1; i <= parseInt(move[1]); i += 1) {
    const lastH = positions[positions.length - 1][0];
    const h = pullHead(lastH, move[0]);
    positions.push(getNewTail(positions[positions.length - 1], h));
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
