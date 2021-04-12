import dayjs from 'dayjs';

export const humanizeCommentDate = date => {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
};
