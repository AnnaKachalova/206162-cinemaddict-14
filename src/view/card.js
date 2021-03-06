import AbstractView from './abstract.js';

const getGenres = genres => {
  return `${Object.values(genres)
    .map(genre => genre)
    .join(',')}`;
};

const createCardTemplate = card => {
  const {
    title,
    image,
    description,
    rating,
    filmProductionYear,
    duration,
    genres,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = card;

  const watchlistClassName = isWatchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmProductionYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${getGenres(genres)}</span>
    </p>
    <img src="./images/posters/${image}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class CardView extends AbstractView {
  constructor(film) {
    super();
    this._element = null;
    this._film = film;
  }
  getTemplate() {
    return createCardTemplate(this._film);
  }
}
