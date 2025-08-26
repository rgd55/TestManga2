// Глобальные переменные
let currentPage = 1;
const totalPages = 5;

// Переменные для масштабирования и перемещения
let currentScale = 1;
let maxScale = 4;
let minScale = 1;
let lastX = 0;
let lastY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;
let initialDistance = null;
let initialScale = 1;

// Элементы DOM
const imageElement = document.getElementById('mangaImage');
const imageContainer = document.getElementById('imageContainer');
const zoomInfo = document.getElementById('zoomInfo');

// Функция обновления изображения
function updateImage() {
    if (imageElement) {
        imageElement.src = `page${currentPage}.jpg`;
        // Сброс масштаба и позиции при смене страницы
        resetZoom();
    }
}

// Функция сброса масштаба и позиции
function resetZoom() {
    currentScale = 1;
    lastX = 0;
    lastY = 0;
    updateTransform();
}

// Функция обновления трансформации изображения
function updateTransform() {
    if (imageElement) {
        imageElement.style.transform = `translate(${lastX}px, ${lastY}px) scale(${currentScale})`;
        updateZoomInfo();
    }
}

// Функция обновления информации о масштабе
function updateZoomInfo() {
    if (zoomInfo) {
        zoomInfo.textContent = `${Math.round(currentScale * 100)}%`;
        // Показываем/скрываем индикатор в зависимости от масштаба
        zoomInfo.style.display = currentScale !== 1 ? 'block' : 'none';
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

// Обработчики касаний
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 1) {
        // Одиночное касание - для перемещения или свайпов
        startX = event.touches[0].clientX - lastX;
        startY = event.touches[0].clientY - lastY;
        isDragging = currentScale > 1; // Перемещаем только при увеличенном масштабе
    } else if (event.touches.length === 2) {
        // Двойное касание - для масштабирования
        isDragging = false;
        initialDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = currentScale;
    }
    
    event.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', function(event) {
    if (isDragging && event.touches.length === 1) {
        // Перемещение изображения
        lastX = event.touches[0].clientX - startX;
        lastY = event.touches[0].clientY - startY;
        
        // Ограничиваем перемещение, чтобы не увести изображение слишком далеко
        const maxX = (imageElement.offsetWidth * (currentScale - 1)) / 2;
        const maxY = (imageElement.offsetHeight * (currentScale - 1)) / 2;
        
        lastX = Math.max(-maxX, Math.min(maxX, lastX));
        lastY = Math.max(-maxY, Math.min(maxY, lastY));
        
        updateTransform();
        event.preventDefault();
    } else if (event.touches.length === 2 && initialDistance !== null) {
        // Масштабирование
        const currentDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        
        if (initialDistance > 0) {
            // Плавное масштабирование с коэффициентом чувствительности
            const sensitivity = 0.01;
            let scale = initialScale + (currentDistance - initialDistance) * sensitivity;
            
            // Ограничиваем масштаб
            scale = Math.max(minScale, Math.min(maxScale, scale));
            
            currentScale = scale;
            updateTransform();
            
            event.preventDefault();
        }
    } else if (event.touches.length === 1 && !isDragging) {
        // Обработка свайпов (только при обычном масштабе)
        if (currentScale === 1) {
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
        }
    }
}, { passive: false });

document.addEventListener('touchend', function() {
    // Сброс состояний при завершении касания
    isDragging = false;
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