
"use strict";

const fs = require('fs');
const path = require('path');

function textToMatrix(text) {

    const lineas = text.split('\n');

    const matriz = [];

    lineas.forEach(linea => {
        matriz.push(linea.split(''));
    });

    return matriz;
}

function getSubMatrix3x3(matrix) {

    const submatrices = [];

    // Iteramos sobre las filas y columnas, asegurándonos de que quepan submatrices de 3x3
    for (let i = 0; i <= matrix.length - 3; i++) {
        for (let j = 0; j <= matrix[i].length - 3; j++) {
            const submatriz = [];
            for (let k = 0; k < 3; k++) {
                submatriz.push(matrix[i + k].slice(j, j + 3));
            }
            submatrices.push(submatriz);
        }
    }

    return submatrices;

}

function isValidMatrix(matrix) {

    let result = false;

    if (
        (matrix[1][1] === 'A') &&
        (
            ((matrix[0][0] === 'M') && (matrix[0][2] === 'S') && (matrix[2][0] === 'M') && (matrix[2][2] === 'S')) ||
            ((matrix[0][0] === 'M') && (matrix[0][2] === 'M') && (matrix[2][0] === 'S') && (matrix[2][2] === 'S')) ||
            ((matrix[0][0] === 'S') && (matrix[0][2] === 'M') && (matrix[2][0] === 'S') && (matrix[2][2] === 'M')) ||
            ((matrix[0][0] === 'S') && (matrix[0][2] === 'S') && (matrix[2][0] === 'M') && (matrix[2][2] === 'M'))
        )
    ) {
        result = true;
    }

    return result;

}

function day4_part2() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    const bigMatrix = textToMatrix(input);
    const allSubMatrix = getSubMatrix3x3(bigMatrix);

    let correctMatrixCount = 0;
    for (var i = 0; i < allSubMatrix.length; i++) {

        if (isValidMatrix(allSubMatrix[i])) {
            correctMatrixCount += 1;
        }

    }

    console.log('Total Correct Matrix: ' + correctMatrixCount);
}

console.time("execution time");
day4_part2();
console.timeEnd("execution time");