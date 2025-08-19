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

// Змінні для пагінації
let currentPage = 1;
const perPage = 12;

// ------------------- Утиліти -------------------

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

/**
 * Затримка у мілісекундах
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ------------------- Логіка завантаження -------------------

async function fetchImages(page = 1) {
  showLoader();
  hideLoadMoreButton();

  try {
    // Робимо запит до API
    const response = await fetch(
      `https://pixabay.com/api/?key=51734453-5d46674fc0c6d7944706aca6e&q=flowers&page=${page}&per_page=${perPage}`
    );
    const data = await response.json();

    // Мінімальна затримка 5 секунд для спінера
    await sleep(5000);

    return data.hits;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    hideLoader();
  }
}

async function initGallery() {
  clearGallery();
  currentPage = 1;
  const images = await fetchImages(currentPage);
  createGallery(images);

  if (images.length === perPage) {
    showLoadMoreButton();
  }
}

async function loadMore() {
  currentPage += 1;
  const images = await fetchImages(currentPage);
  createGallery(images);

  if (images.length < perPage) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

// Події
loadMoreBtn.addEventListener("click", loadMore);

// Запуск
initGallery();