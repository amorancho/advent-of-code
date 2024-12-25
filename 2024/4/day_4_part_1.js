"use strict";

const fs = require('fs');
const path = require('path');

const substring = 'XMAS';

function countOccurrences(string) {
    let count = 0;
    let position = string.indexOf(substring);

    while (position !== -1) {
        count++;
        position = string.indexOf(substring, position + substring.length);
    }

    return count;
}

function getColumnString(matrix, column) {
    let result = "";

    for (let i = 0; i < matrix.length; i++) {
        result += matrix[i][column];
    }

    return result;
}

function getDiagonals(matrix) {

    let diagonals = [];
    let size = matrix.length;

    // Diagonales principales (arriba-izquierda a abajo-derecha)
    for (let startRow = 0; startRow < size; startRow++) {
        let diagonal = '';
        for (let offset = 0; startRow + offset < size; offset++) {
            diagonal += matrix[startRow + offset][offset];
        }
        diagonals.push(diagonal);
    }

    for (let startCol = 1; startCol < size; startCol++) {
        let diagonal = '';
        for (let offset = 0; startCol + offset < size; offset++) {
            diagonal += matrix[offset][startCol + offset];
        }
        diagonals.push(diagonal);
    }

    // Diagonales secundarias (arriba-derecha a abajo-izquierda)
    for (let startRow = 0; startRow < size; startRow++) {
        let diagonal = '';
        for (let offset = 0; startRow + offset < size; offset++) {
            diagonal += matrix[startRow + offset][size - 1 - offset];
        }
        diagonals.push(diagonal);
    }
    for (let startCol = size - 2; startCol >= 0; startCol--) {
        let diagonal = '';
        for (let offset = 0; startCol - offset >= 0; offset++) {
            diagonal += matrix[offset][startCol - offset];
        }
        diagonals.push(diagonal);
    }

    return diagonals;
}

function day4_part1() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const maxCol = 140;

    const lines = input.split("\n");

    let totalAppears = 0;

    // Rows
    for (var i = 0; i < lines.length; i++) {

        let line = lines[i];

        totalAppears += countOccurrences(line);

        let reserveLine = line.split("").reverse().join("");

        totalAppears += countOccurrences(reserveLine);

    }

    // Cols
    for (var i = 0; i < maxCol; i++) {

        let col = getColumnString(lines, i);

        totalAppears += countOccurrences(col);

        let reserveCol = col.split("").reverse().join("");

        totalAppears += countOccurrences(reserveCol);

    }

    // Diagonals
    let diagonals = getDiagonals(lines);

    for (var i = 0; i < diagonals.length; i++) {

        let diagonal = diagonals[i];

        totalAppears += countOccurrences(diagonal);

        let reserveDiagonal = diagonal.split("").reverse().join("");

        totalAppears += countOccurrences(reserveDiagonal);

    }

    console.log('Total Distance: ' + totalAppears);
}

console.time("execution time");
day4_part1();
console.timeEnd("execution time");