// Модуль для обработки данных
const DataProcessor = {
  // Метод для фильтрации данных по заданным условиям
  filterData(data, conditions) {
    let filteredData = data.slice(); // Создаем копию данных для избежания изменения исходного массива

    // Обработка правила exclude
    if (conditions.exclude && conditions.exclude.length > 0) {
      filteredData = filteredData.filter(item => {
        return !conditions.exclude.some(condition => {
          const [key, value] = Object.entries(condition)[0];
          return item[key] === value;
        });
      });
    }

    // Обработка правила include
    if (conditions.include && conditions.include.length > 0) {
      filteredData = filteredData.filter(item => {
        return conditions.include.some(condition => {
          const [key, value] = Object.entries(condition)[0];
          return item[key] === value;
        });
      });
    }

    // Обработка правила sort_by
    if (conditions.sort_by && conditions.sort_by.length > 0) {
      filteredData.sort((a, b) => {
        for (const key of conditions.sort_by) {
          const valA = a[key];
          const valB = b[key];
          if (valA < valB) return -1;
          if (valA > valB) return 1;
        }
        return 0;
      });
    }

    return filteredData;
  }
};

// Входные данные
const inputData = {
  data: [
    { "user": "mike@mail.com", "rating": 20, "disabled": false },
    { "user": "greg@mail.com", "rating": 14, "disabled": false },
    { "user": "john@mail.com", "rating": 25, "disabled": true }
  ],
  condition: {
    exclude: [{ "disabled": true }],
    sort_by: ["rating"]
  }
};

// Обработка данных
const resultData = DataProcessor.filterData(inputData.data, inputData.condition);

// Формирование исходящих данных
const outputData = { result: resultData };

// Вывод результата
console.log(outputData);
