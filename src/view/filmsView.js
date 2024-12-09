import AbstractView from '../framework/view/abstract-view.js';
// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFilmsViewTemplate = () => '<section class="films"></section>';

// Клас - он же сам компонент
export default class FilmsView extends AbstractView {
  #film;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmsViewTemplate(this.#film);
  }

}
