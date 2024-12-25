import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTemplate = () => '<section class="film-details"></section>';

export default class FilmDetailsView extends AbstractView {

  get template() {
    return createFilmDetailsTemplate();
  }

  setCloseBtnClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
