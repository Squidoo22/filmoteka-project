import { getMovieById } from '../api/movies-api';

const refs = {
  galleryList: document.querySelector('.gallery'),
};

let watchedArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
let queueArr = JSON.parse(localStorage.getItem('queueMovie')) || [];

refs.galleryList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const parent = e.target.parentElement;
  const next = parent.parentElement;
  console.log(next);
  getMovie(next.dataset.id);
});

const getMovie = async function (id) {
  try {
    const movie = await getMovieById(id);
    const watchedBtn = document.querySelector('#watched-btn');
    console.log(watchedBtn);
    const queueBtn = document.querySelector('#queue-btn');
    addToWatched(movie, watchedBtn);
    addToQueue(movie, queueBtn);
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = (movie, watchedBtn) => {
  watchedBtn.addEventListener('click', () => {
    watchedArr.push(movie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
  });
};

const addToQueue = (movie, queueBtn) => {
  queueBtn.addEventListener('click', () => {
    queueArr.push(movie);
    localStorage.setItem('queueMovie', JSON.stringify(queueArr));
  });
};
