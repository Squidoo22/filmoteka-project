import movieCardTpl from '../../templates/movie-card.hbs';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.getElementById('btn-queue'),
  galleryContainer: document.getElementById('gallery'),
};

refs.btnQueue.addEventListener('click', renderMovies);

function renderMovies() {
  const savedMoviesQueue = localStorage.getItem('queueMovie');
  const moviesArrayQueue = JSON.parse(savedMoviesQueue);
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayQueue);
}
