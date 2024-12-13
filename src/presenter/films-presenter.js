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
  }

  init(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#renderViews();
    this.#renderFilms();
  }

  #renderViews() {
    render(this.sort, this.#container);
    render(this.films, this.#container);
    render(this.filmDetails, this.#container);
    render(this.filmDetailsForm, this.filmDetails.element);
  }

  #renderFilms() {
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
