const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots');
const prevButton = document.querySelector('.prevSlide');
const nextButton = document.querySelector('.nextSlide');
const images = document.querySelectorAll('.images')
const start = document.querySelector('.start')
const stop = document.querySelector('.stop')

const sliderRotationInterval = 1000;

let currentSlideIndex = 0;
counter = 0

dots[currentSlideIndex].classList.add('activeDots')
images[currentSlideIndex].classList.add('activeImage')

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', ()=> {
        for (let k = 0; k < images.length; k++) {
            images[k].classList.remove('activeImage')
            dots[k].classList.remove('activeDots')
         }
         counter = i
         images[counter].classList.add('activeImage')
         dots[counter].classList.add('activeDots')
    })
    
}

prevButton.addEventListener('click', ()=> {
    for (let k = 0; k < images.length; k++) {
            images[k].classList.remove('activeImage')
            dots[k].classList.remove('activeDots')
         }
         counter --

         if (counter < 0) {
            counter = images.length - 1
         }
        images[counter].classList.add('activeImage')
        dots[counter].classList.add('activeDots')
})

nextButton.addEventListener('click', ()=> {
    for (let k = 0; k < images.length; k++) {
            images[k].classList.remove('activeImage')
            dots[k].classList.remove('activeDots')
         }
         counter ++

         if (counter >= images.length) {
            counter = 0
         }
        images[counter].classList.add('activeImage')
        dots[counter].classList.add('activeDots')
})

function autonext () {
        for (let k = 0; k < images.length; k++) {
            images[k].classList.remove('activeImage')
            dots[k].classList.remove('activeDots')
         }
         counter ++

         if (counter >= images.length) {
            counter = 0
         }
        images[counter].classList.add('activeImage')
        dots[counter].classList.add('activeDots')
}

let interval = 1000
let TimerImage = setInterval(()=> autonext(), interval);

start.addEventListener('click', () => {
    if (!TimerImage) {
        TimerImage = setInterval(() => autonext(), interval);

        start.classList.add('active');
        stop.classList.remove('stopped');
    }
});

stop.addEventListener('click', () => {
    clearInterval(TimerImage);
    TimerImage = null;

    stop.classList.add('stopped');
    start.classList.remove('active');
});


const content = document.querySelector('.content');

let startX = 0;
let endX = 0;
let isDragging = false;

content.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

content.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

content.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

content.addEventListener('mouseup', (e) => {
    if (isDragging) {
        endX = e.clientX;
        isDragging = false;
        handleSwipe();
    }
});

function handleSwipe() {
    const diff = endX - startX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {
            nextButton.click();
        } else {
            prevButton.click()
        }
    }
}