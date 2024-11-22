import {render} from './render.js';
import HeaderProfileView from './view/headerProfileView.js';
import FooterStatisticView from './view/footerStatisticView.js';
import NavigationView from './view/NavigationView.js';

import FilmsPresenter from './presenter/films-presenter.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter();


render(new HeaderProfileView(), siteHeaderElement);
render(new FooterStatisticView(), siteFooterElement);
render(new NavigationView(), siteMainElement);


filmsPresenter.init(siteMainElement);