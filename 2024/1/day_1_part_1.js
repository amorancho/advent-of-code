"use strict";

const fs = require("fs");
const path = require("path");

function day1_part1() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  const lines = input.split("\n");

  let leftList = [];
  let rightList = [];

  for (var i = 0; i < lines.length; i++) {
    const numbers = lines[i].trim().split(/\s+/);
    leftList.push(Number(numbers[0]));
    rightList.push(Number(numbers[1]));
  }

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;

  for (var i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  console.log("Total Distance: " + totalDistance);
}

console.time("execution time");
day1_part1();
console.timeEnd("execution time");
