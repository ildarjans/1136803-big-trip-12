import {
  TRASNFER_TYPES,
  ACTIVITY_TYPES,
  CITIES,
  OFFERS,
  DESCRIPTIONS,
  PHOTOS,
  DECSRIPTION_STRING_LIMIT,
  DECSRIPTION_STRING_MIN,
  OFFER_LIMIT,
} from '../consts.js';

import {getRandomInteger, getRandomArrayElements} from '../utils/common.js';

const allEventTypes = [...TRASNFER_TYPES, ...ACTIVITY_TYPES];

export function genereteMockTrips() {
  const description = getRandomArrayElements(
      DESCRIPTIONS,
      getRandomInteger(DECSRIPTION_STRING_LIMIT, DECSRIPTION_STRING_MIN)
  ).join(``);
  return {
    type: allEventTypes[getRandomInteger(allEventTypes.length - 1)],
    city: CITIES[getRandomInteger(CITIES.length - 1)],
    schedule: createScheduleTimeObject(),
    price: getRandomInteger(100),
    offers: getRandomArrayElements(OFFERS, getRandomInteger(OFFER_LIMIT)),
    description,
    photos: PHOTOS.slice(getRandomInteger(PHOTOS.length - 1))
  };
}

function createScheduleTimeObject() {
  const shift1 = getRandomInteger(Math.pow(10, 9));
  const shift2 = getRandomInteger(Math.pow(10, 7));
  const start = new Date(Date.now() + shift1);
  const finish = new Date(start.valueOf() + shift2);
  return {
    start,
    finish,
  };
}
