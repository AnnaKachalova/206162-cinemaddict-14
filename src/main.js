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

import { render, RenderPosition } from './utils.js';

const CARD_COUNT = 22;
const CARD_COUNT_PER_STEP = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMITED_COUNT = 2;

//******** шапка
const header = document.querySelector('.header');
render(header, new ProfileView().getElement(), RenderPosition.BEFOREEND);

//******** тело
const siteMainElement = document.querySelector('.main');

// All Films
const cards = new Array(CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(cards);

render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND); // Menu (сортировка и фильтры)

render(siteMainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector('.films');
const filmList = filmsContainer.querySelector('.films-list');
const filmListContainer = filmsContainer.querySelector('.films-list__container');

const renderCard = (filmListContainer, card) => {
  const cardComponent = new CardView(card);

  const cardElement = cardComponent.getElement();
  render(filmListContainer, cardElement, RenderPosition.BEFOREEND);

  const poster = cardElement.querySelector('.film-card__poster');

  poster.addEventListener('click', () => {
    showPopup();
  });
  const title = cardElement.querySelector('.film-card__title');
  title.addEventListener('click', () => {
    showPopup();
  });
  const commentsBlock = cardElement.querySelector('.film-card__comments');
  commentsBlock.addEventListener('click', () => {
    showPopup();
  });

  const showPopup = () => {
    const filmDetailsComponent = new FilmDetailsView(card);
    const filmDetailsElement = filmDetailsComponent.getElement();
    render(siteMainElement, filmDetailsElement, RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');
    const buttonClose = filmDetailsElement.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      filmDetailsElement.remove();
      filmDetailsComponent.removeElement();
      document.querySelector('body').classList.remove('hide-overflow');
    });
  };
};

for (let i = 0; i < Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  renderCard(filmListContainer, cards[i]);
}

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderCardCount = CARD_COUNT_PER_STEP;
  render(filmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', evt => {
    evt.preventDefault();
    cards
      .slice(renderCardCount, renderCardCount + CARD_COUNT_PER_STEP)
      .forEach(card => renderCard(filmListContainer, card));
    renderCardCount += CARD_COUNT_PER_STEP;

    if (renderCardCount >= cards.lenght) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}
// Top, Most
render(filmsContainer, new TopRatedView().getElement(), RenderPosition.BEFOREEND);

render(filmsContainer, new MostCommentedView().getElement(), RenderPosition.BEFOREEND);

const filmsListsExtra = filmsContainer.querySelectorAll('.films-list--extra');
const topRatedContainer = filmsListsExtra[0].querySelector('.films-list__container');
const topMostCommited = filmsListsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  renderCard(topRatedContainer, cards[i]);
}
for (let i = 0; i < MOST_COMMITED_COUNT; i++) {
  renderCard(topMostCommited, cards[i]);
}

const footer = document.querySelector('.footer__statistics');
render(footer, new FooterStatisticsView(cards.length).getElement(), RenderPosition.BEFOREEND);
