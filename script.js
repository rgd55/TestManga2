// Конфигурация
const totalPages = 5;
let currentPage = 1;

// Переменные для отслеживания касаний
let startX = null;
let startY = null;

// Элементы
const imageElement = document.getElementById('mangaImage');

// Обработчики событий
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });

// Функция обработки начала касания
function handleTouchStart(event) {
    // Получаем первую точку касания
    const firstTouch = event.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
    
    // Предотвращаем стандартное поведение (прокрутку/масштабирование)
    event.preventDefault();
}

// Функция обработки движения пальца
function handleTouchMove(event) {
    if (startX === null || startY === null) return;
    
    // Получаем текущую позицию касания
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    
    // Вычисляем разницу между начальной и текущей позицией
    const diffX = startX - currentX;
    const diffY = startY - currentY;
    
    // Если движение по горизонтали значительно больше, чем по вертикали
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
        // Предотвращаем стандартное поведение браузера
        event.preventDefault();
        
        // Определяем направление свайпа
        if (diffX > 0) {
            // Свайп влево - следующая страница
            nextPage();
        } else {
            // Свайп вправо - предыдущая страница
            prevPage();
        }
        
        // Сбрасываем начальные координаты
        startX = null;
        startY = null;
    }
}

// Функция обработки окончания касания
function handleTouchEnd() {
    // Сбрасываем начальные координаты
    startX = null;
    startY = null;
}

// Функция перехода к следующей странице
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateImage();
    }
}

// Функция перехода к предыдущей странице
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateImage();
    }
}

// Функция обновления