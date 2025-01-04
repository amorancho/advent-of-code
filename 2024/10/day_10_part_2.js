"use strict";

const fs = require("fs");
const path = require("path");

const directions = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
let map = [];

function getTrailHeads(actualPoint, prevPoint, visitedPoints, endPoints) {
  if (
    actualPoint[0] < 0 ||
    actualPoint[0] >= map.length ||
    actualPoint[1] < 0 ||
    actualPoint[1] >= map[0].length
  ) {
    return 0;
  }

  const actualPointStr = actualPoint.toString();

  if (visitedPoints.has(actualPointStr)) {
    return 0;
  }

  if (prevPoint) {
    if (
      map[prevPoint[0]][prevPoint[1]] + 1 !==
      map[actualPoint[0]][actualPoint[1]]
    ) {
      return 0;
    }
  }

  if (map[actualPoint[0]][actualPoint[1]] === 9) {
    //if (!endPoints.has(actualPointStr)) {
    //  endPoints.add(actualPointStr);
      return 1;
    //}
  }

  let result = 0;
  let nextPosition;

  let newVisitedPoints = new Set(visitedPoints);
  newVisitedPoints.add(actualPointStr);

  // left
  nextPosition = [
    actualPoint[0] + directions.left[0],
    actualPoint[1] + directions.left[1],
  ];
  result += getTrailHeads(
    nextPosition,
    actualPoint,
    newVisitedPoints,
    endPoints
  );

  // right
  nextPosition = [
    actualPoint[0] + directions.right[0],
    actualPoint[1] + directions.right[1],
  ];
  result += getTrailHeads(
    nextPosition,
    actualPoint,
    newVisitedPoints,
    endPoints
  );

  // up
  nextPosition = [
    actualPoint[0] + directions.up[0],
    actualPoint[1] + directions.up[1],
  ];
  result += getTrailHeads(
    nextPosition,
    actualPoint,
    newVisitedPoints,
    endPoints
  );

  // down
  nextPosition = [
    actualPoint[0] + directions.down[0],
    actualPoint[1] + directions.down[1],
  ];
  result += getTrailHeads(
    nextPosition,
    actualPoint,
    newVisitedPoints,
    endPoints
  );

  return result;
}

function day10_part2() {
  const filePath = path.join(__dirname, "input.txt");
  let input = fs.readFileSync(filePath, "utf-8").trim();
/*
  input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
*/

  map = input.split("\n").map((line) => line.trim().split("").map(Number));

  let startPoints = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        startPoints.push([i, j]);
      }
    }
  }

  let sumScores = 0;

  for (let i = 0; i < startPoints.length; i++) {
    sumScores += getTrailHeads(startPoints[i], null, new Set(), new Set());
  }

  console.log(sumScores);
}

console.time("execution time");
day10_part2();
console.timeEnd("execution time");
