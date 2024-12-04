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
import { render } from '../render.js';

export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #views = {
    films: null,
    sort: null,
    filmList: null,
    filmListContainer: null,
    filmButtonMore: null,
    filmDetails: null,
    filmDetailsForm: null,
    filmDetailsTopContainer: null,
    filmDetailsBottomContainer: null,
    listEmpty: null
  };

  constructor(views, filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#initViews();
  }

  #initViews() {
    this.#views.films = new FilmsView();
    this.#views.sort = new SortView();
    this.#views.filmList = new FilmListView();
    this.#views.filmListContainer = new FilmListContainerView();
    this.#views.filmButtonMore = new FilmButtonMoreView();
    this.#views.filmDetails = new FilmDetailsView();
    this.#views.filmDetailsForm = new FilmDetailsFormView();
    this.#views.filmDetailsTopContainer = new FilmDetailsTopContainerView();
    this.#views.filmDetailsBottomContainer = new FilmDetailsBottomContainerView();
    this.#views.listEmpty = new ListEmptyView();
  }

  init(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#renderViews();
    this.#renderFilms();
  }

  #renderViews() {
    render(this.#views.sort, this.#container);
    render(this.#views.films, this.#container);
    render(this.#views.filmDetails, this.#container);
    render(this.#views.filmDetailsForm, this.#views.filmDetails.element);
  }

  #renderFilms() {
    const films = this.#filmsModel.films; // Получаем все фильмы из модели
    if (films.length === 0) {
      render(this.#views.listEmpty, this.#container);
      this.#views.sort.element.remove();
      return;
    }

    render(this.#views.filmList, this.#views.films.element);
    render(this.#views.filmListContainer, this.#views.filmList.element);
    films
      .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
      .forEach((film) => {
        this.#renderFilm(film, this.#views.filmListContainer); // Рендерим каждый фильм
      });

    if (films.length > FILM_COUNT_PER_STEP) {
      render(this.#views.filmButtonMore, this.#views.filmList.element);
      this.#views.filmButtonMore.element.addEventListener('click', (evt) => this.#filmButtonMoreClickHandler(evt));
    }
  }

  #filmButtonMoreClickHandler() {
    const films = this.#filmsModel.films;
    films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this.#renderFilm(film, this.#views.filmListContainer);
      });
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= films.length) {
      this.#views.filmButtonMore.element.remove();
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
    this.#views.filmDetailsForm.element.remove();
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

    if (this.#views.filmDetailsForm.element) {
      render(new FilmDetailsTopContainerView(film), this.#views.filmDetailsForm.element);
      render(new FilmDetailsBottomContainerView(film, comments), this.#views.filmDetailsForm.element);
    }
    const closeButtonFilmDetailsElement = this.#views.filmDetailsForm.element.querySelector('.film-details__close-btn');

    closeButtonFilmDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsComponent();
      this.#onEscKeyDown();
    });

    document.addEventListener('keydown', this.#onEscKeyDown);
  }
}


