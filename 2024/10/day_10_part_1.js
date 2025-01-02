"use strict";

const fs = require("fs");
const path = require("path");

function day10_part1() {
  const filePath = path.join(__dirname, "input.txt");
  let input = fs.readFileSync(filePath, "utf-8").trim();

  input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

console.log(input);

}

console.time("execution time");
day10_part1();
console.timeEnd("execution time");