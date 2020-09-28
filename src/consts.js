export const OFFER_ITEM_VIEW_LIMIT = 3;
export const FORM_FLATPICKR_DATE_FORMAT = `d/m/y H:i`;
export const TAB_ACTIVE_CLASS = `trip-tabs__btn--active`;
export const FORM_MOMENT_DATE_FORMAT = `DD/MM/YY HH:mm`;
export const AUTORIZATION_KEY = `Basic dfcby1gegjr2ektntk3d4rjcvjvc`;
export const EVENT_EMPTY_MESSAGES = `Click New Event to create your first point`;
export const SHAKE_ANIMATION_TIMEOUT = 600;
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

export const BLANK_EVENT = {
  basePrice: 0,
  destination: {
    description: ``,
    name: ``,
    pictures: [],
  },
  dateFrom: new Date(),
  dateTo: new Date(),
  isFavorite: false,
  offers: [],
  type: `train`
};

export const TimeUnitInMs = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
};

export const PointMode = {
  DEFAULT: `DEFAULT`,
  EDIT: `EDIT`
};

export const MenuTabs = {
  STATS: `Stats`,
  TABLE: `Table`,
};

export const FormState = {
  ABORTING: `ABORTING`,
  DELETING: `DELETING`,
  FAVORITING: `FAVORITING`,
  SAVING: `SAVING`,
};

export const FormType = {
  EDIT: `EDIT`,
  NEW: `NEW`
};

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

