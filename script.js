let currentPage = 1;
const totalPages = 5; // Убедитесь, что это число правильное!
let xDown = null;
let yDown = null;

// Запуск приложения после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    alert("Добро пожаловать! Страниц в главе: " + totalPages);
    updateImage();
    
    // Добавляем обработчики на весь документ
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    
    // Добавляем обработчик клика для диагностики
    document.addEventListener('click', function() {
        alert("Клик зарегистрирован!");
    });
    
    alert("Обработчики событий добавлены. Пробуйте свайпы и клики!");
});

function handleTouchStart(evt) {
    alert("TouchStart зарегистрирован!");
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) return;
    
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    
    alert(`Движение зарегистрировано: X: ${xDiff}, Y: ${yDiff}`);
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Горизонтальный свайп
        if (xDiff > 50) {
            alert("Свайп влево -> следующая страница");
            nextPage();
        } else if (xDiff < -50) {
            alert("Свайп вправо -> предыдущая страница");
            prevPage();
        }
    }
    
    xDown = null;
    yDown = null;
};

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        alert("Переход на страницу " + currentPage);
        updateImage();
    } else {
        alert("Это последняя страница!");
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        alert("Переход на страницу " + currentPage);
        updateImage();
    } else {
        alert("Это первая страница!");
    }
}

function updateImage() {
    const imgElement = document.getElementById('mangaImage');
    if (imgElement) {
        imgElement.src = `page${currentPage}.jpg`;
        alert("Загружаем страницу: page" + currentPage + ".jpg");
        
        // Обработчик ошибки загрузки изображения
        imgElement.onerror = function() {
            alert('Ошибка загрузки: page' + currentPage + '.jpg');
        };
        
        imgElement.onload = function() {
            alert("Изображение успешно загружено!");
        };
    }
}