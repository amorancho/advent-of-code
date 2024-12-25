"use strict";

const fs = require('fs');
const path = require('path');

function day1_part2() {
    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const lines = input.split("\n");

    let leftList = [];
    let rightList = [];

    for (var i = 0; i < lines.length; i++) {
        const numbers = lines[i].trim().split(/\s+/);
        leftList.push(Number(numbers[0]));
        rightList.push(Number(numbers[1]));
    }

    let similarityScore = 0;

    for (var i = 0; i < leftList.length; i++) {
        let ocurr = 0;
        for (var j = 0; j < rightList.length; j++) {
            if (rightList[j] === leftList[i]) {
                ocurr += 1;
            }
        }
        similarityScore += leftList[i] * ocurr;
    }

    console.log('Similarity Score: ' + similarityScore);

}

console.time("execution time");
day1_part2();
console.timeEnd("execution time");