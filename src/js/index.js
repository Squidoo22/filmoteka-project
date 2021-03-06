import '../sass/main.scss';
import './components/search-by-input';
import './components/our-team-modal';
import './components/movie-modal';
import './components/render-library';
import './components/render-queue';
import './components/change-home-library';
import './components/card-buttons';
import './components/to-top-btn';

import { renderTrendingMovies } from './components/render-trending-movies';
import { getGenres, getMovieById, getSearchedMovies, getTrendingMovies } from './api/movies-api';
import { createPagination } from './components/pagination';
import { colorSwitcher } from './components/color-switcher';

// getSearchedMovies('avengers').then(movies => console.log(movies.results));
// getTrendingMovies().then(movies => console.log(movies.results));
// getMovieById(100).then(movie => console.log(movie));
// getGenres().then(genres => console.log(genres));

document.addEventListener('DOMContentLoaded', () => {
  renderTrendingMovies();
  createPagination();
});

window.onload = function () {
  let preloader = document.getElementById('preloader');
  preloader.classList.add('hide-preloader');
  setInterval(function () {
    preloader.classList.add('preloader-hidden');
  }, 1500);
};
