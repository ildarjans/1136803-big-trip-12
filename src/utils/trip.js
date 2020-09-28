export function sortEventsByPrice(a, b) {
  const priceA = a.basePrice;
  const priceB = b.basePrice;

  if (priceA === priceB) {
    return 0;
  }

  return priceA > priceB ? -1 : 1;
}

export function sortEventsByTime(a, b) {
  const eventDurationA = a.dateTo - a.dateFrom;
  const eventDurationB = b.dateTo - b.dateFrom;

  if (eventDurationA === eventDurationB) {
    return 0;
  }

  return eventDurationA > eventDurationB ? -1 : 1;

}

export function sortTripsByDateFrom(a, b) {
  return a.dateFrom.getTime() - b.dateFrom.getTime();
}

