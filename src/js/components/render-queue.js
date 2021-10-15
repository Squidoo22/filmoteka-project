import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import { createPaginationInLibrary } from './pagination';

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
    return;
  }
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayQueue);

  createPaginationInLibrary(moviesArrayQueue, refs.container);
}
