export function createEventItemTemplate(contentCreater) {
  return (
    `<li class="trip-events__item">
    <div class="event">
      ${contentCreater()}
    </div>
  </li>`
  );
}
