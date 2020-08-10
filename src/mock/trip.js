import {
  TRIP_POINTS,
  CITIES,
  OFFERS,
  PLACE_DESCRIPTIONS,
  PHOTOS,
  DECSRIPTION_STRING_LIMIT,
  OFFER_LIMIT
} from '../consts.js';

import {getRandomInteger, getRandomArrayElements} from '../utils.js';

export function genereteMockTrips() {
  return {
    tripPoint: TRIP_POINTS[getRandomInteger(TRIP_POINTS.length - 1)],
    city: CITIES[getRandomInteger(CITIES.length - 1)],
    offers: getRandomArrayElements(OFFERS, getRandomInteger(OFFER_LIMIT)),
    description: getRandomArrayElements(PLACE_DESCRIPTIONS, getRandomInteger(DECSRIPTION_STRING_LIMIT)),
    photos: PHOTOS.slice(getRandomInteger(PHOTOS.length - 1))
  };
}
