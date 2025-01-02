"use strict";

const fs = require("fs");
const path = require("path");

const pageRules = [];

function isValid(a, b) {
  let result = true;
  for (var i = 0; i < pageRules.length; i++) {
    if (pageRules[i][0] === b && pageRules[i][1] === a) {
      result = false;
    }
  }
  return result;
}

function isInRightOrder(array) {
  let result = true;

  for (var i = 0; i < array.length; i++) {
    // left side
    for (var l = 0; l < i; l++) {
      if (!isValid(array[l], array[i])) {
        result = false;
      }
    }

    if (result) {
      // right side
      for (var r = i + 1; r < array.length; r++) {
        if (!isValid(array[i], array[r])) {
          result = false;
        }
      }
    }
  }

  return result;
}

function getMiddleValue(array) {
  let index = (array.length + 1) / 2;

  return array[index - 1];
}

function setCorrectOrder(array) {
  for (var i = 0; i < pageRules.length; i++) {
    if (pageRules[i].every((elemento) => array.includes(elemento))) {
      let correctOrder = false;

      for (var j = 0; j < array.length; j++) {
        if (array[j] === pageRules[i][0]) {
          for (var k = j + 1; k < array.length; k++) {
            if (array[k] === pageRules[i][1]) {
              correctOrder = true;
            }
          }
        }
      }

      let indA = array.indexOf(pageRules[i][0]);
      let indB = array.indexOf(pageRules[i][1]);

      if (!correctOrder) {
        array[indB] = pageRules[i][0];
        array[indA] = pageRules[i][1];

        setCorrectOrder(array);
      }
    }
  }

  return array;
}

function day5_part2() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  const lines = input.split("\n");

  let separatorFound = false;

  const pageUpdates = [];

  let middleValues = [];

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length < 5) {
      separatorFound = true;
    } else {
      if (!separatorFound) {
        pageRules.push(lines[i].split("|").map(Number));
      } else {
        pageUpdates.push(lines[i].split(",").map(Number));
      }
    }
  }

  for (var i = 0; i < pageUpdates.length; i++) {
    if (!isInRightOrder(pageUpdates[i])) {
      let arrayCorrectOrder = setCorrectOrder(pageUpdates[i]);
      middleValues.push(getMiddleValue(arrayCorrectOrder));
    }
  }

  let totalMidPageNum = middleValues.reduce((a, b) => a + b, 0);

  console.log("Total Middle Page Number: " + totalMidPageNum);
}

console.time("execution time");
day5_part2();
console.timeEnd("execution time");
