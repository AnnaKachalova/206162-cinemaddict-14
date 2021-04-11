import dayjs from 'dayjs';

export const generateFilm = () => {
  return {
    title: 'aaa',
    image: 'sagebrush-trail.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    filmProductionYear: 2019,
    duration: 52,
    genre: 'horror',
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
