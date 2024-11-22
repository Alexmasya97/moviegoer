import FilmsView from '../view/filmsView.js';
import SortView from '../view/sortView.js';
import FilmButtonMoreView from '../view/filmButtonMoreView.js';
import FilmListView from '../view/filmListView.js';
import FilmListContainerView from '../view/filmListContainerView.js';
import FilmCardView from '../view/filmCardView.js';
import { FILM_COUNT } from '../const.js';
import FilmDetailsView from '../view/filmDetailsView.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  sortComponent = new SortView();
  filmListComponent = new FilmListView();
  FilmListContainerComponent = new FilmListContainerView();
  filmButtonMoreViewComponent = new FilmButtonMoreView();

  init = (container) => {
    this.container = container;

    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.FilmListContainerComponent, this.filmListComponent.getElement());

    for (let i = 0; i<FILM_COUNT; i++) {
      render(new FilmCardView(), this.FilmListContainerComponent.getElement());
    }
    render(this.filmButtonMoreViewComponent, this.filmListComponent.getElement());
    render(new FilmDetailsView(), this.container.parentElement);
  };
}

