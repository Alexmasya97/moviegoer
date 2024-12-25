import FilmDetailsTopContainerView from '../view/filmDetailsTopContainer.js';
import FilmDetailsBottomContainerView from '../view/filmDetailsBottomContainer.js';
import { render, remove, replace } from '../framework/render.js';
import FilmDetailsFormView from '../view/filmDetailsFormView.js';

export default class FilmDetailsPresenter {
  #film;
  #commentsModel;
  #container;
  #comments;
  #filmDetailsComponent;
  #filmDetailsForm;

  #changeData;
  #closeBtnClickHandler;
  #escKeyDownHandler;

  constructor(container, commentsModel, changeData, closeBtnClickHandler, escKeyDownHandler) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#closeBtnClickHandler = closeBtnClickHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsFormView(this.#film, this.#comments);

    // this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
    //   this.#closeBtnClickHandler();
    //   document.removeEventListener('keydown', this.#escKeyDownHandler)
    // })


    if (prevFilmDetailsComponent === undefined) {
      render(this.#filmDetailsComponent, this.#container);
      this.#renderFilmDetails(film);
      return;
    }

    remove(prevFilmDetailsComponent);
    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    render(this.#filmDetailsComponent, this.#container);
    this.#renderFilmDetails(film);
  };

  #renderFilmDetails(film) {
    const topContainerView = new FilmDetailsTopContainerView(film);
    render(topContainerView, this.#filmDetailsComponent.element);
    render(new FilmDetailsBottomContainerView(film, this.#comments), this.#filmDetailsComponent.element);
    topContainerView.setClickHandler(this.#cardClose);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #cardClose = () => {
    this.#removeFilmDetailsComponent();
  };
}
