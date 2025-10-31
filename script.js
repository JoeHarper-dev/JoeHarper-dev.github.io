document.addEventListener('DOMContentLoaded', function() {
    
    // --- Easter Egg 1: Console Message ---
    console.log(
        "%cHey, curious developer! 👋 You've found an easter egg. Try the Konami code...",
        "color: #cba6f7; font-family: 'JetBrains Mono', monospace; font-size: 1.2em; font-weight: bold;"
    );

    // --- Bubble Animation ---
    const bubbleWrapper = document.querySelector('.bubble-wrapper');
    const numBubbles = 25;

    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 60 + 10; // 10px to 70px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.left = `${Math.random() * 100}%`;
        
        const animationDuration = Math.random() * 10 + 15; // 15s to 25s
        bubble.style.animationDuration = `${animationDuration}s`;
        
        const animationDelay = Math.random() * 15; // 0s to 15s
        bubble.style.animationDelay = `${animationDelay}s`;

        // For varied horizontal movement
        bubble.style.setProperty('--x-end', `${(Math.random() * 200) - 100}px`);

        bubbleWrapper.appendChild(bubble);
    }

    // --- Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');

    const moveToSlide = (track, currentSlide, targetSlide) => {
        if (!targetSlide) return;
        const amountToMove = targetSlide.offsetLeft;
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;

        if (!prevSlide) {
            prevSlide = slides[slides.length - 1]; // Loop to the end
        }
        moveToSlide(track, currentSlide, prevSlide);
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;

        if (!nextSlide) {
            nextSlide = slides[0]; // Loop back to the start
        }
        moveToSlide(track, currentSlide, nextSlide);
    });

    // --- Easter Egg 2: Konami Code Theme Switch ---
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0; // Reset for next time
                toggleTheme();
            }
        } else {
            konamiIndex = 0; // Wrong key, reset
        }
    });

    const toggleTheme = () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'mocha') {
            body.setAttribute('data-theme', 'latte');
            console.log("%cLatte theme activated! ☀️", "color: #fe640b; font-family: 'JetBrains Mono', monospace; font-size: 1.2em;");
        } else {
            body.setAttribute('data-theme', 'mocha');
            console.log("%cMocha theme re-activated! 🌙", "color: #cba6f7; font-family: 'JetBrains Mono', monospace; font-size: 1.2em;");
        }
    };

    // --- Easter Egg 3: Click the logo to toggle theme ---
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', toggleTheme);
});

