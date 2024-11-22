// Вспомогательная функция для превращения строки с HTML в DOM-элементы
import {createElement} from '../render.js';

// Функция, которая будет возвращать строку с HTML-разметкой компонента
const createFooterStatisticTemplate = () => `<section class="footer__statistics">
<p>0 movies inside</p></section>`;

// Клас - он же сам компонент
export default class FooterStatisticView {
  getTemplate() {
    return createFooterStatisticTemplate();
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
