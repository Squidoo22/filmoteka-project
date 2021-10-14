import movieCardTpl from '../../templates/movie-card.hbs';
import noData from './no-data-to-render';
import Pagination from 'tui-pagination';

const refs = {
  btnWatched: document.getElementById('btn-watched'),
  btnQueue: document.getElementById('btn-queue'),
  galleryContainer: document.getElementById('gallery'),
  container: document.getElementById('tui-pagination-container'),
};

refs.btnQueue.addEventListener('click', renderQueueMovies);

const scrollToNewPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function renderQueueMovies() {
  const savedMoviesQueue = localStorage.getItem('queueMovie');
  const moviesArrayQueue = JSON.parse(savedMoviesQueue);
  if (!moviesArrayQueue || moviesArrayQueue.length === 0) {
    noData('You have not added anything here yet');
    return;
  }
  refs.galleryContainer.innerHTML = movieCardTpl(moviesArrayQueue);

  if (moviesArrayQueue.length <= 20) {
    refs.container.innerHTML = '';
  } else {
    const myPagination = new Pagination(refs.container, {
      totalItems: moviesArrayQueue.length,
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
      for (let i = 0; i < Math.ceil(moviesArrayQueue.length / size); i++) {
        subarray[i] = moviesArrayQueue.slice(i * size, i * size + size);
      }
      let currentPage = myPagination._currentPage - 1;
      refs.galleryContainer.innerHTML = movieCardTpl(subarray[currentPage]);

      scrollToNewPage();
    });
  }
}
