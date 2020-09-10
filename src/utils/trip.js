export function sortEventsByPrice(a, b) {
  const priceA = a.point[`base_price`];
  const priceB = b.point[`base_price`];

  if (priceA === priceB) {
    return 0;
  }

  return priceA > priceB ? 1 : -1;
}

export function sortEventsByTime(a, b) {
  const tripDurationA = a.point[`date_to`] - a.point[`date_from`];
  const tripDurationB = b.point[`date_to`] - b.point[`date_from`];

  if (tripDurationA === tripDurationB) {
    return 0;
  }

  return tripDurationA > tripDurationB ? 1 : -1;

}

export function sortTripsByDate(a, b) {
  return (
    a.point.date_from.valueOf() >
    b.point.date_to.valueOf() ?
      1 : -1
  );
}
