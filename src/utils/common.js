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
