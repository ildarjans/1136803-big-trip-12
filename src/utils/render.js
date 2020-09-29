import AbstractView from '../view/abstract.js';

export function createDOMElement(content) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = content;
  return wrapper.firstChild;
}

export function renderAfterFirstChild(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  const firstChild = container.children[0];
  firstChild.insertAdjacentElement(`afterend`, element);
}

export function renderLastPlaceElement(container, element) {
  container = getAbstractClassDOMElement(container);
  element = getAbstractClassDOMElement(element);
  container.append(element);
}

export function renderBeforeDirectElement(directElement, element) {
  directElement = getAbstractClassDOMElement(directElement);
  element = getAbstractClassDOMElement(element);
  directElement.insertAdjacentElement(`beforebegin`, element);
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

export function replaceDOMElement(newChild, oldChild) {
  newChild = getAbstractClassDOMElement(newChild);
  oldChild = getAbstractClassDOMElement(oldChild);
  const parent = oldChild.parentElement;

  if (!parent || !newChild || !oldChild) {
    throw new Error(`one of elements doesn't set`);
  }

  parent.replaceChild(newChild, oldChild);
}

export function removeElement(element) {
  if (!(element instanceof AbstractView)) {
    throw new Error(`u can remove only instance of Abstract class`);
  }

  element.getElement().remove();
  element.resetElement();
}
