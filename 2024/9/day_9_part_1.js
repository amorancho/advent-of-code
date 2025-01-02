"use strict";

const fs = require("fs");
const path = require("path");

function day9_part1() {
  const filePath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath, "utf-8").trim();

  //text = '2333133121414131402';

  let charAux;
  let textAux = "";

  for (var i = 0; i < input.length; i++) {
    if (Number(i) % 2 === 0) {
      charAux = i / 2;
    } else {
      charAux = ".";
    }

    for (var j = 0; j < Number(input[i]); j++) {
      textAux += charAux + "$";
    }
  }

  textAux = textAux.substring(0, textAux.length - 1);

  let textArray = textAux.split("$");

  let doContinue = true;
  let changed;

  while (doContinue) {
    changed = false;

    for (var i = 0; i < textArray.length; i++) {
      if (textArray[i] === ".") {
        for (var j = textArray.length - 1; j > i; j--) {
          if (textArray[j] !== ".") {
            textArray[i] = textArray[j];
            textArray.pop();
            changed = true;
            break;
          } else {
            textArray.pop();
          }
        }
      }

      if (changed) {
        break;
      }
    }

    if (!changed) {
      doContinue = false;
    }
  }

  let filesystemChecksum = 0;

  for (var i = 0; i < textArray.length; i++) {
    if (textArray[i] !== ".") {
      filesystemChecksum += i * Number(textArray[i]);
    }
  }

  console.log("Filesystem Checksum: " + filesystemChecksum);
}

console.time("execution time");
day9_part1();
console.timeEnd("execution time");