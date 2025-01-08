"use strict";

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();
/*
input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
*/
let map = input.split("\n").map((line) => line.trim().split(""));

//console.log(map);

const max_rows = map.length;
const max_cols = map[0].length;

const directions = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];

const visited = Array.from({ length: max_rows }, () =>
  Array(max_cols).fill(false)
);

function isValid(x, y) {
  return x >= 0 && x < max_rows && y >= 0 && y < max_cols;
}

function processRegion(startX, startY, plantType) {
  const queue = [[startX, startY]];
  visited[startX][startY] = true;
  let totalArea = 0;
  let totalPerimeter = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    totalArea++;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (!isValid(nx, ny) || map[nx][ny] !== plantType) {
        totalPerimeter++;
      } else if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return { plantT: plantType, area: totalArea, perimeter: totalPerimeter };
}

function day12_part1() {
  let countRegions = [];

  for (let i = 0; i < max_rows; i++) {
    for (let j = 0; j < max_cols; j++) {
      if (!visited[i][j]) {
        countRegions.push(processRegion(i, j, map[i][j]));
      }
    }
  }

  let totalPrices = 0;

  for (let i = 0; i < countRegions.length; i++) {
    totalPrices += countRegions[i].area * countRegions[i].perimeter;
  }

  console.log("Total Prices: " + totalPrices);
}

console.time("execution time");
day12_part1();
console.timeEnd("execution time");
