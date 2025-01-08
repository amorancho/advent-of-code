"use strict";

const fs = require("fs");
const { get } = require("http");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();
/*
input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
*/
const clawsMachineLines = input.split("\n");
const clawsMachoneMap = [];

function getNumberOfTokensCramerMethod(coefficients, constants) {
  const determinant = (matrix) => {
    if (matrix.length === 2) {
      // Determinante de una matriz 2x2
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // Determinante de una matriz nxn (expansión de cofactores)
    return matrix[0].reduce((det, val, col) => {
      const minor = matrix
        .slice(1)
        .map((row) => row.filter((_, j) => j !== col));
      return det + val * determinant(minor) * (col % 2 === 0 ? 1 : -1);
    }, 0);
  };

  const n = constants.length;
  const detA = determinant(coefficients);

  // Si el determinante es 0, el sistema no tiene solución única
  if (Math.abs(detA) < 1e-10) return null;

  // Calcular determinantes de las matrices modificadas
  const solutions = [];
  for (let i = 0; i < n; i++) {
    const modifiedMatrix = coefficients.map((row, rowIndex) =>
      row.map((value, colIndex) =>
        colIndex === i ? constants[rowIndex] : value
      )
    );
    solutions.push(determinant(modifiedMatrix) / detA);
  }

  return solutions;
}

function day13_part1() {
  for (let i = 0; i < clawsMachineLines.length; i++) {
    let buttonA_X = clawsMachineLines[i].substring(
      12,
      clawsMachineLines[i].indexOf(",")
    );
    let buttonA_Y = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y+") + 2
    );

    i++;

    let buttonB_X = clawsMachineLines[i].substring(
      12,
      clawsMachineLines[i].indexOf(",")
    );
    let buttonB_Y = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y+") + 2
    );

    i++;

    let prizeX = clawsMachineLines[i].substring(
      9,
      clawsMachineLines[i].indexOf(",")
    );
    let prizeY = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y=") + 2
    );

    i++;

    clawsMachoneMap.push({
      buttonA: [Number(buttonA_X), Number(buttonA_Y)],
      buttonB: [Number(buttonB_X), Number(buttonB_Y)],
      prize: [Number(prizeX) + 10000000000000, Number(prizeY) + 10000000000000],
    });
  }

  let numberOfTokens = 0;

  for (let i = 0; i < clawsMachoneMap.length; i++) {
    let coefficients = [
      [clawsMachoneMap[i].buttonA[0], clawsMachoneMap[i].buttonB[0]],
      [clawsMachoneMap[i].buttonA[1], clawsMachoneMap[i].buttonB[1]],
    ];
    let constants = [clawsMachoneMap[i].prize[0], clawsMachoneMap[i].prize[1]];
    let solution = getNumberOfTokensCramerMethod(coefficients, constants);

    if (solution) {
      if (
        !solution[0].toString().includes(".") &&
        !solution[1].toString().includes(".")
      ) {
        numberOfTokens += solution[0] * 3 + solution[1];
      }
    }
  }

  console.log("numberOfTokens: ", numberOfTokens);
}

console.time("execution time");
day13_part1();
console.timeEnd("execution time");
