// Вспомогательная функция для превращения строки с HTML в DOM-элементы
import {createElement} from '../render.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFilmsViewTemplate = () => '<section class="films"></section>';

// Клас - он же сам компонент
export default class FilmsView {
  constructor(film){
    this.film = film;
  }

  getTemplate() {
    return createFilmsViewTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
