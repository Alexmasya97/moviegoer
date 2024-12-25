import FilmCardView from '../view/filmCardView.js';
import CommentsModel from '../model/comment-model.js';
import { render } from '../framework/render.js';
const commentsModel = new CommentsModel();


export default class FilmPresenter {
  #film;
  #commentsModel;
  #container;
  #changeData;
  #clickCardHandler;

  constructor(container, changeData, clickCardHandler) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#clickCardHandler = clickCardHandler;
  }

  init(film) {
    this.#film = film;
    this.#renderFilm(film);
    this.#commentsModel = commentsModel;
  }

  #watchlistBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      },
    });
  };

  #watchedBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watched
      },
    });
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.favorite
      },
    });
  };


  #renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);

    filmCardComponent.element.addEventListener('click', () => {
      this.#clickCardHandler(film);
    });
    render(filmCardComponent, this.#container.element);
  }
}
