const refs = {
  homeBtn: document.querySelector('.js-btn-home'),
  libraryBtn: document.querySelector('.js-btn-library'),
  homePage: document.querySelector('.js-home'),
  libraryPage: document.querySelector('.js-library'),
  logoClick: document.querySelector('.logo'),
};

refs.logoClick.addEventListener('click', onOpenHomePage);
refs.homeBtn.addEventListener('click', onOpenHomePage);
refs.libraryBtn.addEventListener('click', onOpenLibraryPage);

function onOpenHomePage() {
  refs.homePage.classList.remove('visually-hidden');
  refs.libraryPage.classList.add('visually-hidden');
  refs.libraryBtn.classList.remove('header__btn--accent');
  refs.homeBtn.classList.add('header__btn--accent');
}

function onOpenLibraryPage() {
  refs.libraryPage.classList.remove('visually-hidden');
  refs.homePage.classList.add('visually-hidden');
  refs.homeBtn.classList.remove('header__btn--accent');
  refs.libraryBtn.classList.add('header__btn--accent');
}
