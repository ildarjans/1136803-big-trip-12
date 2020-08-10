const MOCK_TRIP_LENGTH = 20;
const DECSRIPTION_STRING_LIMIT = 5;
const OFFER_LIMIT = 5;
const DAY_LIMIT_EVENTS = 3;

const TRIP_POINTS = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check`,
  `Sightseeing`,
  `Restaurant`
];

const CITIES = [
  `Brugge`,
  `Dublin`,
  `Munhen`,
  `San-Francicso`,
  `London`,
  `Glazgo`,
  `Copenhagen`,
  `Napoli`,
];

const OFFERS = [
  {
    type: `order Uder`,
    price: 20
  },
  {
    type: `add luggage`,
    price: 50
  },
  {
    type: `switch to comfort`,
    price: 80
  },
  {
    type: `rent a car`,
    price: 200
  },
  {
    type: `add breakfast`,
    price: 50
  },
  {
    type: `book tickets`,
    price: 40
  },
];

const PLACE_DESCRIPTIONS = `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
Cras aliquet varius magna, non porta ligula feugiat eget.\
Fusce tristique felis at fermentum pharetra.\
Aliquam id orci ut lectus varius viverra.\ Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.\
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.\
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.\
Sed sed nisi sed augue convallis suscipit in sed felis.\
Aliquam erat volutpat.\
Nunc fermentum tortor ac porta dapibus.\
In rutrum ac purus sit amet tempus`.split(`.`);

const PHOTOS = [
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`
];

export {
  MOCK_TRIP_LENGTH,
  TRIP_POINTS,
  CITIES,
  OFFERS,
  PLACE_DESCRIPTIONS,
  PHOTOS,
  DECSRIPTION_STRING_LIMIT,
  DAY_LIMIT_EVENTS,
  OFFER_LIMIT,
};
