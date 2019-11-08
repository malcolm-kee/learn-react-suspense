import { fetchJson } from '../lib/ajax';

export const getJokeResource = () => {
  let data = '';
  let status = 'pending';

  const jokePromise = fetchJson(`https://icanhazdadjoke.com/`)
    .then(({ joke }) => {
      data = joke;
      status = 'done';
    })
    .catch(err => {
      data = err;
      status = 'error';
    });

  return {
    read: () => {
      switch (status) {
        case 'pending':
          throw jokePromise;

        case 'error':
          throw data;

        default:
          return data;
      }
    }
  };
};
