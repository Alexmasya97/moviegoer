import {createElement} from '../render.js';

const createListEmptyTemplate = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;

export default class ListEmptyView {
  getTemplate() {
    return createListEmptyTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
