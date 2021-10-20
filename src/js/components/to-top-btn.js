const scrollTopBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight } = document.documentElement;
  if (scrollTop > clientHeight) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', scrollToTop);

function scrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
