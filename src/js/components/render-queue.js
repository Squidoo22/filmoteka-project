import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import { createPaginationInLibrary } from './pagination';
import changeData from './change-array-data';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.getElementById('btn-queue'),
  galleryContainer: document.getElementById('gallery'),
  container: document.getElementById('tui-pagination-container'),
};

refs.btnQueue.addEventListener('click', renderQueueMovies);

export function renderQueueMovies() {
  const savedMoviesQueue = localStorage.getItem('queueMovie');
  const moviesArrayQueue = JSON.parse(savedMoviesQueue);
  if (!moviesArrayQueue || moviesArrayQueue.length === 0) {
    noData('You have not added anything here yet');
    createPaginationInLibrary(moviesArrayQueue, refs.container);
    return;
  }
  const newData = changeData(moviesArrayQueue);
  refs.galleryContainer.innerHTML = movieCardTpl(newData);

  createPaginationInLibrary(newData, refs.container);
}
