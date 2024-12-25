import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

export default class FilmDetailsFormView extends AbstractView {

  get template() {
    return createFilmDetailsFormTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
