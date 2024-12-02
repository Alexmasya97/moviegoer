import dayjs from 'dayjs';
// Функция из интернета по генерации случайного числа из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomFloat(numA, numB, decimals) {
  if (numA === numB) {
    throw Error('Ошибка: не задан диапазон');
  }

  const min = Math.min(numA, numB);
  const max = Math.max(numA, numB);

  if (min < 0) {
    throw Error('Ошибка: значения должны быть положительными');
  }

  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const humanizeDate = (date) => dayjs(date).format('D MMMM');

export {getRandomInteger, getRandomFloat,getRandomArrayElement,humanizeDate};
