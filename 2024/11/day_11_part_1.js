"use strict";

const NUM_BLINKS = 25;

function day11_part1() {
  const input = "7725 185 2 132869 0 1840437 62 26310";

  let stones = input.split(" ");

  for (let i = 1; i <= NUM_BLINKS; i++) {
    for (let j = 0; j < stones.length; j++) {
      if (stones[j] === "0") {
        stones[j] = "1";
      } else if (stones[j].length % 2 === 0) {
        let newStone = Number(
          stones[j].substring(stones[j].length / 2)
        ).toString();
        stones[j] = Number(
          stones[j].substring(0, stones[j].length / 2)
        ).toString();
        stones.splice(j + 1, 0, newStone);
        j++;
      } else {
        stones[j] = (Number(stones[j]) * 2024).toString();
      }
    }
  }

  console.log(stones.length);
}

console.time("execution time");
day11_part1();
console.timeEnd("execution time");
