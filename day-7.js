const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n');

const totalSpace = 70000000;
const requiredSpace = 30000000;

const currentPath = [];
const directories = [];

data.forEach((item) => {
  if (item === '$ cd ..') {
    currentPath.pop();
  } else if (item.includes('$ cd ')) {
    currentPath.push(item.slice(5, item.length));
    directories.push({
      dir: item.slice(5, item.length),
      path: [...currentPath],
      id: currentPath.join('-'),
      size: 0,
    });
  } else if (parseInt(item.split(' ')[0])) {
    currentPath.forEach((pathItem, index) => {
      directories.find((dirItem) => dirItem.id === currentPath.slice(0, index + 1).join('-')).size += parseInt(item.split(' ')[0]);
    });
  }
});

console.log(`Part 1: ${directories.reduce((acc, item) => (item.size <= 100000 ? acc + item.size : acc), 0)}`);

console.log(`Part 2: ${directories.sort((a, b) => a.size - b.size).find((dirItem) => totalSpace - directories.find((dirItemA) => dirItemA.id === '/').size + dirItem.size >= requiredSpace).size}`);
