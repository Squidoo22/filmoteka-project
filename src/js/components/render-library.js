import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import { createPaginationInLibrary } from './pagination';
import changeData from './change-array-data';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.querySelector('#btn-queue'),
  btnLibrary: document.getElementById('btn-library'),
  galleryContainer: document.getElementById('gallery'),
  container: document.getElementById('tui-pagination-container'),
  gallerySection: document.querySelector('#movies'),
};

refs.btnLibrary.addEventListener('click', renderWatchedMovies);
refs.btnWatched.addEventListener('click', renderWatchedMovies);

export function renderWatchedMovies() {
  refs.btnWatched.classList.add('is-active');
  refs.btnQueue.classList.remove('is-active');
  const savedMoviesWatched = localStorage.getItem('watchedMovie');
  const moviesArrayWatched = JSON.parse(savedMoviesWatched);
  if (!moviesArrayWatched || moviesArrayWatched.length === 0) {
    noData('You have not added anything here yet');
    createPaginationInLibrary(moviesArrayWatched, refs.container);
    return;
  }
  const newData = changeData(moviesArrayWatched);
  refs.galleryContainer.innerHTML = movieCardTpl(newData);

  createPaginationInLibrary(newData, refs.container);
}
