import dayjs from 'dayjs';

export const formatCommentDate = date => {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
};
