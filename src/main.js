import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsContainer } from './view/films-container.js';
import { createCardTemplate } from './view/card.js';
import { createProfileTemplate } from './view/profile.js';
import { createShowMoreButton } from './view/show-more.js';
import { createTopRatedTemplate } from './view/top-rated.js';
import { createMostCommentedTemplate } from './view/most-commented.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createFooterStatistics } from './view/footer-statistics.js';

import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

const CARD_COUNT = 22;
const CARD_COUNT_PER_STEP = 5;
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

// All Films
const cards = new Array(CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(cards);

render(siteMainElement, createSiteMenuTemplate(filters), 'beforeend'); // Menu (сортировка и фильтры)
render(siteMainElement, createFilmsContainer(), 'beforeend');
const filmsContainer = siteMainElement.querySelector('.films');
const filmList = filmsContainer.querySelector('.films-list');
const filmListContainer = filmsContainer.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  render(filmListContainer, createCardTemplate(cards[i]), 'beforeend');
}

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderCardCount = CARD_COUNT_PER_STEP;
  render(filmList, createShowMoreButton(), 'beforeend');

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', evt => {
    evt.preventDefault();
    cards
      .slice(renderCardCount, renderCardCount + CARD_COUNT_PER_STEP)
      .forEach(card => render(filmListContainer, createCardTemplate(card), 'beforeend'));
    renderCardCount += CARD_COUNT_PER_STEP;

    if (renderCardCount >= cards.lenght) {
      showMoreButton.remove();
    }
  });
}
// Top, Most
render(filmsContainer, createTopRatedTemplate(), 'beforeend');

render(filmsContainer, createMostCommentedTemplate(), 'beforeend');

const filmsListsExtra = filmsContainer.querySelectorAll('.films-list--extra');
const topRatedContainer = filmsListsExtra[0].querySelector('.films-list__container');
const topMostCommited = filmsListsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(topRatedContainer, createCardTemplate(cards[i]), 'beforeend');
}
for (let i = 0; i < MOST_COMMITED_COUNT; i++) {
  render(topMostCommited, createCardTemplate(cards[i]), 'beforeend');
}

render(siteMainElement, createFilmDetailsTemplate(cards[0]), 'beforeend');
const footer = document.querySelector('.footer__statistics');
render(footer, createFooterStatistics(cards.length), 'beforeend');
