import dayjs from 'dayjs';

export const generateFilm = () => {
  return {
    title: 'aaa',
    titleOriginal: 'bbbb',
    director: 'A A Ann',
    writers: 'Anne Wigton, Heinz Herald',
    actors: 'Erich von Stroheim, Mary Beth Hughes',
    releaseDate: '30 March 1945',
    country: 'USA',
    image: 'sagebrush-trail.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    filmProductionYear: 2019,
    duration: 52,
    genres: ['horror', 'horror'],
    age: 5,
    isWatchlist: true,
    isWatched: false,
    isFavorite: true,
    comments: [
      {
        text: 'wow',
        emotion: 'smile',
        autor: 'Nik',
        data: dayjs()
          .add(5, 'day')
          .toDate(),
      },
      {
        text: 'wow',
        emotion: 'smile',
        autor: 'Ann',
        data: dayjs()
          .add(5, 'day')
          .toDate(),
      },
    ],
  };
};
