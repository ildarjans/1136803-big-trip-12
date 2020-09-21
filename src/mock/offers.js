import {
  ACTIVITY_TYPES,
  TRANSPORT_TYPES,
  OFFER_TITLES,
  OFFER_GENERATE_LIMIT,
  PRICE_RANGE,
} from '../consts.js';
import {
  getRandomInteger,
  getRandomArrayElements,
} from '../utils/common.js';

export function getOffers() {
  return [...TRANSPORT_TYPES, ...ACTIVITY_TYPES]
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
