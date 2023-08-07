function findDistance(s, r) {
  const dx = s.x - r.x;
  const dy = s.y - r.y;
  const dz = s.z - r.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findRandomPoint() {
  const maxRange = 100;
  let currentPoint = { x: getRandomInt(maxRange), y: getRandomInt(maxRange), z: getRandomInt(maxRange) };
  let iterations = 1;

  while (iterations <= 100) {
    const step = Math.floor(maxRange / 2 / iterations);
    let bestDistance = findDistance(currentPoint, currentPoint);
    let bestPoint = currentPoint;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const newPoint = {
            x: currentPoint.x + dx * step,
            y: currentPoint.y + dy * step,
            z: currentPoint.z + dz * step,
          };
          const newDistance = findDistance(newPoint, newPoint);

          if (newDistance < bestDistance) {
            bestDistance = newDistance;
            bestPoint = newPoint;
          }
        }
      }
    }

    if (bestDistance >= findDistance(currentPoint, currentPoint)) {
      break;
    }

    currentPoint = bestPoint;
    iterations++;
  }
  return { random_point: currentPoint, search_points: iterations, calls: iterations };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

findRandomPoint()


function testDistance() {
  const point1 = { x: 0, y: 0, z: 0 };
  const point2 = { x: 0, y: 0, z: 5 };
  const point3 = { x: -2, y: 1, z: -3 };

  console.log(findDistance(point1, point1)); // Расстояние между одной и той же точкой равно 0
  console.log(findDistance(point1, point2)); // Расстояние между (0, 0, 0) и (3, 4, 5) равно 7.0710678118655...
  console.log(findDistance(point1, point3)); // Расстояние между (0, 0, 0) и (-2, 1, -3) равно 3.7416573867739...
}

testDistance();

