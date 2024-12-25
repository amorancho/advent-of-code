"use strict";

const fs = require('fs');
const path = require('path');

function day3_part2() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const subStrOpen = 'mul(';
    const subStrClose = ')';
    const subStrDo = 'do()';
    const subStrDont = "don't()";

    let canDoMul = true;

    let multiplicationResult = 0;

    let index = input.indexOf(subStrOpen);
    let iniPos = 0;

    while (index !== -1) {

        let subStrPart = input.substring(iniPos, index);

        if ((canDoMul) && (subStrPart.indexOf(subStrDont) !== -1)) {
            canDoMul = false;
        } else if ((!canDoMul) && (subStrPart.indexOf(subStrDo) !== -1)) {
            canDoMul = true;
        }

        if (canDoMul) {

            let posClosePar = input.indexOf(subStrClose, index + 4);
            let pairOfNumbers = input.substring(index + 4, posClosePar);

            const numbers = pairOfNumbers.split(',');

            let leftNumberStr = numbers[0];
            let rightNumberStr = numbers[1];

            if (
                (leftNumberStr != '') &&
                (rightNumberStr != '') &&
                (!isNaN(leftNumberStr)) &&
                (!isNaN(rightNumberStr))
            ) {

                multiplicationResult += Number(leftNumberStr) * Number(rightNumberStr);

            }

        }
        iniPos = index;
        index = input.indexOf(subStrOpen, index + 4);
    }

    console.log('Multiplication Result: ' + multiplicationResult);

}

console.time("execution time");
day3_part2();
console.timeEnd("execution time");