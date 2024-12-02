import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmCardView from '../view/filmCardView.js';
import FilmDetailsView from '../view/filmDetailsView.js';
import FilmDetailsFormView from '../view/filmDetailsView.js';
import FilmDetailsTopContainerView from '../view/filmDetailsTopContainer.js';
import filmDetailsBottomView from '../view/filmDetailsBottomContainer.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  sortComponent = new SortView();
  filmListComponent = new FilmListView();
  FilmListContainerComponent = new FilmListContainerView();
  filmButtonMoreViewComponent = new FilmButtonMoreView();
  FilmDetailsView = new FilmDetailsView();
  filmDetailsFormViewComponent = new FilmDetailsFormView();
  filmDetailsTopContainerComponent = new FilmDetailsTopContainerView();
  filmDetailsBottomComponent = new filmDetailsBottomView();
  // filmCardComponent = new FilmCardView();


  init = (container, filmsModel, commentsModel) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;

    // Отрисовка компонентов на странице
    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.FilmListContainerComponent, this.filmListComponent.getElement());

    render(this.filmButtonMoreViewComponent, this.filmListComponent.getElement());

    render(this.FilmDetailsView, this.container);
    render(this.filmDetailsFormViewComponent, this.FilmDetailsView.getElement());

    // Получение списка фильмов из модели и отображение их на странице
    this.films = [...filmsModel.get()];
    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.FilmListContainerComponent.getElement());
    }

    render(new FilmDetailsTopContainerView(this.films[0]), this.filmDetailsFormViewComponent.getElement());

    // Получение комментариев к первому фильму и отображение деталей фильма на странице
    const comments = [...commentsModel.get(this.films[0])];
    render(new filmDetailsBottomView(this.films[0], comments), this.filmDetailsFormViewComponent.getElement());
  };
}
