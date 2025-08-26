let currentPage = 1;
const totalPages = 5; // ПОМЕНЯЙТЕ на нужное число страниц

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
};

function handleTouchMove(evt) {
    if (!xDown) return;

    let xUp = evt.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 50) { // Минимальная дистанция свайпа
        if (xDiff > 0) {
            nextPage(); // Свайп влево
        } else {
            prevPage(); // Свайп вправо
        }
    }
    xDown = null;
};

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

function updateImage() {
    document.getElementById('mangaImage').src = `page${currentPage}.jpg`;
}