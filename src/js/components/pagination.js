import Pagination from 'tui-pagination';
import { renderTrendingMovies } from './render-trending-movies';
import { getTrendingMovies } from '../api/movies-api';
import movieCardTml from '../../templates/movie-card.hbs';

const onPageClick = async event => {
  const renderTrendingPage = await renderTrendingMovies(event.page);
  scrollToNewPage();
  return renderTrendingPage;
};

export const scrollToNewPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const createPagination = () => {
  const container = document.getElementById('tui-pagination-container');
  getTrendingMovies()
    .then(movies => {
      const pagination = new Pagination(container, {
        totalItems: movies.total_results,
        itemsPerPage: 20,
        visiblePages: 5,
        page: 1,
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: false,
        template: {
          page: '<a href="#" class="tui-page-btn">{{page}}</a>',
          currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
          moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
          disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
          moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>',
        },
      });
      return pagination;
    })
    .then(pagination => {
      pagination.on('beforeMove', onPageClick);
    });
};

export const createPaginationInLibrary = (array, container) => {
  const galleryContainer = document.getElementById('gallery');

  if (!array || array === null || array.length <= 20) {
    container.innerHTML = '';
  } else {
    const myPagination = new Pagination(container, {
      totalItems: array.length,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      usageStatistics: false,
    });

    myPagination.on('afterMove', function () {
      let size = 20;
      let subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      let currentPage = myPagination._currentPage - 1;
      galleryContainer.innerHTML = movieCardTml(subarray[currentPage]);

      scrollToNewPage();
    });
  }
};
