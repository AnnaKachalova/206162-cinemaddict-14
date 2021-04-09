import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsContainer } from './view/films-container.js';
import { createCardTemplate } from './view/card.js';
import { createProfileTemplate } from './view/profile.js';
import { createShowMoreButton } from './view/show-more.js';
import { createTopRatedTemplate } from './view/top-rated.js';
import { createMostCommentedTemplate } from './view/most-commented.js';
import { createFilmDetailsTemplate } from './view/film-details.js';

const CARD_COUNT = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMITED_COUNT = 2;

const render = (container, tammplate, place) => {
  container.insertAdjacentHTML(place, tammplate);
};
//******** шапка
const header = document.querySelector('.header');
render(header, createProfileTemplate(), 'beforeend');

//******** тело
const siteMainElement = document.querySelector('.main');

// Menu (сортировка и фильтры)
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');

// All Films
render(siteMainElement, createFilmsContainer(), 'beforeend');
const filmsContainer = siteMainElement.querySelector('.films');
const filmList = filmsContainer.querySelector('.films-list');
const filmListContainer = filmsContainer.querySelector('.films-list__container');

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmListContainer, createCardTemplate(), 'beforeend');
}
render(filmList, createShowMoreButton(), 'beforeend');

// Top, Most
render(filmsContainer, createTopRatedTemplate(), 'beforeend');

render(filmsContainer, createMostCommentedTemplate(), 'beforeend');

const filmsListsExtra = filmsContainer.querySelectorAll('.films-list--extra');
const topRatedContainer = filmsListsExtra[0].querySelector('.films-list__container');
const topMostCommited = filmsListsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(topRatedContainer, createCardTemplate(), 'beforeend');
}
for (let i = 0; i < MOST_COMMITED_COUNT; i++) {
  render(topMostCommited, createCardTemplate(), 'beforeend');
}

render(siteMainElement, createFilmDetailsTemplate(), 'beforeend');
