import '../sass/main.scss';
import { getGenres, getMovieById, getSearchedMovies, getTrendingMovies } from './api/movies-api';
import './components/search-by-input';
import { renderTrendingMovies } from './components/render-trending-movies';
import { createPagination } from './components/pagination';

// getSearchedMovies('avengers').then(movies => console.log(movies.results));
// getTrendingMovies().then(movies => console.log(movies.results));
// getMovieById(100).then(movie => console.log(movie));
// getGenres().then(genres => console.log(genres));

renderTrendingMovies();
createPagination();
