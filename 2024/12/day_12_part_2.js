"use strict";

const fs = require("fs");
const { get } = require("http");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();

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

function getSides(points) {
  const pointSet = new Set(points.map(point => point.toString()));
  let sides = 0;

  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0]  // up
  ];

  for (const [x, y] of points) {
    for (const [dx, dy] of directions) {
      const neighbor = [x + dx, y + dy].toString();
      if (!pointSet.has(neighbor)) {
        sides++;
      }
    }
  }

  // Adjust for shared sides
  for (const [x, y] of points) {
    for (const [dx, dy] of directions) {
      const neighbor = [x + dx, y + dy];
      if (pointSet.has(neighbor.toString())) {
        sides--;
      }
    }
  }

  return sides;
}

function getCorners(points) {
  const pointSet = new Set(points.map(point => point.toString()));
  let internalCorners = 0;
  let externalCorners = 0;

  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0]  // up
  ];

  const cornerDirections = [
    [[0, 1], [1, 0]],  // bottom-right corner
    [[1, 0], [0, -1]], // bottom-left corner
    [[0, -1], [-1, 0]], // top-left corner
    [[-1, 0], [0, 1]]  // top-right corner
  ];

  for (const [x, y] of points) {
    for (const [dir1, dir2] of cornerDirections) {
      const neighbor1 = [x + dir1[0], y + dir1[1]].toString();
      const neighbor2 = [x + dir2[0], y + dir2[1]].toString();
      if (!pointSet.has(neighbor1) && !pointSet.has(neighbor2)) {
        externalCorners++;
      } else if (pointSet.has(neighbor1) && pointSet.has(neighbor2)) {
        internalCorners++;
      }
    }
  }

  return internalCorners + externalCorners ;
}

function processRegion(startX, startY, plantType) {
  const queue = [[startX, startY]];
  visited[startX][startY] = true;
  let totalArea = 0;
  let totalPerimeter = 0;
  let totalSurface = [];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    totalSurface.push([x, y]);
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

  let totalSides = getCorners(totalSurface);

  return { plantT: plantType, area: totalArea, perimeter: totalPerimeter, surface: totalSurface, sides: totalSides};
}

function day12_part2() {
  let countRegions = [];

  for (let i = 0; i < max_rows; i++) {
    for (let j = 0; j < max_cols; j++) {
      if (!visited[i][j]) {
        countRegions.push(processRegion(i, j, map[i][j]));
      }
    }
  }

  //console.log(countRegions);

  let totalPrices = 0;

  for (let i = 0; i < countRegions.length; i++) {
    totalPrices += countRegions[i].area * countRegions[i].perimeter;
    console.log("Plant Type: " + countRegions[i].plantT);
    console.log("Area: " + countRegions[i].area);
    console.log("Perimeter: " + countRegions[i].perimeter);
    console.log(countRegions[i].surface);
    console.log("Sides: " + countRegions[i].sides);
  }

  console.log("Total Prices: " + totalPrices);
}

console.time("execution time");
day12_part2();
console.timeEnd("execution time");
