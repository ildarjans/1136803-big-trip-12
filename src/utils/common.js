export function getRandomInteger(max, min = 0) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function getRandomArrayElements(arr, count) {
  if (arr.length < count) {
    return undefined;
  }
  const results = [];
  while (results.length < count) {
    const randElement = arr[getRandomInteger(arr.length - 1)];
    if (!results.includes(randElement)) {
      results.push(randElement);
    }
  }
  return results;
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

