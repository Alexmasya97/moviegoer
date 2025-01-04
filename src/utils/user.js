import { NOVICE_STATUS, FAN_STATUS, MOVIEBUFF_STATUS } from '../const.js';

export function getUserStatus(films) {
  const watchedFilmCount = films.filter((film) => film.userDetails.alreadyWatched).length;

  if (watchedFilmCount === 0) {return null;}

  let userStatus;
  if (watchedFilmCount >= 1 && watchedFilmCount <= NOVICE_STATUS) {
    userStatus = 'NOVICE';
  } else if (watchedFilmCount > NOVICE_STATUS && watchedFilmCount <= FAN_STATUS) {
    userStatus = 'FAN';
  } else if (watchedFilmCount >= MOVIEBUFF_STATUS) {
    userStatus = 'MOVIEBUFF';
  }

  return userStatus;
}


