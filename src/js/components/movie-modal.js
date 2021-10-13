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
      const queueBtn = document.querySelector('#queue');

      addToWatched(movie, watchedBtn);
      addToQueue(movie, queueBtn);
      testBtnQueue(movie, queueBtn);
      testBtnWatch(movie, watchedBtn);
    }
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = (movie, watchedBtn) => {
  watchedBtn.addEventListener('click', () => {
    watchedArr.push(movie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
    testBtnWatch(movie, watchedBtn);
  });
};

const addToQueue = (movie, queueBtn) => {
  queueBtn.addEventListener('click', () => {
    queueArr.push(movie);
    localStorage.setItem('queueMovie', JSON.stringify(queueArr));
    testBtnQueue(movie, queueBtn);
  });
};

const testBtnWatch = (movie, watchedBtn) => {
  const getWatchedArr = localStorage.getItem('watchedMovie');
  const storageMovieArr = JSON.parse(getWatchedArr);

  for (let i = 0; i < storageMovieArr.length; i += 1) {
    if (storageMovieArr[i].id === movie.id) {
      watchedBtn.disabled = true;
      watchedBtn.textContent = 'added to viewed';
      watchedBtn.classList.add('btn__disabled');
    } else {
      watchedBtn.disabled = false;
      watchedBtn.textContent = 'add to Watched';
      watchedBtn.classList.remove('btn__disabled');
    }
  }
};

const testBtnQueue = (movie, queueBtn) => {
  const getQueuedArr = localStorage.getItem('queueMovie');
  const storageQueueMovieArr = JSON.parse(getQueuedArr);

  for (let i = 0; i < storageQueueMovieArr.length; i += 1) {
    if (storageQueueMovieArr[i].id === movie.id) {
      queueBtn.disabled = true;
      queueBtn.textContent = 'added to queue';
      queueBtn.classList.add('btn__disabled');
    } else {
      queueBtn.disabled = false;
      queueBtn.textContent = 'add to queue';
      queueBtn.classList.remove('btn__disabled');
    }
  }
};
