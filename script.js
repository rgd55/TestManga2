// Объявляем глобальные переменные
let currentPage = 1;
let totalPages = 5; // ПОМЕНЯЙТЕ ЭТО ЧИСЛО НА РЕАЛЬНОЕ
let xDown = null;

// Главная функция, которая запускается после загрузки страницы
function initApp() {
    console.log("App started!"); // Сообщение в консоль для отладки
    alert("Добро пожаловать! Страниц в главе: " + totalPages); // Всплывающее окно. Уберите его после теста.

    // Находим элемент с изображением
    const imgElement = document.getElementById('mangaImage');
    if (!imgElement) {
        alert('Ошибка: Элемент с id="mangaImage" не найден! Проверь HTML.');
        return;
    }

    // Пытаемся загрузить первое изображение
    updateImage();

    // Вешаем обработчики свайпов на весь документ
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    alert("Обработчики свайпов добавлены."); // Всплывающее окно для проверки. Уберите потом.
}

// Функция обновления картинки на экране
function updateImage() {
    const imgElement = document.getElementById('mangaImage');
    imgElement.src = `page${currentPage}.jpg`;
    console.log("Showing page: " + currentPage); // Пишем в консоль, какая страница показана

    // Обработчик ошибки загрузки изображения
    imgElement.onerror = function() {
        alert('Ошибка загрузки страницы: page' + currentPage + '.jpg. Файл существует?');
    };
}

// Остальные функции (handleTouchStart, handleTouchMove, nextPage, prevPage) остаются без изменений, как в предыдущем примере.

// Запускаем наше приложение не сразу, а после полной загрузки HTML-документа
document.addEventListener('DOMContentLoaded', initApp);