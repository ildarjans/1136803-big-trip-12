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

export function replaceDOMElement(newChild, oldСhild) {
  const parent = newChild.parentElement;

  if (!parent || !newChild || !newChild) {
    throw new Error(`one of elements doesn't set`);
  }

  newChild = getAbstractClassDOMElement(newChild);
  oldСhild = getAbstractClassDOMElement(oldСhild);
  parent.replaceChild(newChild, oldСhild);
}

export function removeElement(element) {
  if (!(element instanceof AbstractView)) {
    throw new Error(`u can remove only instance of Abstract class`);
  }

  element.getElement().remove();
  element.resetElement();
}
