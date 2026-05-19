const boxes = document.querySelectorAll('.s-box');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > scrollThreshold) {
        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('box-appear');
            }, index * 300);
        });
    } else {
        boxes.forEach(box => {
            box.classList.remove('box-appear');
        });
    }
});