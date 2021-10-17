const basicLightbox = require('basiclightbox');
import { getMovieById } from '../api/movies-api';
import { renderWatchedMovies } from '../components/render-library';
import { renderQueueMovies } from '../components/render-queue';
import { renderTrendingMovies } from '../components/render-trending-movies';
import { onOpenLibraryPage, onOpenHomePage } from '../components/change-home-library';

const refs = {
  galleryList: document.querySelector('.gallery'),
  libraryBtn: document.querySelector('.js-btn-library'),
  homeBtn: document.querySelector('.js-btn-home'),
};

let watchedArr = JSON.parse(localStorage.getItem('watchedMovie')) || [];
let queueArr = JSON.parse(localStorage.getItem('queueMovie')) || [];

refs.galleryList.addEventListener('click', e => {
  if ((e.target.nodeName !== 'IMG') & (e.target.nodeName !== 'H1') & (e.target.nodeName !== 'P')) {
    return;
  }
  getMovie(e.target.parentElement.dataset.id);
});

const getMovie = async function (id) {
  try {
    const movie = await getMovieById(id);
    const overview = movie.overview.slice(0, 400);
    const popularity = String(movie.popularity).split('.')[0];
    const showModal = basicLightbox.create(
      `
              <div class="modal">
              <div class="img__container" style="background-image: url('https://image.tmdb.org/t/p/w400/${movie.poster_path}');">
              </div>
              <p class="modal__title">${movie.title}</p>
              
              <table class="modal__list modal__table" border="0"  cellpadding="5">
              <tr>
              <td class="modal__text">Vote / Votes</td>
              <td class="list__grade list__grade--flex"><span class="list__grade--color">${movie.vote_average}</span>  / <span class="list__grade--color--gray">${movie.vote_count}</span></td>
              </tr>
              <tr>
              <td class="modal__text">Popularity</td>
              <td class="list__grade">${popularity}</td>
              </tr>
              <tr>
              <td class="modal__text">Original Title</td>
              <td class="list__grade">${movie.original_title}</td>
              </tr>
              <tr>
              <td class="modal__text">Genre</td>
              <td class="list__grade">${movie.genres[0].name}</td>
              </tr>
              </table>
              <p class="modal__about">about</p>
              <p class="modal__desc">${overview}</p>
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
          window.addEventListener('keydown', e => {
            const ESC_KEY_CODE = 'Escape';

            if (e.code === ESC_KEY_CODE) {
              showModal.close();
            }
          });
        },
      },
    );
    showModal.show();
    if (showModal.show() === true) {
      const watchedBtn = document.querySelector('#watched');
      const removeWatchedBtn = document.querySelector('#watchedRemove');
      const queueBtn = document.querySelector('#queue');
      const removeQueueBtn = document.querySelector('#queueRemove');

      addToWatched(movie, watchedBtn, removeWatchedBtn, showModal);
      removeFromWatched(movie, watchedBtn, removeWatchedBtn, showModal);
      removeFromQueue(movie, queueBtn, removeQueueBtn, showModal);
      addToQueue(movie, queueBtn, removeQueueBtn, showModal);
      testBtnQueue(movie, queueBtn, removeQueueBtn);
      testBtnWatch(movie, watchedBtn, removeWatchedBtn);
    }
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = (movie, watchedBtn, removeWatchedBtn, showModal) => {
  watchedBtn.addEventListener('click', () => {
    watchedArr.push(movie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
    testBtnWatch(movie, watchedBtn, removeWatchedBtn);
    showModal.close();
  });
};

const removeFromWatched = (movie, watchedBtn, removeWatchedBtn, showModal) => {
  removeWatchedBtn.addEventListener('click', () => {
    const modifiedArr = watchedArr.filter(item => item.id !== movie.id);
    localStorage.setItem('watchedMovie', JSON.stringify(modifiedArr));
    watchedArr = modifiedArr;
    testBtnWatch(movie, watchedBtn, removeWatchedBtn);
    refs.libraryBtn.classList.add('header__btn--accent');
    refs.homeBtn.classList.remove('header__btn--accent');
    onOpenLibraryPage();
    renderWatchedMovies();
    showModal.close();
    if (watchedArr.length === 0) {
      refs.libraryBtn.classList.remove('header__btn--accent');
      refs.homeBtn.classList.add('header__btn--accent');
      renderTrendingMovies();
      onOpenHomePage();
    }
  });
};

const removeFromQueue = (movie, queueBtn, removeQueueBtn, showModal) => {
  removeQueueBtn.addEventListener('click', () => {
    const modifiedArr = queueArr.filter(item => item.id !== movie.id);
    localStorage.setItem('queueMovie', JSON.stringify(modifiedArr));
    queueArr = modifiedArr;
    testBtnQueue(movie, queueBtn, removeQueueBtn);
    refs.libraryBtn.classList.add('header__btn--accent');
    refs.homeBtn.classList.remove('header__btn--accent');
    onOpenLibraryPage();
    renderQueueMovies();
    showModal.close();
    if (queueArr.length === 0) {
      refs.libraryBtn.classList.remove('header__btn--accent');
      refs.homeBtn.classList.add('header__btn--accent');
      renderTrendingMovies();
      onOpenHomePage();
    }
  });
};

const addToQueue = (movie, queueBtn, removeQueueBtn, showModal) => {
  queueBtn.addEventListener('click', () => {
    queueArr.push(movie);
    localStorage.setItem('queueMovie', JSON.stringify(queueArr));
    testBtnQueue(movie, queueBtn, removeQueueBtn);
    showModal.close();
  });
};

const testBtnWatch = (movie, watchedBtn, removeWatchedBtn) => {
  const storageMovieArr = watchedArr;

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
  const storageQueueMovieArr = queueArr;

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
