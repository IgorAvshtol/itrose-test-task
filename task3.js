function optimizeToMinDistance(sx, sy, sz) {
  const initData = {
    search_points: [],
    bestDistance: Number.MAX_VALUE,
    random_point: { x: 0, y: 0, z: 0 },
    calls: 0,
  };

  //Генерируем случайные координаты для точки r
  let rx = Math.floor(Math.random() * 101);
  let ry = Math.floor(Math.random() * 101);
  let rz = Math.floor(Math.random() * 101);

  while (true) {
    //Вычисляем расстояние между точками s и r
    const distance = Math.sqrt((rx - sx) ** 2 + (ry - sy) ** 2 + (rz - sz) ** 2);

    //Добавляем координаты точки в массив
    initData.search_points.push({ x: rx, y: ry, z: rz });

    //Увеличиваем количество вызовов функции f
    initData.calls++;

    //Если расстояние не уменьшается, прекращаем оптимизацию
    if (distance >= initData.bestDistance) {
      break;
    }

    //Обновляем наименьшее расстояние и координаты точки, если нашли лучшую точку
    initData.bestDistance = distance;
    initData.random_point = { x: rx, y: ry, z: rz };

    //Двигаемся наискорейшим спуском к точке s
    if (rx < sx) {
      rx++;
    } else if (rx > sx) {
      rx--;
    }

    if (ry < sy) {
      ry++;
    } else if (ry > sy) {
      ry--;
    }

    if (rz < sz) {
      rz++;
    } else if (rz > sz) {
      rz--;
    }
  }

  return initData;
}

//-----------------------------------
//Пример использования
const s = { x: 10, y: 10, z: 10 };
const result = optimizeToMinDistance(s.x, s.y, s.z);

console.log('Координаты произвольно сгенерированной точки r(x, y, z):', result.random_point);
console.log('Координаты всех точек, передаваемых в функцию f:', result.search_points);
console.log('Количество вызовов функции f:', result.calls);
