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

export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

