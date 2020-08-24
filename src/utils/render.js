import AbstractView from '../view/abstract.js';

export function createDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;
  return wrapper.firstChild;
}

export function renderLastPlaceElement(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  container.append(element);
}

export function renderFirstPlaceElement(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  container.prepend(element);
}

export function getAbstractClassDOMElement(element) {
  return element instanceof AbstractView ?
    element.getElement() :
    element;
}
