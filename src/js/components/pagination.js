import Pagination from 'tui-pagination';
import { renderTrendingMovies } from './render-trending-movies';
import { getTrendingMovies } from '../api/movies-api';

const onPageClick = async event => {
  const renderNewPage = await renderTrendingMovies(event.page);
  scrollToNewPage();
  return renderNewPage;
};

const scrollToNewPage = () => {
  document.querySelector('.gallery').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
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
            '<span class="tui-ico-{{type}}">ololo</span>' +
            '</a>',
          disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">ololo</span>' +
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
