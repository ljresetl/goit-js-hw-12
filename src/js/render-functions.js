import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Селектори DOM
const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

/**
 * Додає зображення у галерею
 * @param {Array} images
 */
export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
    <a href="${img.largeImageURL}" class="gallery-item">
      <div class="photo-card">
        <img class="photo-card-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <ul class="info">
          <li><b>Likes:</b> ${img.likes}</li>
          <li><b>Views:</b> ${img.views}</li>
          <li><b>Comments:</b> ${img.comments}</li>
          <li><b>Downloads:</b> ${img.downloads}</li>
        </ul>
      </div>
    </a>
  `
    )
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

/**
 * Очищає галерею
 */
export function clearGallery() {
  galleryContainer.innerHTML = "";
}

/**
 * Показує спінер
 */
export function showLoader() {
  loader.classList.add("visible");
}

/**
 * Ховає спінер
 */
export function hideLoader() {
  loader.classList.remove("visible");
}

/**
 * Показує кнопку "Load More"
 */
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

/**
 * Ховає кнопку "Load More"
 */
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}
