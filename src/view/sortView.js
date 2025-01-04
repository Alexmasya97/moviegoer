import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createSortTemplate = (activeSortType) => ` <ul class="sort">
<li><a href="#"
class="sort__button ${(activeSortType === 'default') ? 'sort__button--active' : ''}"
data-sort-type="${SortType.DEFAULT}"
>
Sort by default</a></li>
<li><a href="#" class="sort__button  ${(activeSortType === 'date') ? 'sort__button--active' : ''}"  data-sort-type="${SortType.DATE}">Sort by date</a></li>
<li><a href="#" class="sort__button ${(activeSortType === 'rating') ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;

// Клас - он же сам компонент
export default class SortView extends AbstractView {

  #activeSortType;

  constructor(activeSortType) {
    super();
    this.#activeSortType = activeSortType;
  }

  get template() {
    return createSortTemplate(this.#activeSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#handleClick);
  };

  #handleClick = (evt) => {
    if (evt.target.tagName !== 'A') {
      return
    }
    evt.preventDefault();
    this._callback.click(evt.target.dataset.sortType);
  };
}
