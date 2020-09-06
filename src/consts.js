export const MOCK_TRIP_LENGTH = 21;
export const DECSRIPTION_STRING_LIMIT = 5;
export const DECSRIPTION_STRING_MIN = 1;
export const OFFER_LIMIT = 3;
export const DAY_LIMIT_EVENTS = 3;
export const PRICE_RANGE = {
  MIN: 10,
  MAX: 99
};

export const POINT_TYPE_PREFIXES = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

export const OFFER_TYPES = [
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


export const OFFER_TITLES = [
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `add return ticket options`,
  `add transfer`,
  `add guide`
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
