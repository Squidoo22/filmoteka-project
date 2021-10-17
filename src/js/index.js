import '../sass/main.scss';
import './components/search-by-input';
import './components/our-team-modal';
import './components/movie-modal';
import './components/render-library';
import './components/render-queue';
import './components/change-home-library';
import { renderTrendingMovies } from './components/render-trending-movies';
import { getGenres, getMovieById, getSearchedMovies, getTrendingMovies } from './api/movies-api';
import { createPagination } from './components/pagination';

// getSearchedMovies('avengers').then(movies => console.log(movies.results));
// getTrendingMovies().then(movies => console.log(movies.results));
// getMovieById(100).then(movie => console.log(movie));
// getGenres().then(genres => console.log(genres));


document.addEventListener('DOMContentLoaded', () => {
    renderTrendingMovies();
    createPagination();
})
