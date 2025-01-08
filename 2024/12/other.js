function calculateRegions(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, -1], // left
      [0, 1]   // right
  ];

  function isValid(x, y) {
      return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function bfs(startX, startY, plantType) {
      const queue = [[startX, startY]];
      visited[startX][startY] = true;
      let area = 0;
      let perimeter = 0;
      let sides = 0;

      while (queue.length > 0) {
          const [x, y] = queue.shift();
          area++;

          // Count all four sides of the current cell as part of its region
          sides += 4;

          for (const [dx, dy] of directions) {
              const nx = x + dx;
              const ny = y + dy;

              if (isValid(nx, ny) && grid[nx][ny] === plantType) {
                  sides--; // Shared side with neighboring cell in the same region
                  if (!visited[nx][ny]) {
                      visited[nx][ny] = true;
                      queue.push([nx, ny]);
                  }
              } else if (!isValid(nx, ny) || grid[nx][ny] !== plantType) {
                  perimeter++; // Exposed edge of the cell
              }
          }
      }

      return { area, sides, perimeter };
  }

  const results = {};
  let totalPrice = 0;

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (!visited[i][j]) {
              const plantType = grid[i][j];
              const { area, sides } = bfs(i, j, plantType);

              const price = area * sides; // New pricing based on sides
              totalPrice += price;

              if (!results[plantType]) {
                  results[plantType] = [];
              }
              results[plantType].push({ area, sides, price });
          }
      }
  }

  return { results, totalPrice };
}

// Example usage:
/*
const gardenMap = [
  ["A", "A", "A", "A"],
  ["B", "B", "C", "D"],
  ["B", "B", "C", "C"],
  ["E", "E", "E", "C"]
];
*/
input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

let map = input.split("\n").map((line) => line.trim().split(""));

const regions = calculateRegions(map);
for (const [plant, metrics] of Object.entries(regions)) {
  console.log(`Plant type ${plant}:`, metrics);
}
