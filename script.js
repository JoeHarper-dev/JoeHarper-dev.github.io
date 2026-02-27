
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBubbles();
    initCarousel();
});

function initTheme() {
    const themeSelect = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'everforest';
    
    document.body.setAttribute('data-theme', savedTheme);
    themeSelect.value = savedTheme;

    themeSelect.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

function initBubbles() {
    const container = document.getElementById('bubble-container');
    const bubbleCount = 15; 

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container);
    }
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 60 + 20; 
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    bubble.style.left = `${Math.random() * 100}%`;
    
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;
    
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `-${delay}s`;

    container.appendChild(bubble);
}

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        
        if (!nextSlide) nextSlide = slides[0];

        moveToSlide(track, currentSlide, nextSlide);
    });

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;

        if (!prevSlide) prevSlide = slides[slides.length - 1];

        moveToSlide(track, currentSlide, prevSlide);
    });
    
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => slide.style.left = newSlideWidth * index + 'px');
    });
}
