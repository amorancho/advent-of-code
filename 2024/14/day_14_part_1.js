"use strict";

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();
/*
input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
*/
const robotsLines = input.split("\n");
const positions = [];

const max_rows = 103;
const max_cols = 101;
const num_seconds = 100;
const midX = Math.ceil(max_cols / 2) - 1;
const midY = Math.ceil(max_rows / 2) - 1;

function getPositionOfRobot(p, v) {
  let actPos = p;
  let newPos;

  for (let i = 0; i < num_seconds; i++) {
    newPos = [actPos[0] + v[0], actPos[1] + v[1]];

    if (
      newPos[0] >= 0 &&
      newPos[0] < max_cols &&
      newPos[1] >= 0 &&
      newPos[1] < max_rows
    ) {

      actPos = newPos;
      continue;
    }

    if (newPos[0] < 0) {
      newPos[0] = max_cols - Math.abs(newPos[0]);
    } else if (newPos[0] >= max_cols) {
      newPos[0] = newPos[0] - max_cols;
    }
    if (newPos[1] < 0) {
      newPos[1] = max_rows - Math.abs(newPos[1]);
    } else if (newPos[1] >= max_rows) {
      newPos[1] = newPos[1] - max_rows;
    }

    actPos = newPos;
  }

  return newPos;
}

function printPositions(positions) {
  // Determine the size of the grid
  let maxX = 0;
  let maxY = 0;
  for (const [x, y] of positions) {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  // Initialize the grid with '.'
  let grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill('.'));

  // Mark the positions with 'X'
  for (const [x, y] of positions) {
    grid[y][x] = 'X';
  }

  // Print the grid
  for (const row of grid) {
    console.log(row.join(' '));
  }
}

function day14_part1() {
  //let posOri = [];
  for (let i = 0; i < robotsLines.length; i++) {
    let robot = robotsLines[i].trim().split(" ");
    let p = robot[0].split("=")[1].split(",").map(Number);
    let v = robot[1].split("=")[1].split(",").map(Number);
    //posOri.push(p);
    positions.push(getPositionOfRobot(p, v));
  }

  let quadrants = [0, 0, 0, 0];

  for (let i = 0; i < positions.length; i++) {
    if (positions[i][0] < midX && positions[i][1] < midY) {
      quadrants[0] += 1;
    } else if (positions[i][0] > midX && positions[i][1] < midY) {
      quadrants[1] += 1;
    } else if (positions[i][0] < midX && positions[i][1] > midY) {
      quadrants[2] += 1;
    } else if (positions[i][0] > midX && positions[i][1] > midY) {
      quadrants[3] += 1;
    }
  }

  let safetyFactor = 1;

  for (let i = 0; i < quadrants.length; i++) {
    safetyFactor = safetyFactor * quadrants[i];
  }

  console.log("safetyFactor: ", safetyFactor);
}

console.time("execution time");
day14_part1();
console.timeEnd("execution time");
