const DataProcessor = {
  filterData(data, conditions) {
    let filteredData = data.slice();

    //Обработка правила exclude
    if (conditions.exclude && conditions.exclude.length > 0) {
      filteredData = filteredData.filter(item => {
        return !conditions.exclude.some(condition => {
          const [key, value] = Object.entries(condition)[0];
          return item[key] === value;
        });
      });
    }

    //Обработка правила include
    if (conditions.include && conditions.include.length > 0) {
      filteredData = filteredData.filter(item => {
        return conditions.include.some(condition => {
          const [key, value] = Object.entries(condition)[0];
          return item[key] === value;
        });
      });
    }

    //Обработка правила sort_by
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

//-----------------------------------
//Пример использования
const inputData = {
  data: [
    { 'user': 'sasha@tut.by', 'rating': 20, 'disabled': false },
    { 'user': 'pasha@tut.by', 'rating': 14, 'disabled': false },
    { 'user': 'roma@tut.by', 'rating': 25, 'disabled': true }
  ],
  condition: {
    exclude: [{ 'disabled': true }],
    sort_by: ['rating']
  }
};

const resultData = DataProcessor.filterData(inputData.data, inputData.condition);

const outputData = { result: resultData };

console.log(outputData);
