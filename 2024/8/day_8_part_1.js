"use strict";

const fs = require('fs');
const path = require('path');

function day8_part1() {

    const filePath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(filePath, 'utf-8').trim();

    let antinodes = [];

    const lines = input.split("\n");

    const antenasMap = lines.map(line => {
        return line.trim().split('');
    });

    const max_x = antenasMap.length;
    const max_y = antenasMap[0].length;

    let antenas = new Map();

    for (let i = 0; i < antenasMap.length; i++) {
        for (let j = 0; j < antenasMap[i].length; j++) {
            let ele = antenasMap[i][j];
            if ((ele != '.') && (ele != '#')) {

                if (antenas.has(ele)) {
                    let value = antenas.get(ele);
                    value.count = value.count + 1;
                    value.points.push([i, j]);
                } else {
                    antenas.set(ele, { count: 1, points: [[i, j]] });
                }
            }
        }
    }

    let pointStr;

    for (let [key, value] of antenas) {

        if (value.count > 0) {

            for (let i = 0; i < value.points.length; i++) {

                for (let j = i + 1; j < value.points.length; j++) {

                    let pointA = value.points[i];
                    let pointB = value.points[j];

                    let mov1 = [pointA[0] - pointB[0], pointA[1] - pointB[1]];
                    let mov2 = [pointB[0] - pointA[0], pointB[1] - pointA[1]];

                    let newAntinodeA = [pointA[0] + mov1[0], pointA[1] + mov1[1]];
                    let newAntinodeB = [pointB[0] + mov2[0], pointB[1] + mov2[1]];


                    if ((newAntinodeA[0] >= 0) && (newAntinodeA[0] < max_x) && (newAntinodeA[1] >= 0) && (newAntinodeA[1] < max_y)) {
                        pointStr = newAntinodeA[0].toString() + ',' + newAntinodeA[1].toString();
                        if (!antinodes.includes(pointStr)) {
                            antinodes.push(pointStr);
                        }
                    }

                    if ((newAntinodeB[0] >= 0) && (newAntinodeB[0] < max_x) && (newAntinodeB[1] >= 0) && (newAntinodeB[1] < max_y)) {
                        pointStr = newAntinodeB[0].toString() + ',' + newAntinodeB[1].toString();
                        if (!antinodes.includes(pointStr)) {
                            antinodes.push(pointStr);
                        }
                    }

                }

            }

        }

    }

    console.log('Antonide Locations Number: ' + antinodes.length);
}

console.time("execution time");
day8_part1();
console.timeEnd("execution time");