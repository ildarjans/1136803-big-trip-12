export function render(container, content, place = `beforeend`) {
  container.insertAdjacentHTML(place, content);
}

export function createDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;
  return wrapper.firstChild;
}

export function renderElement(container, element, place = `beforeend`) {
  switch (place) {
    case (`beforeend`):
      container.append(element);
      break;
    case (`afterbegin`):
      container.prepend(element);
      break;
  }
}
