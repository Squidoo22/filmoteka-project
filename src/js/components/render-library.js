import movieCardTpl from '../../templates/movie-card.hbs';
const refs = {
  btnLibrary: document.getElementById('btn-library'),
  galleryContainer: document.getElementById('gallery')
}
const savedMoviesQueue = localStorage.getItem('queueMovie')
const moviesArrayQueue = JSON.parse(savedMoviesQueue)


refs.btnLibrary.addEventListener('click', renderMovies(moviesArrayQueue))

   
function renderMovies (moviesArray) {
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArray);
}


