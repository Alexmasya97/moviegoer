import { createElement } from '../render.js';

const createFilmCommentsViewTemplate = (film) => {
  const comments = film.comments.map((comment) => `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}.png" width="30" height="30" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.day}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);

  return (
    `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${comments.join('')} <!-- Объединяет все комментарии в одну строку -->
        </ul>
      </section>
    </div>`
  );
};
// Клас - он же сам компонент
export default class filmDetailsBottomView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createFilmCommentsViewTemplate(this.comment);
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
