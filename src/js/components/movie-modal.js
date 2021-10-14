const basicLightbox = require('basiclightbox');
import { getMovieById } from '../api/movies-api';

const refs = {
  galleryList: document.querySelector('.gallery'),
};

const watchedArr = [];
const queueArr = [];

refs.galleryList.addEventListener('click', e => {
  if ((e.target.nodeName !== 'IMG') & (e.target.nodeName !== 'H1') & (e.target.nodeName !== 'P')) {
    return;
  }
  getMovie(e.target.parentElement.dataset.id);
});

const getMovie = async function (id) {
  try {
    const movie = await getMovieById(id);
    const popularity = String(movie.popularity).split('.')[0];
    const showModal = basicLightbox.create(
      `
              <div class="modal">
              <div class="img__container" style="background-image: url('https://image.tmdb.org/t/p/w400/${movie.poster_path}');">
              </div>
              <p class="modal__title">${movie.title}</p>
              <ul class="modal__list">
                <li class="list__item"><p class="modal__text">Vote / Votes</p></li>
                <li class="list__item"><p class="modal__text">Popularity</p></li>
                <li class="list__item"><p class="modal__text">Original Title</p></li>
                <li class="list__item"><p class="modal__text">Genre</p></li>
              </ul>
              <ul class=" modal__list--position">
                <li class="list__item"><p class="list__grade list__grade--flex"><span class="list__grade--color">${movie.vote_average}</span>  / <span class="list__grade--color--gray">${movie.vote_count}</span></p></li>
                <li class="list__item"><p class="list__grade">${popularity}</p></li>
                <li class="list__item"><p class="list__grade">${movie.original_title}</p></li>
                <li class="list__item"><p class="list__grade">${movie.genres[0].name}</p></li>
              </ul>
              <p class="modal__about">about</p>
              <p class="modal__desc">${movie.overview}</p>
                <button type="button" class="modal__button" id="watched">add to Watched</button>
                <button type="button" class="modal__button modal__button--position" id="queue">add to queue</button>
                <button type="button" class="modal__button btn__disabled" id="watchedRemove">remove from Watched</button>
                <button type="button" class="modal__button  modal__button--position btn__disabled" id="queueRemove">remove from queue</button>
                <button color="black" type="button" class="basicLightbox-bg">
                   
                </button>
            </div>
          `,
      {
        onShow: showModal => {
          showModal.element().querySelector('.basicLightbox-bg').onclick = showModal.close;
        },
      },
    );
    showModal.show();
    if (showModal.show() === true) {
      const watchedBtn = document.querySelector('#watched');
      const removeWatchedBtn = document.querySelector('#watchedRemove');
      const queueBtn = document.querySelector('#queue');
      const removeQueueBtn = document.querySelector('#queueRemove');

      addToWatched(movie, watchedBtn, removeWatchedBtn);
      removeFromWatched(movie, watchedBtn, removeWatchedBtn);
      addToQueue(movie, queueBtn, removeQueueBtn);
      testBtnQueue(movie, queueBtn, removeQueueBtn);
      testBtnWatch(movie, watchedBtn, removeWatchedBtn);
    }
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = (movie, watchedBtn, removeWatchedBtn) => {
  watchedBtn.addEventListener('click', () => {
    watchedArr.push(movie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
    testBtnWatch(movie, watchedBtn, removeWatchedBtn);
  });
};

const removeFromWatched = (movie, watchedBtn, removeWatchedBtn) => {
  removeWatchedBtn.addEventListener('click', () => {
    const getWatchedArr = localStorage.getItem('watchedMovie');
    const storageMovieArr = JSON.parse(getWatchedArr);
    console.log(storageMovieArr, 'do');
    const searchId = movie.id;
    const index = storageMovieArr.findIndex(el => el.id === searchId);
    const modifiedArr = storageMovieArr.splice(index, 1);
    console.log(modifiedArr, 'modifiedArr');
    localStorage.setItem('watchedMovie', JSON.stringify(modifiedArr));
    testBtnWatch(movie, watchedBtn, removeWatchedBtn);
  });
};

const addToQueue = (movie, queueBtn, removeQueueBtn) => {
  queueBtn.addEventListener('click', () => {
    queueArr.push(movie);
    localStorage.setItem('queueMovie', JSON.stringify(queueArr));
    testBtnQueue(movie, queueBtn, removeQueueBtn);
  });
};

const testBtnWatch = (movie, watchedBtn, removeWatchedBtn) => {
  const getWatchedArr = localStorage.getItem('watchedMovie');
  const storageMovieArr = JSON.parse(getWatchedArr);

  for (let i = 0; i < storageMovieArr.length; i += 1) {
    if (storageMovieArr[i].id === movie.id) {
      watchedBtn.classList.add('btn__disabled');
      removeWatchedBtn.classList.remove('btn__disabled');
      return;
    } else {
      watchedBtn.classList.remove('btn__disabled');
      removeWatchedBtn.classList.add('btn__disabled');
    }
  }
};

const testBtnQueue = (movie, queueBtn, removeQueueBtn) => {
  const getQueuedArr = localStorage.getItem('queueMovie');
  const storageQueueMovieArr = JSON.parse(getQueuedArr);

  for (let i = 0; i < storageQueueMovieArr.length; i += 1) {
    if (storageQueueMovieArr[i].id === movie.id) {
      queueBtn.classList.add('btn__disabled');
      removeQueueBtn.classList.remove('btn__disabled');
      return;
    } else {
      queueBtn.classList.remove('btn__disabled');
      removeQueueBtn.classList.add('btn__disabled');
    }
  }
};
