import movieCardTpl from '../../templates/movie-card.hbs';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.getElementById('btn-queue'),
  galleryContainer: document.getElementById('gallery')
}
const savedMoviesQueue = localStorage.getItem('queueMovie')
const moviesArrayQueue = JSON.parse(savedMoviesQueue)
const savedMoviesWatched = localStorage.getItem('watchedMovie')
const moviesArrayWatched = JSON.parse(savedMoviesWatched)

refs.btnWatched.addEventListener('click',renderMovies(moviesArrayQueue))
refs.btnWatched.addEventListener('click',renderMovies(moviesArrayWatched))
   
function renderMovies (moviesArray) {
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArray);
}


