"use strict";

const fs = require("fs");
const { get } = require("http");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();
/*
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
*/
const ROBOT = "@";
const WALL = "#";
const BOX = "O";
const EMPTY = ".";

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

function getNewPosition(pos, move) {
  const [x, y] = pos;
  const [dx, dy] = directions[move];
  return [x + dx, y + dy];
}

function getObjectMap(pos) {
  return map[pos[1]][pos[0]];
}

function day15_part1() {

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
    let move = moves[i];

    nextPos = getNewPosition(posRobot, move);

    if (getObjectMap(nextPos) === WALL) {
      continue;
    }

    let auxPos = nextPos;

    if (getObjectMap(nextPos) === BOX) {
      if (move === "<") {
        for (let j = nextPos[0] - 1; j >= 0; j--) {
          nextPos = getNewPosition(nextPos, move);
          if (getObjectMap(nextPos) === BOX) {
            continue;
          } else if (getObjectMap(nextPos) === WALL) {
            auxPos[0] = auxPos[0] + 1;
            break;
          } else {
            for (let k = auxPos[0] + 1; k > nextPos[0]; k--) {
              if (k === auxPos[0] + 1) {
                map[auxPos[1]][k] = EMPTY;
                map[auxPos[1]][k - 1] = ROBOT;
              } else {
                map[auxPos[1]][k - 1] = BOX;
              }
            }
            break;
          }
        }
      }

      if (move === ">") {
        for (let j = nextPos[0] + 1; j < map.length; j++) {
          nextPos = getNewPosition(nextPos, move);
          if (getObjectMap(nextPos) === BOX) {
            continue;
          } else if (getObjectMap(nextPos) === WALL) {
            auxPos[0] = auxPos[0] - 1;
            break;
          } else {
            for (let k = auxPos[0] - 1; k < nextPos[0]; k++) {
              if (k === auxPos[0] - 1) {
                map[auxPos[1]][k] = EMPTY;
                map[auxPos[1]][k + 1] = ROBOT;
              } else {
                map[auxPos[1]][k + 1] = BOX;
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
            continue;
          } else if (getObjectMap(nextPos) === WALL) {
            auxPos[1] = auxPos[1] + 1;
            break;
          } else {
            for (let k = auxPos[1] + 1; k > nextPos[1]; k--) {
              if (k === auxPos[1] + 1) {
                map[k][auxPos[0]] = EMPTY;
                map[k - 1][auxPos[0]] = ROBOT;
              } else {
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
    } else {
      map[nextPos[1]][nextPos[0]] = ROBOT;
      map[posRobot[1]][posRobot[0]] = EMPTY;
    }

    posRobot = auxPos;
  }

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
day15_part1();
console.timeEnd("execution time");
