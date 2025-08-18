import axios from 'axios'; // Імпортуємо бібліотеку axios для HTTP-запитів

const BASE_URL = 'https://pixabay.com/api/'; // Базова URL-адреса API Pixabay
const API_KEY = '51734453-5d46674fc0c6d7944706aca6e'; // особистий ключ API

/**
 * Виконує запит до Pixabay API та повертає об'єкт з результатами.
 * @param {string} query - Пошуковий запит
 * @param {number} page - Номер сторінки
 * @param {number} perPage - Кількість картинок на сторінку (за замовчуванням 15)
 * @returns {Promise<Object>} - Об'єкт з результатами API { hits, total, totalHits }
 */
export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, { // Виконуємо GET-запит через axios
      params: {
        key: API_KEY,             // Обов'язковий ключ API
        q: query,                 // Пошуковий запит (наприклад, 'cats')
        image_type: 'photo',      // Тип зображення (тут фото)
        orientation: 'horizontal',// Додатковий параметр: горизонтальні картинки
        safesearch: true,         // Додатковий параметр: безпечний пошук
        page: page,               // Номер сторінки пагінації
        per_page: perPage,        // Кількість картинок на сторінку
      },
    });

    return response.data; // Повертаємо дані: { hits, total, totalHits }
  } catch (error) {
    console.error('Error fetching images:', error); // Лог помилки у консолі
    throw error; // Проброс помилки далі, щоб можна було обробити її у UI
  }
}
