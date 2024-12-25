"use strict";

const fs = require('fs');
const path = require('path');


function generateCombinations(n) {
    const symbols = ['+', '*', '||']; // Los símbolos disponibles
    const totalCombinations = Math.pow(symbols.length, n); // Total de combinaciones posibles
    const result = [];

    for (let i = 0; i < totalCombinations; i++) {
        let combination = [];
        let index = i;

        // Construir la combinación utilizando aritmética en base-3
        for (let j = 0; j < n; j++) {
            combination.unshift(symbols[index % symbols.length]); // Obtener el símbolo correspondiente
            index = Math.floor(index / symbols.length); // Reducir el índice
        }

        result.push(combination);
    }

    return result;
}

function day7_part2() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const operations = input.split("\n");

    let totalCalibration = 0;

    for (var i = 0; i < operations.length; i++) {

        let indexSep = operations[i].indexOf(':');
        let resultOp = Number(operations[i].substring(0, indexSep));
        let numbers = operations[i].substring(indexSep + 1).trim().split(' ').map(Number);
        let opers = generateCombinations(numbers.length - 1);

        for (var j = 0; j < opers.length; j++) {

            let total = 0;

            for (var n = 0; n < numbers.length - 1; n++) {

                if (opers[j][n] === '+') {

                    if (n === 0) {
                        total = numbers[n] + numbers[n + 1];
                    } else {
                        total = total + numbers[n + 1];
                    }

                } else if (opers[j][n] === '*') {

                    if (n === 0) {
                        total = numbers[n] * numbers[n + 1];
                    } else {
                        total = total * numbers[n + 1];
                    }

                } else {

                    if (n === 0) {
                        total = Number(numbers[n].toString() + numbers[n + 1].toString());
                    } else {
                        total = Number(total.toString() + numbers[n + 1].toString());
                    }

                }

            }

            if (resultOp === total) {
                totalCalibration += resultOp;
                break;
            }

        }

    }

    console.log('Total Calibration: ' + totalCalibration);

}

console.time("execution time");
day7_part2();
console.timeEnd("execution time");