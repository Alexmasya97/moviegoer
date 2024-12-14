// import FilmCardView from '../view/filmCardView.js';
// import FilmDetailsTopContainerView from '../view/filmDetailsTopContainer.js';
// import FilmDetailsBottomContainerView from '../view/filmDetailsBottomContainer.js';
// import FilmDetailsView from '../view/filmDetailsView.js';
// import FilmDetailsFormView from '../view/filmDetailsFormView.js';
// import FilmListView from '../view/filmListView.js';
// import FilmListContainerView from '../view/filmListContainerView.js';

// import { render, remove } from '../framework/render.js';

// export default class FilmPresenter {
//   #container;
//   #film;
//   #comment;

//   constructor() {
//     // this.#container = container;
//     // this.#filmsModel = filmsModel;
//     // this.#commentsModel = commentsModel;
//     this.#initViews();
//   }

//   #initViews() {
//     this.filmDetails = new FilmDetailsView();
//     this.filmDetailsForm = new FilmDetailsFormView();
//     this.filmListContainer = new FilmListContainerView()

//       }

//   init(container, film, comment) {
//     this.#container = container;
//     this.#film = film;
//     this.#comment = comment;
//     this.#renderViews();
//     this.#renderFilm(film, container);
//   }

//   #renderViews() {
//     render(this.filmDetails, this.#container);
//     render(this.filmDetailsForm, this.filmDetails.element);
//   }
//   //Отрисовка карточки фильма
//   #renderFilm(film, container) {
//     const filmCardComponent = new FilmCardView(film);
//     filmCardComponent.element.addEventListener('click', () => {
//       this.#renderFilmDetails(film);
//       document.body.classList.add('hide-overflow');
//     });

//     render(filmCardComponent, container);
//   }

//   #renderFilmDetails(film) {
//     const comments = this.#comment.getCommentsForFilm(film.id);
//     if (this.filmDetailsForm.element) {
//       const topContainerView = new FilmDetailsTopContainerView(film); // Create instance
//       render(topContainerView, this.filmDetailsForm.element);
//       render(new FilmDetailsBottomContainerView(film, comments), this.filmDetailsForm.element);
//       topContainerView.setClickHandler(this.#cardClose);
//     }
//   }

//   #removeFilmDetailsComponent = () => {
//     remove(this.filmDetailsForm);
//     this.filmDetailsForm = null;
//     document.body.classList.remove('hide-overflow');
//   };

//   #onEscKeyDown = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       this.#removeFilmDetailsComponent();
//       document.removeEventListener('keydown', this.#onEscKeyDown);
//     }
//   };


//   #cardClose = () => {
//     this.#removeFilmDetailsComponent();
//     this.#onEscKeyDown();
//   };
// }
