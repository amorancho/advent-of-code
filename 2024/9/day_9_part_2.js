"use strict";

const fs = require("fs");
const path = require("path");

function day9_part2() {
  const filePath = path.join(__dirname, "input.txt");
  let input = fs.readFileSync(filePath, "utf-8").trim();

  //input = "2333133121414131402";

  let charAux;

  let allNumbers = [];
  let allSpaces = [];
  let disk = [];

  for (let i = 0; i < input.length; i++) {
    if (Number(i) % 2 === 0) {
      charAux = i / 2;
    } else {
      charAux = -1;
    }

    for (let j = 0; j < Number(input[i]); j++) {
      disk.push(charAux);
    }
    let positions = Number(input[i]);
    if (charAux !== -1) {
      allNumbers.push({
        number: charAux,
        start: disk.length - positions,
        count: positions,
      });
    } else {
      allSpaces.push({
        start: disk.length - positions,
        count: positions,
      });
    }
  }

  while (true) {
    let objNumbers = allNumbers.pop();

    for (let i = 0; i < allSpaces.length; i++) {
      if (
        allSpaces[i].count >= objNumbers.count &&
        allSpaces[i].start <= objNumbers.start
      ) {

        for (let j = 0; j < objNumbers.count; j++) {
          disk[objNumbers.start + j] = -1;
          disk[allSpaces[i].start + j] = objNumbers.number;
        }
        allSpaces[i].count -= objNumbers.count;
        allSpaces[i].start += objNumbers.count;

        break;
      }
    }

    if (allNumbers.length === 0) {
      break;
    }
  }

  let filesystemChecksum = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== -1) {
      filesystemChecksum += i * disk[i];
    }
  }

  console.log("Filesystem Checksum: " + filesystemChecksum);
}

console.time("execution time");
day9_part2();
console.timeEnd("execution time");
