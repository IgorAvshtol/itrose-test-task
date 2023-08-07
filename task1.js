import fs from 'fs'

// Загрузка правил конвертации из JSON-файла
function loadConversionRules() {
  const data = fs.readFileSync("conversion_rules.json");
  return JSON.parse(data);
}

// Обновление таблицы конвертации
function updateConversionRates() {
  const conversionRules = loadConversionRules();
  for (const unit in conversionRules) {
    if (!conversionRates[unit]) {
      conversionRates[unit] = {};
    }
    for (const targetUnit in conversionRules[unit]) {
      conversionRates[unit][targetUnit] = conversionRules[unit][targetUnit];
    }
  }
}
// Соотношение конвертации между единицами
const conversionRates = {
  m: { ft: 3.28084, cm: 100, in: 39.3701 },
  cm: { m: 0.01, ft: 0.0328084, in: 0.393701 },
  ft: { m: 0.3048, cm: 30.48, in: 12 },
  in: { m: 0.0254, cm: 2.54, ft: 0.0833333 },
};

// Функция для выполнения конвертации
function convertDistance(inputData) {
  const distance = inputData.distance.value;
  const unit = inputData.distance.unit;
  const convertTo = inputData.convert_to;

  // Проверка наличия соответствующих единиц в таблице конвертации
  if (!conversionRates[unit] || !conversionRates[unit][convertTo]) {
    throw new Error("Unsupported units for conversion");
  }

  // Выполнение конвертации
  const result = distance * conversionRates[unit][convertTo];
  return {
    unit: convertTo,
    value: Math.round(result * 100) / 100, // Округление до сотых
  };
}

updateConversionRates();

// Пример использования
const input1 = { distance: { unit: "m", value: 0.5 }, convert_to: "ft" };
const input2 = { distance: { unit: "cm", value: 50 }, convert_to: "in" };
const input3 = { distance: { unit: "km", value: 2 }, convert_to: "m" };

try {
  const result1 = convertDistance(input1);
  console.log(JSON.stringify(result1));

  const result2 = convertDistance(input2);
  console.log(JSON.stringify(result2));

  const result3 = convertDistance(input3);
  console.log(JSON.stringify(result3));
} catch (error) {
  console.error("Error:", error.message);
}
