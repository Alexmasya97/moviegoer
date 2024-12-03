// Вспомогательная функция для превращения строки с HTML в DOM-элементы
import { createElement } from '../render.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFilmsViewTemplate = () => '<section class="films"></section>';

// Клас - он же сам компонент
export default class FilmsView {
  #film;
  #element = null;
  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmsViewTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
