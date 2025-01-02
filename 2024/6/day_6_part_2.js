"use strict";

const fs = require("fs");
const path = require("path");

let map = [];

let max_x;
let max_y;

const dirUp = "^";
const dirDown = "v";
const dirLeft = "<";
const dirRight = ">";

const obstruction = "#";
const empty = ".";

const new_obstruction = "O";

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

function doNextStepOfGuard(pos) {
  switch (pos.d) {
    case dirUp:
      return doUp(pos);
    case dirDown:
      return doDown(pos);
    case dirLeft:
      return doLeft(pos);
    case dirRight:
      return doRight(pos);
  }
}

function setNewObstacle(x, y) {
  if (map[x][y] === empty) {
    map[x][y] = new_obstruction;
    return true;
  }
  return false;
}

function copyMatrix(matrix) {
  return matrix.map(function (arr) {
    return arr.slice();
  });
}

function getNumberOfEle(char) {
  let num = 0;
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] == char) {
        num++;
      }
    }
  }
  return num;
}

function posToStr(pos) {
  return pos.x + "-" + pos.y + "-" + pos.d;
}

function day6_part2() {
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
  const initialPos = getPositionOfGuard();

  let loopCount = 0;
  let positions = new Map();
  let posStr;

  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (setNewObstacle(i, j)) {
        actualPos = { x: initialPos.x, y: initialPos.y, d: initialPos.d };

        positions.clear();

        while (actualPos) {
          posStr = posToStr(actualPos);

          if (positions.has(posStr)) {
            break;
          } else {
            positions.set(posStr, true);
          }

          actualPos = doNextStepOfGuard(actualPos);
        }

        if (actualPos) {
          loopCount++;
          map[actualPos.x][actualPos.y] = empty;
        }

        map[initialPos.x][initialPos.y] = dirUp;
        map[i][j] = empty;
      }
    }
  }

  console.log("Loops Number: " + loopCount);
}

console.time("execution time");
day6_part2();
console.timeEnd("execution time");
