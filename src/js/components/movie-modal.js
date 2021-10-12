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
    console.log(movie);
    const showModal = basicLightbox.create(
      `
              <div class="modal">
              <div class="img__container" style="background-image: url('https://image.tmdb.org/t/p/w500/${movie.poster_path}');">

              </div>
                <button type="button" class="modal__button" id="watched">add to Watched</button>
                <button type="button" class="modal__button modal__button--position" id="queue">add to queue</button>
            </div>
          `,
    );
    showModal.show();
    if (showModal.show() === true) {
      addToWatched(movie);
      addToQueue(movie);
    }
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = movie => {
  const watchedBtn = document.querySelector('#watched');
  watchedBtn.addEventListener('click', () => {
    watchedArr.push(movie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedArr));
  });
};

const addToQueue = movie => {
  const queueBtn = document.querySelector('#queue');
  queueBtn.addEventListener('click', () => {
    queueArr.push(movie);
    localStorage.setItem('queueMovie', JSON.stringify(queueArr));
  });
};
