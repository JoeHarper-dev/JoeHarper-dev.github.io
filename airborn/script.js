document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    
    cards.forEach((card, index) => {
        const delay = index * 150;
        setTimeout(() => {
            card.classList.add('card-visible');
        }, delay);
    });


    // --- Fireflies ---
    const fireflyContainer = document.getElementById('firefly-container');
    const numFireflies = 30; 

    if (fireflyContainer) { 
        for (let i = 0; i < numFireflies; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');

            
            const topPos = Math.random() * 100;
            const leftPos = Math.random() * 100;
            firefly.style.top = `${topPos}%`;
            firefly.style.left = `${leftPos}%`;

            
            const duration = Math.random() * 5 + 3; 
            const delay = Math.random() * 5;       
            firefly.style.animationDuration = `${duration}s`;
            firefly.style.animationDelay = `${delay}s`;

            fireflyContainer.appendChild(firefly);
        }
    }


    console.log("Airborn Academy site loaded with fireflies!");
});
