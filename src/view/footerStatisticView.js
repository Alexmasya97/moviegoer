import AbstractView from '../framework/view/abstract-view.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFooterStatisticTemplate = () => `<section class="footer__statistics">
<p>0 movies inside</p></section>`;

// Клас - он же сам компонент
export default class FooterStatisticView extends AbstractView {

  get template() {
    return createFooterStatisticTemplate();
  }
}
