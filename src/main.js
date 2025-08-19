
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

// Імпорт iziToast через збірку
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Селектори
const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

// Стан додатка
let query = '';
let page = 1;
const perPage = 15; // фіксована кількість зображень
let totalHits = 0;

// Функція пошуку зображень
async function searchImages(resetPage = false) {
  if (resetPage) page = 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page, perPage);

    if (data.hits.length === 0) {
      iziToast.error({ title: 'Error', message: 'No images found. Try another query.' });
      hideLoader();
      return;
    }

    totalHits = data.totalHits;

    if (page === 1) clearGallery(); // Очищуємо галерею при новому пошуку
    createGallery(data.hits);

    // Показуємо кнопку Load More, якщо ще є зображення
    if (totalHits > page * perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
    }

    // Повідомлення про успішний пошук
    if (page === 1) {
      iziToast.success({ title: 'Success', message: `Found ${totalHits} images.` });
    }

  } catch (error) {
    console.error(error);
    iziToast.error({ title: 'Error', message: 'Something went wrong. Try again later.' });
  } finally {
    hideLoader();
  }
}

// Обробник сабміту форми
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query!' });
    return;
  }
  await searchImages(true);
});

// Обробник кнопки Load More
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits);

    // Плавне прокручування на 2 висоти першої карточки
    const gallery = document.querySelector('.gallery');
    if (gallery.firstElementChild) {
      const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Показуємо або ховаємо кнопку Load More
    if (totalHits > page * perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
    }

  } catch (error) {
    console.error(error);
    iziToast.error({ title: 'Error', message: 'Something went wrong. Try again later.' });
  } finally {
    hideLoader();
  }
});

import axios from 'axios';

axios.get('https://pixabay.com/api/?key=51734453-5d46674fc0c6d7944706aca6e&q=cat&image_type=photo&per_page=3')
  .then(response => {
    console.log('Axios працює:', response.data);
  })
  .catch(error => {
    console.error('Помилка Axios:', error);
  });


// Перевірка спінера
const spinner = document.querySelector('.loader');
if (spinner) {
  console.log('Spinner працює ✅');
} else {
  console.log('Spinner не знайдено ❌');
}

// Перевірка iziToast
try {
  iziToast.success({ title: 'Test', message: 'iziToast працює (консольно тест) 👍', timeout: 1 });
  console.log('iziToast підключено ✅');
} catch (error) {
  console.log('iziToast не підключено ❌', error);
}