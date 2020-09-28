export function sortPointByPrice(a, b) {
  const priceA = a.basePrice;
  const priceB = b.basePrice;

  return priceB - priceA;
}

export function sortPointsByDurationTime(pointA, pointB) {
  const durationA = pointA.dateTo - pointA.dateFrom;
  const durationB = pointB.dateTo - pointB.dateFrom;

  return durationB - durationA;
}

export function sortPointByDateFrom(pointA, pointB) {
  return pointA.dateFrom.getTime() - pointB.dateFrom.getTime();
}

export function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

