import SiteMenuView from './view/site-menu.js';
import ProfileView from './view/profile.js';
import FilmsContainerView from './view/films-container.js';
import ShowMoreButtonView from './view/show-more.js';
import FooterStatisticsView from './view/footer-statistics.js';
import CardView from './view/card.js';

import TopRatedView from './view/top-rated.js';
import MostCommentedView from './view/most-commented.js';
import FilmDetailsView from './view/film-details.js';

import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

import { renderTemplate, renderElement, RenderPosition } from './utils.js';

const CARD_COUNT = 22;
const CARD_COUNT_PER_STEP = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMITED_COUNT = 2;

//******** шапка
const header = document.querySelector('.header');
renderElement(header, new ProfileView().getElement(), RenderPosition.BEFOREEND);

//******** тело
const siteMainElement = document.querySelector('.main');

// All Films
const cards = new Array(CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(cards);

renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND); // Menu (сортировка и фильтры)

renderElement(siteMainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector('.films');
const filmList = filmsContainer.querySelector('.films-list');
const filmListContainer = filmsContainer.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  console.log(cards[i]);
  renderElement(filmListContainer, new CardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderCardCount = CARD_COUNT_PER_STEP;
  renderElement(filmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', evt => {
    evt.preventDefault();
    cards
      .slice(renderCardCount, renderCardCount + CARD_COUNT_PER_STEP)
      .forEach(card =>
        renderElement(filmListContainer, new CardView(card).getElement(), RenderPosition.BEFOREEND)
      );
    renderCardCount += CARD_COUNT_PER_STEP;

    if (renderCardCount >= cards.lenght) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}
// Top, Most
renderElement(filmsContainer, new TopRatedView().getElement(), RenderPosition.BEFOREEND);

renderElement(filmsContainer, new MostCommentedView().getElement(), RenderPosition.BEFOREEND);

const filmsListsExtra = filmsContainer.querySelectorAll('.films-list--extra');
const topRatedContainer = filmsListsExtra[0].querySelector('.films-list__container');
const topMostCommited = filmsListsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  renderElement(topRatedContainer, new CardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}
for (let i = 0; i < MOST_COMMITED_COUNT; i++) {
  renderElement(topMostCommited, new CardView(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(
  siteMainElement,
  new FilmDetailsView(cards[0]).getElement(),
  RenderPosition.BEFOREEND
);

const footer = document.querySelector('.footer__statistics');
renderElement(
  footer,
  new FooterStatisticsView(cards.length).getElement(),
  RenderPosition.BEFOREEND
);
