// Вспомогательная функция для превращения строки с HTML в DOM-элементы
import {createElement} from '../render.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFilmButtonMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

// Клас - он же сам компонент
export default class FilmButtonMoreView {
  #element = null;
  get template() {
    return createFilmButtonMoreTemplate();
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
