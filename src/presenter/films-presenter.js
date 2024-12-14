import NavigationView from '../view/NavigationView.js';
import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmCardView from '../view/filmCardView.js';
import FilmDetailsView from '../view/filmDetailsView.js';
import FilmDetailsFormView from '../view/filmDetailsFormView.js';
import FilmDetailsTopContainerView from '../view/filmDetailsTopContainer.js';
import FilmDetailsBottomContainerView from '../view/filmDetailsBottomContainer.js';
import ListEmptyView from '../view/listEmptyView.js';
import { FILM_COUNT_PER_STEP } from '../const.js';
import { render, remove } from '../framework/render.js';

export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
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
    this.filmDetailsForm = new FilmDetailsFormView();
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

  #allmoviesBtnClickHandler = () => this.#renderFilms();

  #watchlistBtnClickHandler = () => this.#handleFilterClick('watchList');

  #watchedBtnClickHandler = () => this.#handleFilterClick('alreadyWatched');

  #favouriteBtnClickHandler = () => this.#handleFilterClick('favourite');

  #handleFilterClick = (filterProperty) => {
    remove(this.filmListContainer);
    this.filmListContainer = new FilmListContainerView();
    render(this.filmListContainer, this.filmList.element);

    const films = this.#filmsModel.films;
    const filteredFilms = films.filter((film) => film.userDetails[filterProperty] === true);

    this.#renderFilteredFilms(filteredFilms);
  };

  #renderFilteredFilms = (filteredFilms) => {
    if (filteredFilms.length === 0) {
      render(this.listEmpty, this.filmList.element);
      return;
    }

    filteredFilms
      .slice(0, Math.min(filteredFilms.length, FILM_COUNT_PER_STEP))
      .forEach((film) => {
        this.#renderFilm(film, this.filmListContainer);
      });

    if (filteredFilms.length > FILM_COUNT_PER_STEP) {
      render(this.filmButtonMore, this.filmList.element);
      this.filmButtonMore.setClickHandler(this.#filmButtonMoreClickHandler);
    }
  };


  #filmButtonMoreClickHandler = () => {
    const displayedFilms = this.filmListContainer.getFilms(); // Get currently displayed films
    const totalFilteredFilms = displayedFilms.length; // Use the length of displayed films
    const startIndex = displayedFilms.length;
    const endIndex = Math.min(startIndex + FILM_COUNT_PER_STEP, totalFilteredFilms);

    displayedFilms.slice(startIndex, endIndex).forEach((film) => {
      this.#renderFilm(film, this.filmListContainer);
    });
    if (endIndex >= totalFilteredFilms) {
      remove(this.filmButtonMore);
    }
  };

  #renderViews() {
    render(this.sort, this.#container);
    render(this.films, this.#container);
    render(this.filmDetails, this.#container);
    render(this.filmDetailsForm, this.filmDetails.element);
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
    const filmCardComponent = new FilmCardView(film);

    filmCardComponent.element.addEventListener('click', () => {
      this.#renderFilmDetails(film);
      document.body.classList.add('hide-overflow');
    });

    render(filmCardComponent, container.element);
  }

  #removeFilmDetailsComponent = () => {
    remove(this.filmDetailsForm);
    this.filmDetailsForm = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderFilmDetails(film) {
    const comments = this.#commentsModel.getCommentsForFilm(film.id);
    if (this.filmDetailsForm.element) {
      const topContainerView = new FilmDetailsTopContainerView(film); // Create instance
      render(topContainerView, this.filmDetailsForm.element);
      render(new FilmDetailsBottomContainerView(film, comments), this.filmDetailsForm.element);
      topContainerView.setClickHandler(this.#cardClose);
    }
  }

  #cardClose = () => {
    this.#removeFilmDetailsComponent();
    this.#onEscKeyDown();
  };
}
