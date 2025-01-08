"use strict";

const fs = require("fs");
const { get } = require("http");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath, "utf-8").trim();
/*
input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
*/
const clawsMachineLines = input.split("\n");
const clawsMachoneMap = [];

function getNumberOfTokens(clawsMachine) {
  let minTokens = 9999999999999999999999;
  for (let x = 1; x < 100; x++) {
    for (let y = 1; y < 100; y++) {
      if (
        clawsMachine.buttonA[0] * x + clawsMachine.buttonB[0] * y ==
          clawsMachine.prize[0] &&
        clawsMachine.buttonA[1] * x + clawsMachine.buttonB[1] * y ==
          clawsMachine.prize[1]
      ) {
        let tokens = x * 3 + y;
        if (tokens < minTokens) {
          minTokens = tokens;
        }
      }
    }
  }

  if (minTokens == 9999999999999999999999) {
    return 0;
  }
  return minTokens;
}

function day13_part1() {
  for (let i = 0; i < clawsMachineLines.length; i++) {
    let buttonA_X = clawsMachineLines[i].substring(
      12,
      clawsMachineLines[i].indexOf(",")
    );
    let buttonA_Y = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y+") + 2
    );

    i++;

    let buttonB_X = clawsMachineLines[i].substring(
      12,
      clawsMachineLines[i].indexOf(",")
    );
    let buttonB_Y = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y+") + 2
    );

    i++;

    let prizeX = clawsMachineLines[i].substring(
      9,
      clawsMachineLines[i].indexOf(",")
    );
    let prizeY = clawsMachineLines[i].substring(
      clawsMachineLines[i].indexOf("Y=") + 2
    );

    i++;

    clawsMachoneMap.push({
      buttonA: [buttonA_X, buttonA_Y],
      buttonB: [buttonB_X, buttonB_Y],
      prize: [prizeX, prizeY],
    });
  }

  let numberOfTokens = 0;

  for (let i = 0; i < clawsMachoneMap.length; i++) {
    numberOfTokens += getNumberOfTokens(clawsMachoneMap[i]);
  }

  console.log("numberOfTokens: ", numberOfTokens);
}

console.time("execution time");
day13_part1();
console.timeEnd("execution time");
