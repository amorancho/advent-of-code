"use strict";

const fs = require('fs');
const path = require('path');

function isSafe(levels) {
    let result = true;
    let increase1, increase2;

    for (let j = 0; j < levels.length; j++) {
        if (j > 0) {
            let distance = Math.abs(levels[j] - levels[j - 1]);

            if (distance > 3 || distance === 0) {
                result = false;
            } else {
                if (j === 1) {
                    increase1 = levels[j] > levels[j - 1];
                } else {
                    increase2 = levels[j] > levels[j - 1];
                    if (increase1 !== increase2) {
                        result = false;
                    }
                }
            }
        }
    }

    return result;
}

function day2_part2() {
    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const reports = input.split("\n");
    let safeReports = 0;
    let wrongLevels = [];

    for (let i = 0; i < reports.length; i++) {
        let levels = reports[i].split(' ').map(str => parseInt(str));
        if (isSafe(levels)) {
            safeReports += 1;
        } else {
            wrongLevels.push(levels);
        }
    }

    // Por fuerza bruta, de cada report erróneo, vamos quitando un elemento (desde el primero hasta el último índice) 
    // y si alguno devuelve isSafe=true, sumamos 1 a safeReport
    for (let i = 0; i < wrongLevels.length; i++) {
        let level = wrongLevels[i];
        for (let j = 0; j < level.length; j++) {
            let levelReducted = level.filter((_, index) => index !== j);
            if (isSafe(levelReducted)) {
                safeReports += 1;
                break;
            }
        }
    }

    console.log('Safe Reports: ' + safeReports);
}

console.time("execution time");
day2_part2();
console.timeEnd("execution time");