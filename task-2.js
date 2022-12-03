fs = require('fs');

//They:  A for Rock, B for Paper, and C for Scissors 
//Me: X for Rock, Y for Paper, and Z for Scissors

const beats = {
    X: 'C',
    Y: 'A',
    Z: 'B'
}

const beatsAlt = {
    A: 'Y',
    B: 'Z',
    C: 'X'
}

const looses = {
    A: 'Z',
    B: 'X',
    C: 'Y'
}

const theyToMe = {
    A: 'X',
    B: 'Y',
    C: 'Z'
}

const points = {
    X: 1,
    Y: 2,
    Z: 3
}

function getResult(me, they) {
    return points[me] + (me === theyToMe[they] ? 3 : beats[me] === they ? 6 : 0);
}

function getMyMove(they, result) {
    return result === 'X' ? looses[they] : result === 'Z' ? beatsAlt[they] : theyToMe[they];
}

const instructions = fs.readFileSync('input.txt', 'utf8').toString().split('\n')

console.log(`Part 1 result: ${instructions.map(row => ({ me: row[2], they: row[0] })).reduce((total, round) => total + getResult(round.me, round.they), 0)}`);
console.log(`Part 2 result: ${instructions.map(row => ({ me: getMyMove(row[0], row[2]), they: row[0] })).reduce((total, round) => total + getResult(round.me, round.they), 0)}`);


