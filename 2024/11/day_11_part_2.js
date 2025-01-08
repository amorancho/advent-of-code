"use strict";

const NUM_BLINKS = 75;

function divideStones(stones) {
  let newHashStones = {};

  for (let stone in stones) {
    let val1;
    let val2;

    if (stone === "0") {
      val1 = "1";
    } else if (stone.length % 2 === 0) {
      val1 = Number(stone.substring(stone.length / 2)).toString();
      val2 = Number(stone.substring(0, stone.length / 2)).toString();
    } else {
      val1 = (Number(stone) * 2024).toString();
    }
    if (val1 in newHashStones) {
      newHashStones[val1] += stones[stone];
    } else {
      newHashStones[val1] = stones[stone];
    }
    if (val2) {
      if (val2 in newHashStones) {
        newHashStones[val2] += stones[stone];
      } else {
        newHashStones[val2] = stones[stone];
      }
    }
  }

  return newHashStones;
}

function day11_part2() {
  const input = "7725 185 2 132869 0 1840437 62 26310";

  let stones = input.split(" ");

  let hashStones = {};

  for (let i = 0; i < stones.length; i++) {
    hashStones[stones[i]] = 1;
  }

  for (let i = 1; i <= NUM_BLINKS; i++) {
    console.log(i);
    hashStones = divideStones(hashStones);
  }

  let totalStones = 0;

  Object.values(hashStones).forEach((valor) => {
    totalStones += valor;
  });

  console.log(totalStones);
}

console.time("execution time");
day11_part2();
console.timeEnd("execution time");
