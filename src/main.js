import {render} from './render.js';
import HeaderProfileView from './view/headerProfileView.js';
import FooterStatisticView from './view/footerStatisticView.js';
import NavigationView from './view/NavigationView.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comment-model.js';

import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

render(new HeaderProfileView(), siteHeaderElement);
render(new FooterStatisticView(), siteFooterElement);
render(new NavigationView(), siteMainElement);


filmsPresenter.init(siteMainElement, filmsModel, commentsModel);
