import AbstractView from '../framework/view/abstract-view.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createSortTemplate = () => ` <ul class="sort">
<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button">Sort by date</a></li>
<li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

// Клас - он же сам компонент
export default class SortView extends AbstractView{

  get template() {
    return createSortTemplate();
  }


}
