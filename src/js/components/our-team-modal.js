import { renderSliderMarkup } from './our-team-slider';

const refs = {
  openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
  closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
  lightboxFooterModal: document.querySelector('.js-lightbox'),
  backdropClick: document.querySelector('.modal-background'),
  bodyRef: document.querySelector('body'),
};

refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();
  window.addEventListener('keydown', onEscClick); //для Esc
  refs.lightboxFooterModal.classList.remove('visually-hidden');
  refs.bodyRef.classList.add('modal-open');

  renderSliderMarkup();
}

refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  window.removeEventListener('keydown', onEscClick); //для Esc
  refs.lightboxFooterModal.classList.add('visually-hidden');
  refs.bodyRef.classList.remove('modal-open');
}

refs.backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscClick(event) {
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
