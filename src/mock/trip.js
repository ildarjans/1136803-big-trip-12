import {
  ACTIVITY_TYPES,
  OFFER_TYPES,
  OFFER_TITLES,
  CITIES,
  DESCRIPTIONS,
  DECSRIPTION_STRING_LIMIT,
  DECSRIPTION_STRING_MIN,
  OFFER_GENERATE_LIMIT,
  PHOTOS_LIMIT,
  MOCK_TRIP_LENGTH,
  PRICE_RANGE,
} from '../consts.js';
import {
  getRandomInteger,
  getRandomArrayElements,
  getRandomArrayElement
} from '../utils/common.js';

export function getTripsArray() {
  return (
    Array(MOCK_TRIP_LENGTH)
      .fill()
      .map(genereteMockTrip)
  );
}


function genereteMockTrip() {
  const description = getDestination();
  const point = getPoint();
  const offers = getOffer();
  const offer = getRandomArrayElement(offers);

  Object.assign(point, offer);
  return {
    description,
    offer,
    offers,
    point,
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

function getOffer() {
  return [...OFFER_TYPES, ...ACTIVITY_TYPES]
    .map((type) => {
      const offers = getRandomArrayElements(OFFER_TITLES, getRandomInteger(OFFER_GENERATE_LIMIT))
        .map((title) => {
          return {
            title,
            price: getRandomInteger(PRICE_RANGE.MAX, PRICE_RANGE.MIN)
          };
        });

      return {
        type,
        offers
      };
    });

}

function getPoint() {
  const schedule = createScheduleTimeObject();
  return {
    [`base_price`]: getRandomInteger(9999, 100),
    destination: ``,
    [`date_from`]: schedule.start,
    [`date_to`]: schedule.finish,
    id: generateId(),
    [`is_favorite`]: Boolean(getRandomInteger(1, 0)),
  };
}

function getRandomPhoto() {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
}

function generateId() {
  const a = getRandomInteger(Date.now()).toString(16);
  const b = getRandomInteger(Date.now()).toString(16);
  return `${a}${b}`;
}
