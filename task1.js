import fs from 'fs';

const conversionRates = {
  m: { ft: 3.28084, cm: 100, in: 39.3701 },
  cm: { m: 0.01, ft: 0.0328084, in: 0.393701 },
  ft: { m: 0.3048, cm: 30.48, in: 12 },
  in: { m: 0.0254, cm: 2.54, ft: 0.0833333 },
};

function loadConversionRules() {
  const data = fs.readFileSync('conversion_rules.json');
  return JSON.parse(data);
}

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

function convertDistance(inputData) {
  const distance = inputData.distance.value;
  const unit = inputData.distance.unit;
  const convertTo = inputData.convert_to;

  if (!conversionRates[unit] || !conversionRates[unit][convertTo]) {
    throw new Error('Неизвестная величина');
  }

  const result = distance * conversionRates[unit][convertTo];
  return {
    unit: convertTo,
    value: Math.round(result * 100) / 100,
  };
}

updateConversionRates();

//-----------------------------------
//Пример использования
const input1 = { distance: { unit: 'm', value: 0.5 }, convert_to: 'ft' };
const input2 = { distance: { unit: 'cm', value: 50 }, convert_to: 'in' };
const input3 = { distance: { unit: 'km', value: 2 }, convert_to: 'm' };

try {
  const result1 = convertDistance(input1);
  console.log(JSON.stringify(result1));

  const result2 = convertDistance(input2);
  console.log(JSON.stringify(result2));

  const result3 = convertDistance(input3);
  console.log(JSON.stringify(result3));
} catch (error) {
  console.error('Error:', error.message);
}
