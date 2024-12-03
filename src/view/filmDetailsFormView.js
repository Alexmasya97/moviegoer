import {createElement} from '../render.js';

const createFilmDetailsFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

export default class FilmDetailsFormView {
  #element = null;
  get template() {
    return createFilmDetailsFormTemplate();
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
