import { getTrendingMovies } from '../api/movies-api';
import movieCardTpl from '../../templates/movie-card.hbs';
import changeData from './change-array-data';

const galleryContainer = document.getElementById('gallery');

export const renderTrendingMovies = (page = 1) => {
  return getTrendingMovies(page)
    .then(data => {
      const moviesArray = changeData(data.results);
      return movieCardTpl(moviesArray);
    })
    .then(markup => {
      galleryContainer.innerHTML = markup;
      return galleryContainer;
    })
    .catch(error => console.log(error));
};
