"use strict";

const fs = require('fs');
const path = require('path');

const pageRules = [];

function isValid(a, b) {

    let result = true;
    for (var i = 0; i < pageRules.length; i++) {
        if ((pageRules[i][0] === b) && (pageRules[i][1] === a)) {
            result = false;
        }
    }
    return result;

}

function isInRightOrder(array) {

    let result = true;

    for (var i = 0; i < array.length; i++) {

        // left side
        for (var l = 0; l < i; l++) {
            if (!isValid(array[l], array[i])) {
                result = false;
            }
        }

        if (result) {

            // right side
            for (var r = i + 1; r < array.length; r++) {
                if (!isValid(array[i], array[r])) {
                    result = false;
                }
            }
        }

    }

    return result;

}

function getMiddleValue(array) {
    let index = (array.length + 1) / 2;

    return array[index - 1];
}

function day5_part1() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const lines = input.split("\n");

    let separatorFound = false;

    const pageUpdates = [];

    let middleValues = [];

    for (var i = 0; i < lines.length; i++) {

        if (lines[i].length < 5) {
            separatorFound = true;
        } else {
            if (!separatorFound) {
                pageRules.push(lines[i].split('|').map(Number));
            } else {
                pageUpdates.push(lines[i].split(',').map(Number));
            }
        }

    }

    for (var i = 0; i < pageUpdates.length; i++) {

        if (isInRightOrder(pageUpdates[i])) {
            middleValues.push(getMiddleValue(pageUpdates[i]));
        }

    }

    let totalMidPageNum = middleValues.reduce((a, b) => a + b, 0);

    console.log('Total Middle Page Number: ' + totalMidPageNum);
}

console.time("execution time");
day5_part1();
console.timeEnd("execution time");