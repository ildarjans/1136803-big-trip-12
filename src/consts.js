export const MOCK_TRIP_LENGTH = 21;
export const DECSRIPTION_STRING_LIMIT = 5;
export const DECSRIPTION_STRING_MIN = 1;
export const OFFER_LIMIT = 3;
export const DAY_LIMIT_EVENTS = 3;

export const TYPE_PREFIXES = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `at`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

export const TRASNFER_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];

export const ACTIVITY_TYPES = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
  `Brugge`,
  `Dublin`,
  `Munhen`,
  `San-Francicso`,
  `London`,
  `Glazgo`,
  `Copenhagen`,
  `Napoli`,
];

export const OFFERS = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 50
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 80
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 200
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 50
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 40
  },
];

export const DESCRIPTIONS = `\n
Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n
Cras aliquet varius magna, non porta ligula feugiat eget.\n
Fusce tristique felis at fermentum pharetra.\n
Aliquam id orci ut lectus varius viverra.\ Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.\n
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.\n
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.\n
Sed sed nisi sed augue convallis suscipit in sed felis.\n
Aliquam erat volutpat.\n
Nunc fermentum tortor ac porta dapibus.\n
In rutrum ac purus sit amet tempus`.split(`\n`);

export const PHOTOS = [
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`
];

export const EVENT_MESSAGES = {
  EMPTY: `Click New Event to create your first point`
};
