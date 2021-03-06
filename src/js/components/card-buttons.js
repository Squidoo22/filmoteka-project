import { getMovieById } from '../api/movies-api';
import { renderWatchedMovies } from '../components/render-library';
import { renderQueueMovies } from '../components/render-queue';

const refs = {
  galleryList: document.querySelector('.gallery'),
  header: document.querySelector('.header'),
};

let watchedArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
let queueArr = JSON.parse(localStorage.getItem('queueMovie')) || [];

refs.galleryList.addEventListener('mouseover', e => {
  if ((e.target.nodeName !== 'IMG') & (e.target.nodeName !== 'H1') & (e.target.nodeName !== 'P')) {
    return;
  }
  if (e.target.parentElement.classList.contains('empty-library__bg-image')) {
    return;
  }
  const movie = e.target.parentElement;
  const getMovie = async function (id) {
    try {
      const movie = await getMovieById(id);
      let watchedBtn = document.querySelector('#watched-btn');
      const removeWatchedBtn = document.querySelector('#watchedRemove-btn');
      const removeQueueBtn = document.querySelector('#queueRemove-btn');
      const queueBtn = document.querySelector('#queue-btn');
      testBtnWatch(movie, watchedBtn, removeWatchedBtn);
      testBtnQueue(movie, queueBtn, removeQueueBtn);
    } catch (error) {
      console.log(error);
    }
  };
  getMovie(movie.dataset.id);
});

refs.galleryList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const parent = e.target.parentElement;
  const movie = parent.parentElement;

  const getMovie = async function (id) {
    try {
      const movie = await getMovieById(id);
      const watchedBtn = document.querySelector('#watched-btn');
      const removeWatchedBtn = document.querySelector('#watchedRemove-btn');
      const removeQueueBtn = document.querySelector('#queueRemove-btn');
      const queueBtn = document.querySelector('#queue-btn');

      if (e.target.classList.contains('watched')) {
        addToWatched(movie, watchedBtn, removeWatchedBtn);
      }

      if (e.target.classList.contains('queue')) {
        addToQueue(movie, queueBtn, removeQueueBtn);
      }

      if (e.target.classList.contains('remove__watched')) {
        removeFromWatched(movie, watchedBtn, removeWatchedBtn);
      }

      if (e.target.classList.contains('remove__queue')) {
        removeFromQueue(movie, queueBtn, removeQueueBtn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMovie(movie.dataset.id);
});

const addToWatched = (movie, watchedBtn, removeWatchedBtn) => {
  watchedArr.push(movie);
  localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
  testBtnWatch(movie, watchedBtn, removeWatchedBtn);
};

const addToQueue = (movie, queueBtn, removeQueueBtn) => {
  queueArr.push(movie);
  localStorage.setItem('queueMovie', JSON.stringify(queueArr));
  testBtnQueue(movie, queueBtn, removeQueueBtn);
};

const removeFromWatched = (movie, watchedBtn, removeWatchedBtn) => {
  const modifiedArr = watchedArr.filter(item => item.id !== movie.id);
  localStorage.setItem('watchedMovie', JSON.stringify(modifiedArr));
  watchedArr = modifiedArr;
  testBtnWatch(movie, watchedBtn, removeWatchedBtn);

  if (refs.header.classList.contains('header__library-bg')) {
    renderWatchedMovies();
  }
};

const removeFromQueue = (movie, queueBtn, removeQueueBtn) => {
  const modifiedArr = queueArr.filter(item => item.id !== movie.id);
  localStorage.setItem('queueMovie', JSON.stringify(modifiedArr));
  queueArr = modifiedArr;
  testBtnQueue(movie, queueBtn, removeQueueBtn);

  if (refs.header.classList.contains('header__library-bg')) {
    renderQueueMovies();
  }
};

const testBtnWatch = (movie, watchedBtn, removeWatchedBtn) => {
  const storageMovieArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
  let el = document.getElementById(movie.id);

  if (storageMovieArr.length === 0) {
    el.querySelector('#watched-btn').classList.remove('btn__disabled');
    el.querySelector('#watchedRemove-btn').classList.add('btn__disabled');

    return;
  }

  for (let i = 0; i < storageMovieArr.length; i += 1) {
    if (storageMovieArr[i].id === movie.id) {
      el.querySelector('#watched-btn').classList.add('btn__disabled');
      el.querySelector('#watchedRemove-btn').classList.remove('btn__disabled');
      return;
    } else {
      el.querySelector('#watched-btn').classList.remove('btn__disabled');
      el.querySelector('#watchedRemove-btn').classList.add('btn__disabled');
    }
  }
};

const testBtnQueue = (movie, queueBtn, removeQueueBtn) => {
  const storageQueueMovieArr = JSON.parse(localStorage.getItem('queueMovie')) || [];
  let el = document.getElementById(movie.id);

  if (storageQueueMovieArr.length === 0) {
    el.querySelector('#queue-btn').classList.remove('btn__disabled');
    el.querySelector('#queueRemove-btn').classList.add('btn__disabled');

    return;
  }

  for (let i = 0; i < storageQueueMovieArr.length; i += 1) {
    if (storageQueueMovieArr[i].id === movie.id) {
      el.querySelector('#queue-btn').classList.add('btn__disabled');
      el.querySelector('#queueRemove-btn').classList.remove('btn__disabled');
      return;
    } else {
      el.querySelector('#queue-btn').classList.remove('btn__disabled');
      el.querySelector('#queueRemove-btn').classList.add('btn__disabled');
    }
  }
};
