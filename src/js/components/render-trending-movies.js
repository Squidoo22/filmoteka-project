import { getTrendingMovies } from '../api/movies-api';
import movieCardTpl from '../../templates/movie-card.hbs';

const galleryContainer = document.getElementById('gallery');

export const renderTrendingMovies = (page = 1) => {
  return getTrendingMovies(page)
    .then(data => {
      const moviesArray = data.results;
      return movieCardTpl(moviesArray);
    })
    .then(markup => {
      galleryContainer.innerHTML = markup;
      return galleryContainer;
    })
    .catch(error => console.log(error));
};
