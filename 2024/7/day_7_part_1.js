"use strict";

const fs = require("fs");
const path = require("path");

function generateCombinationsBinary(n) {
  const totalCombinations = Math.pow(2, n);
  const result = [];

  for (let i = 0; i < totalCombinations; i++) {
    // Convertimos el número a binario y lo rellenamos con ceros a la izquierda
    const binary = i.toString(2).padStart(n, "0");
    // Reemplazamos '0' por '+' y '1' por '*'
    const symbols = binary.split("").map((bit) => (bit === "0" ? "+" : "*"));
    result.push(symbols);
  }

  return result;
}

function day7_part1() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  const operations = input.split("\n");

  let totalCalibration = 0;

  for (var i = 0; i < operations.length; i++) {
    let indexSep = operations[i].indexOf(":");
    let resultOp = Number(operations[i].substring(0, indexSep));
    let numbers = operations[i]
      .substring(indexSep + 1)
      .trim()
      .split(" ")
      .map(Number);
    let opers = generateCombinationsBinary(numbers.length - 1);

    for (var j = 0; j < opers.length; j++) {
      let total = 0;

      for (var n = 0; n < numbers.length - 1; n++) {
        if (opers[j][n] === "+") {
          if (n === 0) {
            total = numbers[n] + numbers[n + 1];
          } else {
            total = total + numbers[n + 1];
          }
        } else {
          if (n === 0) {
            total = numbers[n] * numbers[n + 1];
          } else {
            total = total * numbers[n + 1];
          }
        }
      }

      if (resultOp === total) {
        totalCalibration += resultOp;
        break;
      }
    }
  }

  console.log("Total Calibration: " + totalCalibration);
}

console.time("execution time");
day7_part1();
console.timeEnd("execution time");
