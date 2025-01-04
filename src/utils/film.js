const formatStringToYear = (date) =>
new Date(date).getFullYear();

const formatMinutesToTime = (minutes) => {
  const MINUTES_PER_HOUR = 60;
  return (minutes < MINUTES_PER_HOUR)
  ? `${minutes}m`
  :`${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`
}

const sortFilmsByDate = (filmA, filmB) =>
new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);

const sortFilmsByRating = (filmA, filmB) =>
filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {
  sortFilmsByDate,
  sortFilmsByRating,
}
