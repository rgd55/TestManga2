// Глобальные переменные
let currentPage = 1;
const totalPages = 5;
let startX = null;
let startY = null;

// Переменные для масштабирования
let initialDistance = null;
let currentScale = 1;
let maxScale = 3;
let minScale = 1;

// Элементы DOM
const imageElement = document.getElementById('mangaImage');
const imageContainer = document.getElementById('imageContainer');
const zoomInfo = document.getElementById('zoomInfo');

// Функция обновления изображения
function updateImage() {
    if (imageElement) {
        imageElement.src = `page${currentPage}.jpg`;
        // Сброс масштаба при смене страницы
        resetZoom();
    }
}

// Функция сброса масштаба
function resetZoom() {
    currentScale = 1;
    if (imageElement) {
        imageElement.style.transform = `scale(1)`;
        updateZoomInfo();
    }
}

// Функция обновления информации о масштабе
function updateZoomInfo() {
    if (zoomInfo) {
        zoomInfo.textContent = `${Math.round(currentScale * 100)}%`;
    }
}

// Функции для перелистывания страниц
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateImage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateImage();
    }
}

// Обработчики свайпов
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 1) {
        // Одиночное касание - для свайпов
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
        // Двойное касание - для масштабирования
        initialDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
    }
    
    event.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    if (event.touches.length === 1 && startX !== null && startY !== null) {
        // Обработка свайпов
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
            if (diffX > 0) {
                nextPage();
            } else {
                prevPage();
            }
            
            startX = null;
            startY = null;
            event.preventDefault();
        }
    } else if (event.touches.length === 2 && initialDistance !== null) {
        // Обработка масштабирования
        const currentDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        
        if (initialDistance > 0) {
            let scale = currentDistance / initialDistance;
            scale = Math.max(minScale, Math.min(maxScale, currentScale * scale));
            
            currentScale = scale;
            
            if (imageElement) {
                imageElement.style.transform = `scale(${scale})`;
                updateZoomInfo();
            }
            
            event.preventDefault();
        }
    }
}, { passive: false });

document.addEventListener('touchend', function() {
    // Сброс состояний при завершении касания
    startX = null;
    startY = null;
    initialDistance = null;
});

// Обработчик двойного тапа для сброса масштаба
document.addEventListener('dblclick', function() {
    resetZoom();
});

// Обработчик ошибок загрузки изображения
if (imageElement) {
    imageElement.onerror = function() {
        console.error('Ошибка загрузки изображения');
    };
}

// Инициализация
updateImage();

// Делаем функции глобальными
window.nextPage = nextPage;
window.prevPage = prevPage;
window.resetZoom = resetZoom;