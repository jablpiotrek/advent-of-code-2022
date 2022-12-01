fs = require('fs');

var data = fs.readFileSync('input.txt', 'utf8');
var caloriesTotal = [0];

data.toString().split(/\s/).forEach(line => {
    if (line !== '' ) {
        caloriesTotal[caloriesTotal.length - 1] += parseInt(line);
    } else {
        caloriesTotal.push(0);
    }
});

console.log(caloriesTotal.sort((a,b) => b - a)[0]);
