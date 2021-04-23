import AbstractView from './abstract.js';

const getFilters = filters => {
  return filters
    .map(filter => {
      const { name, count } = filter;
      return `<a href="#${name}" class="main-navigation__item">${name}
      ${name === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
    })
    .join('');
};

const createSiteMenuTemplate = filters => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${getFilters(filters)}
   </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
    this._element = null;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
