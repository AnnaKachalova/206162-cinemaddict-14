import AbstractView from './abstract.js';

const createFooterStatistics = number => {
  return `<p>${number} movies inside</p>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(number) {
    super();
    this._element = null;
    this._number = number;
  }
  getTemplate() {
    return createFooterStatistics(this._number);
  }
}
