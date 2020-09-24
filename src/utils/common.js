export function getRandomInteger(max, min = 0) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function getRandomArrayElements(arr, count) {
  if (arr.length < count) {
    return undefined;
  }
  const resultArray = [];
  while (resultArray.length < count) {
    const randElement = arr[getRandomInteger(arr.length - 1)];
    if (!resultArray.includes(randElement)) {
      resultArray.push(randElement);
    }
  }
  return resultArray;
}

export function getRandomArrayElement(arr) {
  if (!arr && arr.length === 0) {
    return undefined;
  }
  return arr[getRandomInteger(arr.length - 1)];
}

export function generateId() {
  const a = getRandomInteger(Date.now()).toString(16);
  const b = getRandomInteger(Date.now()).toString(16);
  return `${a}${b}`;
}
