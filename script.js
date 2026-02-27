/**
 * Joe Harper's Portfolio Scripts
 * Handles Theme Switching, Bubbles, and Carousel Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBubbles();
    initCarousel();
});

/* --- THEME SWITCHER --- */
function initTheme() {
    const themeSelect = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'everforest';
    
    // Apply saved theme
    document.body.setAttribute('data-theme', savedTheme);
    themeSelect.value = savedTheme;

    // Listen for changes
    themeSelect.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

/* --- BUBBLE GENERATOR --- */
function initBubbles() {
    const container = document.getElementById('bubble-container');
    const bubbleCount = 15; // How many bubbles on screen

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container);
    }
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Randomize size
    const size = Math.random() * 60 + 20; // 20px to 80px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Randomize position
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Randomize animation duration and delay
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const delay = Math.random() * 10;
    
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `-${delay}s`; // Negative delay starts animation mid-way
    
    container.appendChild(bubble);
}

/* --- CAROUSEL LOGIC --- */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    // Next Button
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        
        // Loop back to start if at end
        if (!nextSlide) nextSlide = slides[0];

        moveToSlide(track, currentSlide, nextSlide);
    });

    // Prev Button
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;

        // Loop to end if at start
        if (!prevSlide) prevSlide = slides[slides.length - 1];

        moveToSlide(track, currentSlide, prevSlide);
    });
    
    // Handle window resize to fix slide positions
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => slide.style.left = newSlideWidth * index + 'px');
    });
}
