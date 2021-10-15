import { getSearchedMovies } from '../api/movies-api';
import debounce from 'lodash.debounce';
import movieCardsTpl from '../../templates/movie-card.hbs';
import changeData from './change-array-data';
import Pagination from 'tui-pagination';
import noData from './no-data-to-render';
import { renderTrendingMovies } from './render-trending-movies';
import { createPagination, scrollToNewPage } from './pagination';

//  поиск фильмов в строле поиска по ключевому слову

const refs = {
  inputField: document.querySelector('.js-search-form'),
  outputField: document.querySelector('#gallery'),
  container: document.getElementById('tui-pagination-container'),
  searchForm: document.querySelector('form.search-form'),
};

refs.inputField.addEventListener('input', debounce(onFilterChange, 500));
refs.searchForm.addEventListener('submit', e => e.preventDefault());

export function onFilterChange(e) {
  const inputValue = e.target.value.toLowerCase().trim();
  if (!inputValue) {
    renderTrendingMovies();
    createPagination();
    return;
  }
  try {
    getSearchedMovies(inputValue).then(data => {
      if (data.total_results <= 20) {
        refs.container.innerHTML = '';
      } else {
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
      }

      if (data.results.length === 0) {
        noData('Sorry. There is nothing for your request');
        return;
      }

      const newData = changeData(data.results);
      refs.outputField.innerHTML = movieCardsTpl(newData);
    });
  } catch (e) {
    console.log('error', e);
  } finally {
    // block finally
  }
}
