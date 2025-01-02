"use strict";

const fs = require("fs");
const path = require("path");

function day3_part1() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  const subStrOpen = "mul(";
  const subStrClose = ")";

  let multiplicationResult = 0;

  let index = input.indexOf(subStrOpen);

  while (index !== -1) {
    let posClosePar = input.indexOf(subStrClose, index + 4);
    let pairOfNumbers = input.substring(index + 4, posClosePar);

    const numbers = pairOfNumbers.split(",");

    let leftNumberStr = numbers[0];
    let rightNumberStr = numbers[1];

    if (
      leftNumberStr != "" &&
      rightNumberStr != "" &&
      !isNaN(leftNumberStr) &&
      !isNaN(rightNumberStr)
    ) {
      multiplicationResult += Number(leftNumberStr) * Number(rightNumberStr);
    }

    index = input.indexOf(subStrOpen, index + 4);
  }

  console.log("Multiplication Result: " + multiplicationResult);
}

console.time("execution time");
day3_part1();
console.timeEnd("execution time");
