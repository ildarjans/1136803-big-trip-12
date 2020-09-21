import {TRANSPORT_TYPES, ACTIVITY_TYPES} from '../consts.js';
import {getEventDurationInHours} from './date.js';

const reducers = {
  rubles: (state, item) {
    return (state.rubles += item.price);
  },
  dollars: (state, item) {
    return (state.dollars += item.price / 71.6024);
  },
  euros: (state, item) {
    return (state.euros += item.price / 79.0133);
  },
  yens: (state, item) {
    return (state.yens += item.price / 0.6341);
  },
  pounds: (state, item) {
    return (state.pounds += item.price / 101.7829);
  },
};