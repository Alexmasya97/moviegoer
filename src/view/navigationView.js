// import { generateFilms } from '../mock/films.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNavigationTemplate = (films) => {
  if (!films) {
   console.log(`хуй`);
  }
  const watchListCount = films.filter(film => film.userDetails.watchList).length;
  const watchedCount = films.filter(film => film.userDetails.alreadyWatched).length;
  const favouriteCount = films.filter(film => film.userDetails.favourite).length;

  return (`
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favouriteCount}</span></a>
    </nav>
  `);
}

export default class NavigationView extends AbstractView  {
  #films;
  constructor(films) {
    super();
    this.#films = films;
  }
  get template() {
    return createNavigationTemplate(this.#films);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
