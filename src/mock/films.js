import { getRandomFloat, getRandomArrayElement, getRandomInteger } from '../utils/utils';
import { FILM_COUNT } from '../const';
import { generateComments } from './comment';

const generateFilm = () => ({

  title: getRandomArrayElement([
    'Made for each other',
    'Popeye meets Sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden arm'
  ]),
  alternativeTitle: getRandomArrayElement([
    'Shadows in the Fog',
    'Whispers from Beyond',
    'Lost Paradise',
    'Dance of the Moonlight',
    'Hidden Secrets',
    'Timeless Love',
    'Laziness Who Sold Themselves'
  ]),
  totalRating: getRandomFloat(0, 10, 1),
  poster: getRandomArrayElement([
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg'
  ]),
  ageRating: getRandomArrayElement([0, 6, 12, 16, 18]),
  director: getRandomArrayElement([
    'Tom Ford',
    'Alfred Hitchcock',
    'John Ford',
    'Orson Welles',
    'Billy Wilder',
    'Frank Capra',
    'Stanley Kubrick'
  ]),
  writers: getRandomArrayElement([
    'Takeshi Kitano',
    'Dalton Trumbo',
    'Ben Hecht',
    'Paddy Chayefsky',
    'William Goldman',
    'Robert Towne',
    'Julien Josephson'
  ]),
  year: getRandomArrayElement([1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997]),
  actors: getRandomArrayElement([
    'Morgan Freeman',
    'Humphrey Bogart',
    'Cary Grant',
    'James Stewart',
    'Katharine Hepburn',
    'Marlon Brando',
    'Greta Garbo'
  ]),
  release: {
    date: '2019-05-11T00:00:00.000Z',
    releaseCountry: 'Finland'
  },
  runtime: 77,
  genre: getRandomArrayElement(['Comedy', 'Western', 'Drama', 'Science fiction', 'Romance']),
  description: getRandomArrayElement([
    'Oscar-winning film, a war drama about two young people, from the creators of timeless classic',
    'A timeless classic set during WWII, where a cynical nightclub owner must choose between his love for a woman and helping her husband escape the Nazis.',
    'Set in Hollywood during the transition from silent films to talkies, this musical comedy showcases the challenges faced by actors and the magic of cinema',
    'Confined to his apartment due to injury, a photographer becomes obsessed with watching his neighbors, leading him to suspect one of them has committed murder.',
    'When a tornado whirls young Dorothy away to the magical land of Oz, she embarks on an adventure with new friends to find her way back home',
    'An enchanting tale about a free-spirited New York socialite who befriends a struggling writer, exploring themes of love, identity, and independence.'
  ])
});

const generateFilms = () => {
  let filmId = 1;
  const films = Array.from({length: FILM_COUNT}, () => {
    const film = generateFilm();
    filmId++;
    const alreadyWatched = Boolean(getRandomInteger(0,1));
    return {
      id: String(filmId),
      comments: generateComments([film]), // Генерация комментариев для конкретного фильма
      filmInfo: film,
      userDetails: {
        watchList: Boolean(getRandomInteger(0,1)),
        alreadyWatched,
        favourite: Boolean(getRandomInteger(0,1))
      }
    };
  });
  return films;
};

export {
  generateFilms
};
