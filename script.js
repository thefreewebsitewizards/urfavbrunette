// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});



// Add mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const clouds = document.querySelectorAll('.cloud');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        cloud.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Scroll-based parallax and reveal animations
function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    // Parallax effect
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Reveal animations
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Smooth scroll with easing
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Initialize scroll animations on load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    
    // Add creative interactions to cards
    const cards = document.querySelectorAll('.float-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform += ' scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.style.transform.replace(' scale(1.02)', '');
        });
    });
});

// Mobile menu toggle
// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Contact form was removed - no form submission needed

// Replace feather icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof feather !== 'undefined') {
        feather.replace();
        // Reinitialize icons after a short delay to ensure all content is loaded
        setTimeout(() => {
            feather.replace();
        }, 100);
    }
});

// Also replace icons when window loads (fallback)
window.addEventListener('load', function() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});