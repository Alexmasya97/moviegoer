import { getRandomInteger, getRandomArrayElement } from '../utils';
import { MAX_COMMENTS_ON_FILM } from '../const.js';

// Генерация одного комментария
const generateComment = () => ({

  text: getRandomArrayElement([
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Aliquam id orci ut lectus varius viverra',
    'Almost two hours? Seriously?',
    'Aliquam erat volutpat',
    'Nunc fermentum tortor ac porta dapibus',
    'In rutrum ac purus sit amet tempus'
  ]),
  emoji: getRandomArrayElement(['angry', 'puke', 'sleeping', 'smile']),

  author: getRandomArrayElement([
    'Mr Smith',
    'BigBaboon',
    'Crazy monkey',
    'The princess',
    'Lonely wolf',
    'Melody of rainbow',
    'Pihtus',
    'Mss Doublefire'
  ])
});

const generateComments = (films) => {
  if (!films || !Array.isArray(films) || films.length === 0) {
    return [];
  }
  let commentId = 1;
  return films.reduce((comments, film) => {
    const commentsCount = getRandomInteger(1, MAX_COMMENTS_ON_FILM);
    const filmComments = Array.from({ length: commentsCount }, () => {
      const commentItem = generateComment();
      return {
        id: `${commentId++}`, // Используем id фильма для комментария
        ...commentItem,
        filmId: film.id,
      };
    });
    return [...comments, ...filmComments];
  }, []);
};


// console.log(generateComment())
export { generateComments};
