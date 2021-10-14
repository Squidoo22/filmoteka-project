import { getSearchedMovies } from '../api/movies-api';
import debounce from 'lodash.debounce';
import movieCardsTpl from '../../templates/movie-card.hbs';
import changeData from './change-array-data';
import Pagination from 'tui-pagination';

//  поиск фильмов в строле поиска по ключевому слову

const refs = {
  inputField: document.querySelector('.js-search-form'),
  outputField: document.querySelector('#gallery'),
  container: document.getElementById('tui-pagination-container'),
};

refs.inputField.addEventListener('input', debounce(onFilterChange, 500));

const scrollToNewPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function onFilterChange(e) {
  const inputValue = e.target.value.toLowerCase().trim();
  if (!inputValue) return;
  try {
    getSearchedMovies(inputValue).then(data => {
      const newData = changeData(data.results);
      refs.outputField.innerHTML = movieCardsTpl(newData);
      const myPagination = new Pagination(refs.container, {
        totalItems: data.total_results,
        itemsPerPage: 20,
        visiblePages: 5,
        page: 1,
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: false,
      });
      myPagination.on('afterMove', function (eventData) {
        let currentPage = eventData.page;
        getSearchedMovies(inputValue, currentPage).then(response => {
          const newData = changeData(response.results);
          refs.outputField.innerHTML = movieCardsTpl(newData);
        });
        scrollToNewPage();
      });
    });
  } catch (e) {
    console.log('error', e);
  } finally {
    // block finally
  }
}
