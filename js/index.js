const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX = 0;
let currentX = 0;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updatePagination();
}

function updatePagination() {
    dots.forEach((dot, index) => {
        dot.classList.remove('bg-gray-800');
        dot.classList.add('bg-gray-400');
        if (index === currentIndex) {
            dot.classList.add('bg-gray-800');
            dot.classList.remove('bg-gray-400');
        }
    });
}

// Add swipe functionality
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
    const swipeDistance = currentX - startX;
    if (swipeDistance > 50) {
        currentIndex = (currentIndex - 1 + 3) % 3; // Swipe right
    } else if (swipeDistance < -50) {
        currentIndex = (currentIndex + 1) % 3; // Swipe left
    }
    updateCarousel();
});

// Add click functionality for pagination dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Initialize the first dot as active
updatePagination();
function toggleAccordion(id, button) {
    const content = document.getElementById(id);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Toggle the hidden class
    content.classList.toggle("hidden", isExpanded);

    // Update the aria-expanded attribute
    button.setAttribute("aria-expanded", !isExpanded);

    // Rotate the arrow icon
    const svgIcon = button.querySelector("svg");
    svgIcon.classList.toggle("rotate-180", !isExpanded);
}

document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});  

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('animate-section');
    const items = section.querySelectorAll('div');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-visible');
                        }, index * 200); 
                    });
                    observer.unobserve(section);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(section);
});
