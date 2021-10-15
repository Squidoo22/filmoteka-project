import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import { createPaginationInLibrary } from './pagination';
import changeData from './change-array-data';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnLibrary: document.getElementById('btn-library'),
  galleryContainer: document.getElementById('gallery'),
  container: document.getElementById('tui-pagination-container'),
};

refs.btnLibrary.addEventListener('click', renderWatchedMovies);
refs.btnWatched.addEventListener('click', renderWatchedMovies);

export function renderWatchedMovies() {
  const savedMoviesWatched = localStorage.getItem('watchedMovie');
  const moviesArrayWatched = JSON.parse(savedMoviesWatched);
  if (!moviesArrayWatched || moviesArrayWatched.length === 0) {
    noData('You have not added anything here yet');
    return;
  }
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayWatched);

  createPaginationInLibrary(moviesArrayWatched, refs.container);
  const newData = changeData(moviesArrayWatched);
  refs.galleryContainer.innerHTML = movieCardTpl(newData);
}
