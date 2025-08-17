// render-functions.js
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Селектори
const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

// Екземпляр SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

/**
 * Додає зображення у галерею
 * @param {Array} images - Масив об'єктів зображень
 */
export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
    <a href="${img.largeImageURL}">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
    </a>
  `
    )
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);

  // Оновлюємо SimpleLightbox після додавання нових елементів
  lightbox.refresh();
}

/**
 * Очищає галерею
 */
export function clearGallery() {
  galleryContainer.innerHTML = "";
}

/**
 * Показує лоадер
 */
export function showLoader() {
  loader.classList.add("visible");
}

/**
 * Прибирає лоадер
 */
export function hideLoader() {
  loader.classList.remove("visible");
}


// Показує кнопку Load More
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

// Прибирає кнопку Load More
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}



// Пояснення:

// galleryContainer – контейнер, куди додаємо HTML зображень.

// loader – елемент лоадера, якому додаємо/прибираємо клас hidden.

// loadMoreBtn – кнопка “Load more”.

// lightbox.refresh() – оновлює SimpleLightbox після додавання нових зображень.

// createGallery(images) – приймає масив зображень (наприклад, з Pixabay API) і додає розмітку.

// Важливо, щоб у CSS для .loader.visible та .load-more.visible були стилі для показу/приховування елементів.