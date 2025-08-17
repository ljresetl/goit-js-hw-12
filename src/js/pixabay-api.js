const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51734453-5d46674fc0c6d7944706aca6e';

/**
 * Виконує запит до Pixabay API та повертає об'єкт з результатами.
 * @param {string} query - Пошуковий запит
 * @param {number} page - Номер сторінки
 * @param {number} perPage - Кількість картинок на сторінку (за замовчуванням 15)
 * @returns {Promise<Object>} - Об'єкт з результатами API { hits, total, totalHits }
 */
export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&page=${page}&per_page=${perPage}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result; // включає hits, total, totalHits
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}


// Пояснення:

// BASE_URL – базова адреса API Pixabay.

// API_KEY – мій особистий ключ.

// getImagesByQuery(query, page) – асинхронна функція, яка:

// формує URL з параметрами пошуку;

// робить fetch запит;

// перевіряє, чи відповів сервер успішно;

// повертає result (включає hits, total, totalHits).