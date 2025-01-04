import AbstractView from '../framework/view/abstract-view.js';
import { getUserStatus } from '../utils/user.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createHeaderProfile = (userStatus) => `<section class="header__profile profile">
<p class="profile__rating">${userStatus}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

// Клас - он же сам компонент
export default class HeaderProfileView extends AbstractView {
  constructor(userFilms) {
    super();
    this._userFilms = userFilms;
  }

  get template() {
    const userStatus = getUserStatus(this._userFilms);
    return createHeaderProfile(userStatus);
  }
}
