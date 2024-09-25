document.addEventListener('DOMContentLoaded', () => {
    // Script pentru modal image (pentru toate imaginile clickabile)
    const images = document.querySelectorAll('.clickable-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const close = document.querySelector('.close');

    images.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = image.src;

            // Activare fullscreen pentru imaginea din modal
            modalImg.onclick = () => {
                openFullscreen(modalImg);
            };
        });
    });

    // Închide modalul la click pe "X"
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Închide modalul la click în afara imaginii
    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fullscreen logic (pentru toate imaginile de proiect)
    const projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            if (!image.classList.contains('fullscreen')) {
                // Activare fullscreen
                openFullscreen(image);
            } else {
                // Deactivare fullscreen
                closeFullscreen(image);
            }
        });
    });

    // Funcție pentru activarea fullscreen
    function openFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari și Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
        element.classList.add('fullscreen'); // Adaugă clasa fullscreen
    }

    // Funcție pentru închiderea fullscreen
    function closeFullscreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari și Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        element.classList.remove('fullscreen'); // Elimină clasa fullscreen
    }

    document.addEventListener('fullscreenchange', () => {
        projectImages.forEach(image => {
            if (document.fullscreenElement) {
                image.classList.add('fullscreen'); // Adaugă clasa dacă este fullscreen
            } else {
                image.classList.remove('fullscreen'); // Elimină clasa dacă nu este fullscreen
            }
        });

        if (!document.fullscreenElement) {
            modalImg.classList.remove('fullscreen');
        }
    });
});
