document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme; // Apply saved theme class
        updateToggleButtonText(savedTheme);
    } else {
        // Default to mocha if no preference saved
        updateToggleButtonText('theme-mocha');
    }

    themeToggleButton.addEventListener('click', () => {
        let newTheme;
        if (body.classList.contains('theme-mocha')) {
            body.classList.replace('theme-mocha', 'theme-latte');
            newTheme = 'theme-latte';
        } else {
            body.classList.replace('theme-latte', 'theme-mocha');
            newTheme = 'theme-mocha';
        }
        localStorage.setItem('theme', newTheme); // Save preference
        updateToggleButtonText(newTheme);
    });

    function updateToggleButtonText(theme) {
        if (theme === 'theme-latte') {
            themeToggleButton.textContent = 'Switch to Mocha';
            themeToggleButton.setAttribute('aria-label', 'Switch to Mocha Theme');
        } else {
            themeToggleButton.textContent = 'Switch to Latte';
            themeToggleButton.setAttribute('aria-label', 'Switch to Latte Theme');
        }
    }

    // --- Project Carousel ---
    const carousel = document.querySelector('.project-carousel');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    const projectCards = document.querySelectorAll('.project-card');
    const totalProjects = projectCards.length;
    let currentIndex = 0;

    function showProject(index) {
        const offset = -index * 100; // Calculate percentage offset
        carousel.style.transform = `translateX(${offset}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalProjects; // Loop to start if at end
        showProject(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalProjects) % totalProjects; // Loop to end if at start
        showProject(currentIndex);
    });

    // Initialize carousel position
    showProject(currentIndex);

    // Optional: Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        // Check if focus is within the carousel area or its buttons to avoid global capture
        if (document.activeElement === prevButton || document.activeElement === nextButton || carousel.contains(document.activeElement)) {
             if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        }
    });

     // Optional: Add swipe support for touch devices (basic implementation)
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselWrapper = document.querySelector('.project-carousel-wrapper');

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // Use passive for performance

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum pixels to count as a swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped left (next project)
            nextButton.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped right (previous project)
            prevButton.click();
        }
        // Reset values (optional, good practice)
        touchStartX = 0;
        touchEndX = 0;
    }


    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    yearSpan.textContent = new Date().getFullYear();
});
