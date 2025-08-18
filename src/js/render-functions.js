import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Селектори DOM
const galleryContainer = document.querySelector(".gallery"); // Контейнер для карток галереї
const loader = document.querySelector(".loader");           // Індикатор завантаження
const loadMoreBtn = document.querySelector(".load-more");   // Кнопка "Load More"

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt", // Беремо підпис з атрибута alt зображення
  captionDelay: 250,   // Затримка перед появою підпису
});

/**
 * Додає зображення у галерею
 * @param {Array} images - Масив об'єктів зображень
 */
export function createGallery(images) {
  // Генеруємо HTML для кожної картинки
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
    .join(""); // Обʼєднуємо всі картки в один рядок

  // Вставляємо згенеровану розмітку у контейнер галереї
  galleryContainer.insertAdjacentHTML("beforeend", markup);

  // Оновлюємо SimpleLightbox після додавання нових елементів
  lightbox.refresh();
}

/**
 * Очищає галерею (видаляє всі елементи)
 */
export function clearGallery() {
  galleryContainer.innerHTML = "";
}

/**
 * Показує індикатор завантаження
 */
export function showLoader() {
  loader.classList.add("visible");
}

/**
 * Ховає індикатор завантаження
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
