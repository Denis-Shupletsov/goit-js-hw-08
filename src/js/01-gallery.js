import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "../css/common.css"
import "../css/01-gallery.css"

const createItemsMarkup = galleryItems
    .map(({ preview, original, description }) => {
        return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
            </a>
    </li>`;
    }).join('');


const containerEl = document.querySelector('.gallery');
containerEl.insertAdjacentHTML('beforeend', createItemsMarkup);

let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    doubleTapZoom: 1,
    scrollZoom: false,
});
containerEl.addEventListener('click', event => {
    event.preventDefault();

    const eTarget = event.target;
    if (!eTarget.classList.contains('gallery__image')) {
        return;
    }
});





