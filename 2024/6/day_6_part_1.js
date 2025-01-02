"use strict";

const fs = require("fs");
const path = require("path");

let map = [];

let max_x;
let max_y;

let initialPos;

const dirUp = "^";
const dirDown = "v";
const dirLeft = "<";
const dirRight = ">";

const obstruction = "#";
const empty = ".";

const new_obstruction = "O";

let posDirArray = [];

function getPositionOfGuard() {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if ([dirUp, dirDown, dirLeft, dirRight].includes(map[i][j])) {
        return { x: i, y: j, d: map[i][j] };
      }
    }
  }
}

function doUp(pos) {
  if (pos.x > 0) {
    if (
      map[pos.x - 1][pos.y] === obstruction ||
      map[pos.x - 1][pos.y] === new_obstruction
    ) {
      map[pos.x][pos.y] = dirRight;
      return { x: pos.x, y: pos.y, d: dirRight };
    } else {
      map[pos.x - 1][pos.y] = map[pos.x][pos.y];
      map[pos.x][pos.y] = empty;
      return { x: pos.x - 1, y: pos.y, d: dirUp };
    }
  } else {
    map[pos.x][pos.y] = empty;
  }
}

function doDown(pos) {
  if (pos.x + 1 < max_x) {
    if (
      map[pos.x + 1][pos.y] === obstruction ||
      map[pos.x + 1][pos.y] === new_obstruction
    ) {
      map[pos.x][pos.y] = dirLeft;
      return { x: pos.x, y: pos.y, d: dirLeft };
    } else {
      map[pos.x + 1][pos.y] = map[pos.x][pos.y];
      map[pos.x][pos.y] = empty;
      return { x: pos.x + 1, y: pos.y, d: dirDown };
    }
  } else {
    map[pos.x][pos.y] = empty;
  }
}

function doLeft(pos) {
  if (pos.y > 0) {
    if (
      map[pos.x][pos.y - 1] === obstruction ||
      map[pos.x][pos.y - 1] === new_obstruction
    ) {
      map[pos.x][pos.y] = dirUp;
      return { x: pos.x, y: pos.y, d: dirUp };
    } else {
      map[pos.x][pos.y - 1] = map[pos.x][pos.y];
      map[pos.x][pos.y] = empty;
      return { x: pos.x, y: pos.y - 1, d: dirLeft };
    }
  } else {
    map[pos.x][pos.y] = empty;
  }
}

function doRight(pos) {
  if (pos.y + 1 < max_y) {
    if (
      map[pos.x][pos.y + 1] === obstruction ||
      map[pos.x][pos.y + 1] === new_obstruction
    ) {
      map[pos.x][pos.y] = dirDown;
      return { x: pos.x, y: pos.y, d: dirDown };
    } else {
      map[pos.x][pos.y + 1] = map[pos.x][pos.y];
      map[pos.x][pos.y] = empty;
      return { x: pos.x, y: pos.y + 1, d: dirRight };
    }
  } else {
    map[pos.x][pos.y] = empty;
  }
}

function posDirExist(pos) {
  for (var i = 0; i < posDirArray.length; i++) {
    if (
      posDirArray[i].x === pos.x &&
      posDirArray[i].y === pos.y &&
      posDirArray[i].d === pos.d
    ) {
      return true;
    }
  }
  return false;
}

function doNextStepOfGuard(actualPos) {
  let guardDir = map[actualPos.x][actualPos.y];

  if (guardDir == "^") {
    return doUp(actualPos);
  } else if (guardDir == "v") {
    return doDown(actualPos);
  } else if (guardDir == "<") {
    return doLeft(actualPos);
  } else if (guardDir == ">") {
    return doRight(actualPos);
  }
}

function positionExist(positions, pos) {
  for (var i = 0; i < positions.length; i++) {
    if (positions[i].x === pos.x && positions[i].y === pos.y) {
      return true;
    }
  }
  return false;
}

function day6_part1() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  const lines = input.split("\n");

  for (var i = 0; i < lines.length; i++) {
    if (i < lines.length - 1) {
      map.push(lines[i].split("").slice(0, -1));
    } else {
      map.push(lines[i].split(""));
    }
  }

  max_x = map.length;
  max_y = map[0].length;

  let actualPos = getPositionOfGuard();

  let positions = [];

  while (actualPos) {
    if (!positionExist(positions, actualPos)) {
      positions.push(actualPos);
    }

    actualPos = doNextStepOfGuard(actualPos);
  }

  console.log("Posticions Visited: " + positions.length);
}

console.time("execution time");
day6_part1();
console.timeEnd("execution time");
