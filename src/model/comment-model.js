import { generateComments } from '../mock/comment.js';

export default class CommentsModel {
  #comments = generateComments();
  get comments () {
    return this.#comments;
  }

  getCommentsForFilm(filmId) {
    return this.#comments.filter((comment) => comment.filmId === filmId); //Example filter
  }
}
