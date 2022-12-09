import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').toString().split('\n');

const trees = data.map((row) => row.split('').map((tree) => parseInt(tree)));
const visibleTrees = [];

trees.forEach((row, y) => {
  row.forEach((tree, x) => {
    if ((x > 0 && x < trees[0].length - 1) && (y > 0 && y < trees.length - 1)) {
      const lookUp = trees.slice(0, y).map((rowsUp) => rowsUp[x]).reverse();
      const lookRight = trees[y].slice(x + 1, trees[0].length);
      const lookDown = trees.slice(y + 1, trees.length).map((rowsDown) => rowsDown[x]);
      const lookLeft = trees[y].slice(0, x).reverse();

      const viewFactor = (lookLeft.indexOf(lookLeft.find((item) => item >= tree)) >= 0
        ? lookLeft.indexOf(lookLeft.find((item) => item >= tree)) + 1 : x)
      * (lookRight.indexOf(lookRight.find((item) => item >= tree)) >= 0
        ? lookRight.indexOf(lookRight.find((item) => item >= tree)) + 1 : trees[0].length - x - 1)
      * (lookUp.indexOf(lookUp.find((item) => item >= tree)) >= 0
        ? lookUp.indexOf(lookUp.find((item) => item >= tree)) + 1 : y)
        * (lookDown.indexOf(lookDown.find((item) => item >= tree)) >= 0
          ? lookDown.indexOf(lookDown.find((item) => item >= tree)) + 1 : trees.length - y - 1);

      const lookout = [lookUp, lookRight, lookDown, lookLeft];

      if (lookout.some((direction) => direction.every((treeInDir) => treeInDir < tree))) {
        visibleTrees.push([x, y, viewFactor]);
      }
    }
  });
});

console.log(`Part 1: ${visibleTrees.length + trees.length * 2 + trees[0].length * 2 - 4}`);
console.log(`Part 2: ${visibleTrees.sort((a, b) => b[2] - a[2])[0][2]}`);
