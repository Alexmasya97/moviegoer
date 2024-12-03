// Вспомогательная функция для превращения строки с HTML в DOM-элементы
import {createElement} from '../render.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createSortTemplate = () => ` <ul class="sort">
<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button">Sort by date</a></li>
<li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

// Клас - он же сам компонент
export default class SortView {
  #element = null;
  get template() {
    return createSortTemplate();
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
