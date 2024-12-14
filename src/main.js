import {render} from './framework/render.js';
import HeaderProfileView from './view/headerProfileView.js';
import FooterStatisticView from './view/footerStatisticView.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comment-model.js';
import { generateFilms } from './mock/films.js';

import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const films = generateFilms();

const footerStatisticView = new FooterStatisticView(films);
const headerProfileView = new HeaderProfileView(films);

render(headerProfileView, siteHeaderElement);
render(footerStatisticView, siteFooterElement);

filmsPresenter.init(siteMainElement, filmsModel, commentsModel);
