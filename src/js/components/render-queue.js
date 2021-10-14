import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import changeData from './change-array-data';


const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.getElementById('btn-queue'),
  galleryContainer: document.getElementById('gallery'),
};

refs.btnQueue.addEventListener('click', renderQueueMovies);

export function renderQueueMovies() {
  const savedMoviesQueue = localStorage.getItem('queueMovie');
  const moviesArrayQueue = JSON.parse(savedMoviesQueue);
  if (!moviesArrayQueue || moviesArrayQueue.length === 0) {
    noData('You have not added anything here yet');
    return;
  }

  const newData = changeData(moviesArrayQueue);
  refs.galleryContainer.innerHTML = movieCardTpl(newData);
}
