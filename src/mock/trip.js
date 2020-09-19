import {
  CITIES,
  DESCRIPTIONS,
  DECSRIPTION_STRING_LIMIT,
  DECSRIPTION_STRING_MIN,
  PHOTOS_LIMIT,
  MOCK_TRIP_LENGTH,
  OFFER_TYPES,
  ACTIVITY_TYPES
} from '../consts.js';
import {
  getRandomInteger,
  getRandomArrayElements,
  getRandomArrayElement
} from '../utils/common.js';

import {getOffers} from './offers.js';

export function getTripsArray() {
  return (
    Array(MOCK_TRIP_LENGTH)
      .fill()
      .map(genereteMockTrip)
  );
}


function genereteMockTrip() {
  const offers = getOffers();
  const point = getPoint(offers);
  return {
    offers,
    point,
  };
}

function createScheduleTimeObject() {
  const shift1 = getRandomInteger(Math.pow(10, 9));
  const shift2 = getRandomInteger(Math.pow(10, 7));
  const start = new Date(Date.now() + shift1 * (shift1 % 2 ? 1 : -1));
  const finish = new Date(start.valueOf() + shift2);
  return {
    start,
    finish,
  };
}

function getDestination() {
  const description = getRandomArrayElements(
      DESCRIPTIONS,
      getRandomInteger(DECSRIPTION_STRING_LIMIT, DECSRIPTION_STRING_MIN)
  ).join(``);

  const pictures = Array(getRandomInteger(PHOTOS_LIMIT))
    .fill()
    .map(() => {
      return {
        src: getRandomPhoto(),
        description
      };
    });

  return {
    description,
    name: getRandomArrayElement(CITIES),
    pictures,
  };
}

function getPoint(allOffers) {
  const schedule = createScheduleTimeObject();
  const type = getRandomArrayElement([...OFFER_TYPES, ...ACTIVITY_TYPES]);
  const offersByType = allOffers.filter((offer) => offer.type === type)[0];
  return {
    [`base_price`]: getRandomInteger(9999, 100),
    destination: getDestination(),
    [`date_from`]: schedule.start,
    [`date_to`]: schedule.finish,
    id: generateId(),
    offers: getRandomArrayElements(offersByType.offers, getRandomInteger(offersByType.offers.length)),
    [`is_favorite`]: Boolean(getRandomInteger(1, 0)),
    type,
  };
}

function getRandomPhoto() {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
}

export function generateId() {
  const a = getRandomInteger(Date.now()).toString(16);
  const b = getRandomInteger(Date.now()).toString(16);
  return `${a}${b}`;
}
