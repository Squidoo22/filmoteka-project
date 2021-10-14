import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import Pagination from 'tui-pagination';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnLibrary: document.getElementById('btn-library'),
  galleryContainer: document.getElementById('gallery'),
  container: document.getElementById('tui-pagination-container'),
};

refs.btnLibrary.addEventListener('click', renderWatchedMovies);
refs.btnWatched.addEventListener('click', renderWatchedMovies);

const scrollToNewPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function renderWatchedMovies() {
  const savedMoviesWatched = localStorage.getItem('watchedMovie');
  const moviesArrayWatched = JSON.parse(savedMoviesWatched);
  if (!moviesArrayWatched || moviesArrayWatched.length === 0) {
    noData('You have not added anything here yet');
    return;
  }
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayWatched);

  if (moviesArrayWatched.length <= 20) {
    refs.container.innerHTML = '';
  } else {
    const myPagination = new Pagination(refs.container, {
      totalItems: moviesArrayWatched.length,
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
      for (let i = 0; i < Math.ceil(moviesArrayWatched.length / size); i++) {
        subarray[i] = moviesArrayWatched.slice(i * size, i * size + size);
      }
      let currentPage = myPagination._currentPage - 1;
      refs.galleryContainer.innerHTML = movieCardTpl(subarray[currentPage]);

      scrollToNewPage();
    });
  }
}
