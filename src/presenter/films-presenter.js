import FilmPresenter from './film-presenter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import NavigationView from '../view/NavigationView.js';
import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmDetailsView from '../view/filmDetailsView.js';
// import FilmDetailsFormView from '../view/filmDetailsFormView.js';
import ListEmptyView from '../view/listEmptyView.js';
import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';

export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
  #films;
  #filmPresenter = new Map();
  #selectedFilm;
  #watchlistBtnClickHandler;
  #watchedBtnClickHandler;
  #favouriteBtnClickHandler;
  #allmoviesBtnClickHandler;
  #filmDetailsPresenter;
  #removeFilmDetailsComponent;
  #onEscKeyDown;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(views, filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#initViews();
  }

  #initViews() {
    this.films = new FilmsView();
    this.sort = new SortView();
    this.filmList = new FilmListView();
    this.filmListContainer = new FilmListContainerView();
    this.filmButtonMore = new FilmButtonMoreView();
    this.filmDetails = new FilmDetailsView();
    // this.filmDetailsForm = new FilmDetailsFormView();
    this.listEmpty = new ListEmptyView();
    this.navigation = new NavigationView();
  }

  init(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#renderNavigation();
    this.#renderViews();
    this.#renderFilms();
  }

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #addFilmDetailsComponent = (film) => {
    this.#selectedFilm = film;
    this.#renderFilmDetails();
    document.body.classList.add('hide-overflow');
  };

  #renderNavigation() {
    render(this.navigation, this.#container);
    const allmoviesBtn = this.navigation.element.querySelector('.main-navigation__item[href="#all"]');
    const watchlistBtn = this.navigation.element.querySelector('.main-navigation__item[href="#watchlist"]');
    const watchedBtn = this.navigation.element.querySelector('.main-navigation__item[href="#history"]');
    const favouriteBtn = this.navigation.element.querySelector('.main-navigation__item[href="#favorites"]');
    watchlistBtn.addEventListener('click', this.#watchlistBtnClickHandler);
    watchedBtn.addEventListener('click', this.#watchedBtnClickHandler);
    favouriteBtn.addEventListener('click', this.#favouriteBtnClickHandler);
    allmoviesBtn.addEventListener('click', this.#allmoviesBtnClickHandler);
  }

  #filmButtonMoreClickHandler = () => {
    const films = this.#filmsModel.films;

    films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this.#renderFilm(film, this.filmListContainer);
      });

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= films.length) {
      remove(this.filmButtonMore);
    }

  };

  #renderViews() {
    render(this.sort, this.#container);
    render(this.films, this.#container);
    render(this.filmDetails, this.#container);
    // render(this.filmDetailsForm, this.filmDetails.element);

  }

  #renderFilms() {
    remove(this.filmListContainer);
    this.filmListContainer = new FilmListContainerView();
    render(this.filmListContainer, this.filmList.element);
    const films = this.#filmsModel.films; // Получаем все фильмы из модели

    if (films.length === 0) {
      render(this.listEmpty, this.#container);
      remove(this.sort);
      return;
    }

    render(this.filmList, this.films.element);
    render(this.filmListContainer, this.filmList.element);
    films
      .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
      .forEach((film) => {
        this.#renderFilm(film, this.filmListContainer); // Рендерим каждый фильм
      });

    if (films.length > FILM_COUNT_PER_STEP) {
      render(this.filmButtonMore, this.filmList.element);
      this.filmButtonMore.setClickHandler(this.#filmButtonMoreClickHandler);
    }
  }

  #renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this.#filmChangeHandler, this.#addFilmDetailsComponent);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);

  }

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.getCommentsForFilm(this.#selectedFilm.id)];

    if (!this.#filmDetailsPresenter) {

      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.filmDetails.element,
        this.#filmChangeHandler,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown
      );
    }
    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  }

}
