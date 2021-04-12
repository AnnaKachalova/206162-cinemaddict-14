const cardToFilterMap = {
  all: cards => cards.length,
  watchlist: cards => cards.filter(card => !card.isWatched).filter(card => card.isWatchlist).length,
  history: cards => cards.filter(card => card.isWatched).length,
  favorites: cards => cards.filter(card => card.isFavorite).length,
};

export const generateFilter = cards => {
  return Object.entries(cardToFilterMap).map(([filterName, countCards]) => {
    return {
      name: filterName,
      count: countCards(cards),
    };
  });
};
