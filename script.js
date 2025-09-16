// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.project-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let startX = 0;
let endX = 0;

// Update slider position and active indicator
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Next slide
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

// Previous slide
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

// Indicator click
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        currentIndex = parseInt(indicator.getAttribute('data-index'));
        updateSlider();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    }
});

// Add parallax effect to grid on mouse move
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    
    document.querySelector('.grid-container').style.transform = 
        `rotateX(75deg) translateZ(-200px) rotateY(${x}deg) rotateX(${y}deg)`;
});

// Add occasional glitch effect to title
setInterval(() => {
    if (Math.random() > 0.7) {
        document.querySelector('h1').classList.add('glitch');
        setTimeout(() => {
            document.querySelector('h1').classList.remove('glitch');
        }, 200);
    }
}, 5000);

// Touch swipe support for mobile
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swipe left - next
            nextBtn.click();
        } else {
            // Swipe right - previous
            prevBtn.click();
        }
    }
}