import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyTemplate = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;

export default class ListEmptyView extends AbstractView {

  get template() {
    return createListEmptyTemplate();
  }
}
