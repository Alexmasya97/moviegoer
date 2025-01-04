import AbstractView from '../framework/view/abstract-view.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFooterStatisticTemplate = (film) =>
  // const filmsCount = film.length;
  // const totalFilmsCount = films.length;
  (
    `<section class="footer__statistics">
<p>${film.length} movies inside</p></section>`);


// Клас - он же сам компонент
export default class FooterStatisticView extends AbstractView {
  #films;
  #totalFilmsCount;

  constructor(films) {
    super();
    this.#films = films;
    this.#totalFilmsCount = films.length;
  }

  get template() {
    return createFooterStatisticTemplate(this.#films, this.#totalFilmsCount);
  }
}
