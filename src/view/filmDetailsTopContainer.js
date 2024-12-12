import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTopContainerTemplate = (film) => {

  const { title, director, totalRating, genre, poster, description, alternativeTitle, ageRating} = film.filmInfo;
  return (
    ` <div class="film-details__top-container">
<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">

    <p class="film-details__age">${ageRating} +</p>
  </div>

  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${alternativeTitle}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${totalRating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">30 March 1945</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">1h 18m</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">USA</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          <span class="film-details__genre">${genre}</span>
          <span class="film-details__genre">Film-Noir</span>
          <span class="film-details__genre">Mystery</span></td>
      </tr>
    </table>

    <p class="film-details__film-description">${description}</p>
  </div>
</div>

<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
</section>
</div>`
  );
};


export default class FilmDetailsTopContainerView extends AbstractView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTopContainerTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  };
}
