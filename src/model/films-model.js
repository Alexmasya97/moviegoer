import { generateFilms } from '../mock/films.js';

export default class FilmsModel {
  #films = generateFilms();

  get films () {
    return Array.from(this.#films);
  }
}

