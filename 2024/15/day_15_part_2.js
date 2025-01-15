"use strict";

const fs = require("fs");
const { get } = require("http");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();

input = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const ROBOT = "@";
const WALL = "#";
const BOX = "O";
const EMPTY = ".";
const BOX_LEFT = "[";
const BOX_RIGHT = "]";

var map = [];
var moves = [];
const lines = input.split("\n");

const directions = {
  "^": [0, -1], // up
  "v": [0, 1], // down
  "<": [-1, 0], // left
  ">": [1, 0] // right
};

function printMap() {
  const result = map.map((row) => row.join("")).join("\n");
  console.log(result);
}

function getNewPosition(pos, move, twoTimes = false) {
  const [x, y] = pos;
  const [dx, dy] = directions[move];
  if (twoTimes) {
    return [x + 2 * dx, y + 2 * dy];
  }
  return [x + dx, y + dy];
}

function getObjectMap(pos) {
  return map[pos[1]][pos[0]];
}

function day15_part2() {

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 0) {
      if (lines[i].includes(WALL)) {
        map.push(lines[i].split(""));
      } else {
        moves.push(...lines[i].split(""));
      }
    }
  }

  map = map.map(row => row.filter(element => element !== '\r'));
  moves = moves.filter(element => element !== '\r');

  // changes map
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      switch (map[i][j]) {
        case WALL:
          map[i].splice(j + 1, 0, WALL);
          j++;
          break;
        case BOX:
          map[i][j] = BOX_LEFT;
          map[i].splice(j + 1, 0, BOX_RIGHT);
          j++;
          break;
        case ROBOT:
          map[i].splice(j + 1, 0, EMPTY);
          j++;
          break;
        case EMPTY:
          map[i].splice(j + 1, 0, EMPTY);
          j++;
          break;
      }
    }
  }

  let posRobot;
  let nextPos;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ROBOT) {
        posRobot = [j, i];
        nextPos = [j, i];
      }
    }
  }

  for (let i = 0; i < moves.length; i++) {
    if (i === 4) {break;}
    printMap();
    console.log("move: ", moves[i]);
    console.log("------------------");
    let move = moves[i];

    nextPos = getNewPosition(posRobot, move);

    if (getObjectMap(nextPos) === WALL) {
      continue;
    }

    if (getObjectMap(nextPos) === EMPTY) {
      map[nextPos[1]][nextPos[0]] = ROBOT;
      map[posRobot[1]][posRobot[0]] = EMPTY;
      posRobot = nextPos;
      continue;
    }

    let auxPos = nextPos;

    if (move === "<") {
      for (let j = nextPos[0] - 1; j >= 0; j--) {
        nextPos = getNewPosition(nextPos, move, true);
        if (getObjectMap(nextPos) === BOX_RIGHT) {
          j--;
          continue;
        } else if (getObjectMap(nextPos) === WALL) {
          auxPos[0] = auxPos[0] + 2;
          break;
        } else {
          for (let k = auxPos[0] + 1; k > nextPos[0]; k--) {
            if (k === auxPos[0] + 1) {
              map[auxPos[1]][k] = EMPTY;
              map[auxPos[1]][k - 1] = ROBOT;
            } else {
              map[auxPos[1]][k - 1] = BOX_RIGHT;
              map[auxPos[1]][k - 2] = BOX_LEFT;
              k--;
            }
          }
          break;
        }
      }
    }

    if (move === ">") {
      console.log("Entra en >");
      for (let j = nextPos[0] + 1; j < map.length; j++) {
        nextPos = getNewPosition(nextPos, move, true);
        if (getObjectMap(nextPos) === BOX_LEFT) {
          j++;
          continue;
        } else if (getObjectMap(nextPos) === WALL) {
          auxPos[0] = auxPos[0] - 2;
          break;
        } else {
          for (let k = auxPos[0] - 1; k < nextPos[0]; k++) {
            if (k === auxPos[0] - 1) {
              map[auxPos[1]][k] = EMPTY;
              map[auxPos[1]][k + 1] = ROBOT;
            } else {
              map[auxPos[1]][k + 1] = BOX_LEFT;
              map[auxPos[1]][k + 2] = BOX_RIGHT;
              k++;
            }
          }
          break;
        }
      }
    }

    if (move === "^") {
      for (let j = nextPos[1] - 1; j >= 0; j--) {
        nextPos = getNewPosition(nextPos, move);
        if (getObjectMap(nextPos) === BOX) {
          j--;
          continue;
        } else if (getObjectMap(nextPos) === WALL) {
          auxPos[1] = auxPos[1] + 2;
          break;
        } else {
          for (let k = auxPos[1] + 1; k > nextPos[1]; k--) {
            if (k === auxPos[1] + 1) {
              map[k][auxPos[0]] = EMPTY;
              map[k - 1][auxPos[0]] = ROBOT;
            } else {
              map[k - 1][auxPos[0]] = BOX_LEFT;
              map[k - 1][auxPos[0]] = BOX;
            }
          }
          break;
        }
      }
    }

    if (move === "v") {
      for (let j = nextPos[1] + 1; j < map.length; j++) {
        nextPos = getNewPosition(nextPos, move);
        if (getObjectMap(nextPos) === BOX) {
          continue;
        } else if (getObjectMap(nextPos) === WALL) {
          auxPos[1] = auxPos[1] - 1;
          break;
        } else {
          for (let k = auxPos[1] - 1; k < nextPos[1]; k++) {
            if (k === auxPos[1] - 1) {
              map[k][auxPos[0]] = EMPTY;
              map[k + 1][auxPos[0]] = ROBOT;
            } else {
              map[k + 1][auxPos[0]] = BOX;
            }
          }
          break;
        }
      }
    }

    posRobot = auxPos;    
    
  }    

  printMap();

  let sumGPSCoordinates = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === BOX) {
        sumGPSCoordinates +=  100 * i + j;
      }
    }
  }

  console.log(sumGPSCoordinates);

}

console.time("execution time");
day15_part2();
console.timeEnd("execution time");
