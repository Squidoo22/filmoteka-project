export default function (message) {
  const refs = {
    galleryContainer: document.querySelector('#gallery'),
  };

  const li = `<li class="empty-library__bg-image empty-library__title">
                    <p class="empty-library__message">${message}</p>
                </li>`;
  refs.galleryContainer.innerHTML = li;
}
