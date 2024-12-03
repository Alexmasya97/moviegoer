import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmCardView from '../view/filmCardView.js';
import FilmDetailsView from '../view/filmDetailsView.js';
import FilmDetailsFormView from '../view/filmDetailsFormView.js';
import FilmDetailsTopContainerView from '../view/filmDetailsTopContainer.js';
import FilmDetailsBottomContainerView from '../view/filmDetailsBottomContainer.js'; // Corrected import
import { render } from '../render.js';

export default class FilmsPresenter {
  #container;
  #filmsModel;
  #commentsModel;

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
    this.#views.filmDetailsBottomContainer = new FilmDetailsBottomContainerView(); // Corrected name
  }


  init(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#renderViews();
    this.#renderFilms();
    this.#renderFilmDetails();
  }

  #renderViews() {
    render(this.#views.sort, this.#container);
    render(this.#views.films, this.#container);
    render(this.#views.filmList, this.#views.films.element);
    render(this.#views.filmListContainer, this.#views.filmList.element);
    render(this.#views.filmButtonMore, this.#views.filmList.element);
    render(this.#views.filmDetails, this.#container);
    render(this.#views.filmDetailsForm, this.#views.filmDetails.element);
  }

  #renderFilms() {

    const films = [...this.#filmsModel.films];
    films.forEach((film) => {
      render(new FilmCardView(film), this.#views.filmListContainer.element);
    });
  }

  #renderFilmDetails() {
    const films = [...this.#filmsModel.films];

    if (films.length > 0) {
      const firstFilm = films[0];
      const comments = this.#commentsModel.getCommentsForFilm(firstFilm.id);

      if (this.#views.filmDetailsForm.element) { //Check if element exists
        render(new FilmDetailsTopContainerView(firstFilm), this.#views.filmDetailsForm.element);
        render(new FilmDetailsBottomContainerView(firstFilm, comments), this.#views.filmDetailsForm.element);
      } else {
        throw('Target element for rendering is null or undefined.');
      }
    } else {
      throw('No films found.');
    }
  }}
