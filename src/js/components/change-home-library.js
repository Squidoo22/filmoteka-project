import { createPagination } from './pagination';
import { renderTrendingMovies } from './render-trending-movies';

const refs = {
  homeBtn: document.querySelector('.js-btn-home'),
  libraryBtn: document.querySelector('.js-btn-library'),
  watchedBtn: document.querySelector('#btn-watched'),
  queueBtn: document.querySelector('#btn-queue'),
  homePage: document.querySelector('.js-home'),
  libraryPage: document.querySelector('.js-library'),
  logoClick: document.querySelector('.logo'),
  inputField: document.querySelector('.js-search-form'),
  headerBg: document.querySelector('.header'),
};

refs.logoClick.addEventListener('click', onOpenHomePage);
refs.homeBtn.addEventListener('click', onOpenHomePage);
refs.libraryBtn.addEventListener('click', onOpenLibraryPage);

export function onOpenHomePage() {
  refs.watchedBtn.classList.remove('is-active');
  refs.queueBtn.classList.remove('is-active');
  refs.inputField.value = '';
  refs.homePage.classList.remove('visually-hidden');
  refs.libraryPage.classList.add('visually-hidden');
  refs.libraryBtn.classList.remove('header__btn--accent');
  refs.homeBtn.classList.add('header__btn--accent');
  changeBgImage();
  renderTrendingMovies();
  createPagination();
}

export function onOpenLibraryPage() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  refs.libraryPage.classList.remove('visually-hidden');
  refs.homePage.classList.add('visually-hidden');
  refs.homeBtn.classList.remove('header__btn--accent');
  refs.libraryBtn.classList.add('header__btn--accent');
  changeBgImage();
}

function changeBgImage() {
  if (refs.homePage.classList.contains('visually-hidden')) {
    refs.headerBg.classList.replace('header__home-bg', 'header__library-bg');
  } else {
    refs.headerBg.classList.replace('header__library-bg', 'header__home-bg');
  }
}
