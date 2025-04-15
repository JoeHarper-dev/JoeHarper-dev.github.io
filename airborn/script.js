document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // --- Card Entrance Animation ---
    cards.forEach((card, index) => {
        const delay = index * 150;
        setTimeout(() => {
            card.classList.add('card-visible');
        }, delay);
    });

    // --- ADD FIREFLY CREATION LOGIC ---
    const fireflyContainer = document.getElementById('firefly-container');
    const numFireflies = 30; // Adjust number of fireflies here

    if (fireflyContainer) { // Check if the container exists
        for (let i = 0; i < numFireflies; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');

            // Random position
            const topPos = Math.random() * 100;
            const leftPos = Math.random() * 100;
            firefly.style.top = `${topPos}%`;
            firefly.style.left = `${leftPos}%`;

            // Random animation duration and delay
            const duration = Math.random() * 5 + 3; // Duration between 3s and 8s
            const delay = Math.random() * 5;       // Delay up to 5s
            firefly.style.animationDuration = `${duration}s`;
            firefly.style.animationDelay = `${delay}s`;

            fireflyContainer.appendChild(firefly);
        }
    }
    // --- END OF FIREFLY LOGIC ---


    console.log("Airborn Academy site loaded with fireflies!");
});
