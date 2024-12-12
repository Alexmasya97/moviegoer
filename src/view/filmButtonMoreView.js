import AbstractView from '../framework/view/abstract-view.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFilmButtonMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

// Клас - он же сам компонент
export default class FilmButtonMoreView extends AbstractView {

  get template() {
    return createFilmButtonMoreTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  };
}
