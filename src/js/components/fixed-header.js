const header = document.querySelector('.header');
const moviesSection = document.querySelector('.content-wrapper');

const headerHeight = header.offsetHeight;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;

  if (scrollDistance > lastScrollTop && !header.classList.contains('header--fixed')) {
    header.classList.remove('header--fixed');
    moviesSection.style.marginTop = null;
  } else {
    header.classList.add('header--fixed');
    moviesSection.style.marginTop = `${headerHeight}px`;
  }

  if (scrollDistance === 0 || scrollDistance < 100) {
    header.classList.remove('header--fixed');
    moviesSection.style.marginTop = null;
  }

  lastScrollTop = scrollDistance;
});
