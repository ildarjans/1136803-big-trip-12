export const MOCK_TRIP_LENGTH = 21;
export const DECSRIPTION_STRING_LIMIT = 5;
export const DECSRIPTION_STRING_MIN = 1;
export const OFFER_GENERATE_LIMIT = 6;
export const OFFER_ITEM_VIEW_LIMIT = 3;
export const PHOTOS_LIMIT = 3;
export const DAY_LIMIT_EVENTS = 3;
export const FLATPICKR = {
  FORM_DATE_FORMAT: `d/m/y H:i`
};

export const MOMENT = {
  FORM_DATE_FORMAT: `DD/MM/YY HH:mm`
};

export const PRICE_RANGE = {
  MIN: 10,
  MAX: 199
};
export const PointMode = {
  DEFAULT: `DEFAULT`,
  EDIT: `EDIT`
};

export const MenuTabs = {
  STATS: `Stats`,
  TABLE: `Table`,
};

export const TAB_ACTIVE_CLASS = `trip-tabs__btn--active`;


export const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`,
};

export const UserAction = {
  ADD_POINT: `ADD_POINT`,
  UPDATE_POINT: `UPDATE_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const POINT_TYPE_PREFIXES = {
  'taxi': `to`,
  'bus': `to`,
  'train': `to`,
  'ship': `to`,
  'transport': `to`,
  'drive': `to`,
  'flight': `to`,
  'check-in': `in`,
  'sightseeing': `in`,
  'restaurant': `in`,
};

export const TRANSPORT_TYPES = [
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
  `Upgrade to a business class`,
  `Choose the radio station`,
  `Add luggage`,
  `Add meal`,
  `Choose seats`,
  `add return ticket options`,
  `add transfer`,
  `add guide`,
  `Choose live music`,
  `Order a breakfast`,
  `Book a taxi at the arrival point`,
  `Drive quickly, I'm in a hurry`,
  `Choose the radio station`,
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

export const EVENT_MESSAGES = {
  EMPTY: `Click New Event to create your first point`
};

export const BLANK_EVENT = {
  point: {
    basePrice: 0,
    destination: {
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      name: `Chamonix`,
      pictures: [],
    },
    dateFrom: new Date(),
    dateTo: new Date(),
    isFavorite: false,
    offers: [],
    type: `Train`
  },
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const successHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export const Url = {
  SERVER: `https://12.ecmascript.pages.academy/big-trip/`,
  OFFERS: `offers`,
  POINTS: `points`,
  DESTINATIONS: `destinations`
};

export const AUTORIZATION_KEY = `Basic dfcby1gegjr2ektntk3d4rjcvjvc`;
