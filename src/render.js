const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (component, container, place = RenderPosition.BEFOREEND) => {
  if (component && component.element) {
    container.insertAdjacentElement(place, component.element);
  } else {
    throw('Component or component.element is null or undefined:', component);
  }
};

export {RenderPosition, createElement, render};
