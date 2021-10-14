import movieCardTpl from '../../templates/movie-card.hbs';
const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnLibrary: document.getElementById('btn-library'),
  galleryContainer: document.getElementById('gallery'),
};

refs.btnLibrary.addEventListener('click', renderWatchedMovies);
refs.btnWatched.addEventListener('click', renderWatchedMovies);

export function renderWatchedMovies() {
  const savedMoviesWatched = localStorage.getItem('watchedMovie');
  const moviesArrayWatched = JSON.parse(savedMoviesWatched);
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayWatched);
}
