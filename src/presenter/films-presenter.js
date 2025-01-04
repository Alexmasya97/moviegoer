import FilmPresenter from './film-presenter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import NavigationView from '../view/NavigationView.js';
import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmDetailsView from '../view/filmDetailsView.js';
import ListEmptyView from '../view/listEmptyView.js';
import { FILM_COUNT_PER_STEP, SortType } from '../const.js';
import { render, remove, replace } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/film.js';


export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
  #films;
  #filmPresenter = new Map();
  #selectedFilm;
  #filmDetailsPresenter;
  #removeFilmDetailsComponent;
  #onEscKeyDown;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #sourcedFilms = []

  #renderFilmList
  #sortComponent
  #currentSortType = SortType.DEFAULT;


  constructor(views, filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#initViews();
  }

  #initViews() {
    this.films = new FilmsView();
    this.filmList = new FilmListView();
    this.filmListContainer = new FilmListContainerView();
    this.filmButtonMore = new FilmButtonMoreView();
    this.filmDetails = new FilmDetailsView();
    this.listEmpty = new ListEmptyView();
    this.navigation = new NavigationView(this.#sourcedFilms);
  }

  init(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#renderNavigation();
    this.#sortTypeChangeHandler(SortType);
    console.log(this.#sortTypeChangeHandler(SortType))
    this.#renderViews();
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
    console.log(this.navigation)
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
    const films = this.#filmsModel.films;

    films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this.#renderFilm(film, this.filmListContainer);
      });

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= films.length || filteredFilms.length ) {
      remove(this.filmButtonMore);
    }

  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms]
    }
    this.#currentSortType = sortType;
  };

  #sortTypeChangeHandler = (SortType) => {
    if (this.#currentSortType === SortType) {
      return
    }
    this.#sortFilms(SortType);
    // this.#clearFilmList();
    this.#renderSort(this.#container);
    this.#renderFilms();
    console.log(`2`)
  }

  #renderSort(container) {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, container)

    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
      };

  // #clearFilmList = () => {
  //   this.#filmPresenter.forEach((presenter) => presenter.destroy());
  //   this.#filmPresenter.clear()

  // };

  #renderViews() {
    render(this.films, this.#container);
    render(this.filmDetails, this.#container);
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
