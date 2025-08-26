// Глобальные переменные
let currentPage = 1;
const totalPages = 5;
let startX = null;
let startY = null;

// Элементы DOM
const imageElement = document.getElementById('mangaImage');
const debugInfo = document.getElementById('debugInfo');

// Функция для отладки - выводит информацию на экран
function debugLog(message) {
    debugInfo.textContent = message;
    console.log(message);
}

// Функция обновления изображения
function updateImage() {
    debugLog("Загрузка страницы: " + currentPage);
    imageElement.src = `page${currentPage}.jpg`;
}

// Функции для перелистывания страниц
function nextPage() {
    debugLog("nextPage вызвана");
    if (currentPage < totalPages) {
        currentPage++;
        updateImage();
    } else {
        debugLog("Это последняя страница!");
    }
}

function prevPage() {
    debugLog("prevPage вызвана");
    if (currentPage > 1) {
        currentPage--;
        updateImage();
    } else {
        debugLog("Это первая страница!");
    }
}

// Обработчики свайпов
document.addEventListener('touchstart', function(event) {
    debugLog("touchstart");
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    event.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    if (startX === null || startY === null) return;
    
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    
    const diffX = startX - currentX;
    const diffY = startY - currentY;
    
    // Если горизонтальное движение значительно больше вертикального
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
        debugLog(`Свайп detected: ${diffX > 0 ? 'влево' : 'вправо'}`);
        
        if (diffX > 0) {
            nextPage();
        } else {
            prevPage();
        }
        
        startX = null;
        startY = null;
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', function() {
    startX = null;
    startY = null;
});

// Обработчик ошибок загрузки изображения
imageElement.onerror = function() {
    debugLog("Ошибка загрузки изображения: page" + currentPage + ".jpg");
};

// Инициализация
debugLog("Инициализация...");
updateImage();

// Делаем функции глобальными, чтобы они были доступны из HTML
window.nextPage = nextPage;
window.prevPage = prevPage;