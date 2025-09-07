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

// Promo video functionality
document.addEventListener('DOMContentLoaded', function() {
    const promoVideo = document.getElementById('promo-video');
    const videoContainer = document.getElementById('promo-video-container');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const volumeOffIcon = document.getElementById('volume-off-icon');
    const volumeOnIcon = document.getElementById('volume-on-icon');
    
    let isZoomed = false;
    let hasSound = false;
    
    if (promoVideo && videoContainer) {
        // Click handler for video interactions
        videoContainer.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle sound
            if (promoVideo.muted) {
                promoVideo.muted = false;
                hasSound = true;
                volumeOffIcon.classList.add('hidden');
                volumeOnIcon.classList.remove('hidden');
            } else {
                promoVideo.muted = true;
                hasSound = false;
                volumeOffIcon.classList.remove('hidden');
                volumeOnIcon.classList.add('hidden');
            }
            
            // Toggle zoom
            if (!isZoomed) {
                videoContainer.style.transform = 'scale(1.1)';
                videoContainer.style.transition = 'transform 0.3s ease';
                videoContainer.style.zIndex = '1000';
                isZoomed = true;
            } else {
                videoContainer.style.transform = 'scale(1)';
                isZoomed = false;
            }
        });
        
        // Update play/pause icons based on video state
        promoVideo.addEventListener('play', function() {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        });
        
        promoVideo.addEventListener('pause', function() {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        });
        
        // Reset zoom when clicking outside
         document.addEventListener('click', function(e) {
             if (!videoContainer.contains(e.target) && isZoomed) {
                 videoContainer.style.transform = 'scale(1)';
                 isZoomed = false;
             }
         });
     }
     
     // What We Do video functionality
     const whatwedoVideo = document.getElementById('whatwedo-video');
     const whatwedoVideoContainer = document.getElementById('whatwedo-video-container');
     const whatwedoPlayIcon = document.getElementById('whatwedo-play-icon');
     const whatwedoPauseIcon = document.getElementById('whatwedo-pause-icon');
     const whatwedoVolumeOffIcon = document.getElementById('whatwedo-volume-off-icon');
     const whatwedoVolumeOnIcon = document.getElementById('whatwedo-volume-on-icon');
     
     let whatwedoIsZoomed = false;
     let whatwedoHasSound = false;
     
     if (whatwedoVideo && whatwedoVideoContainer) {
         // Click handler for video interactions
         whatwedoVideoContainer.addEventListener('click', function(e) {
             e.preventDefault();
             
             // Toggle sound
             if (whatwedoVideo.muted) {
                 whatwedoVideo.muted = false;
                 whatwedoHasSound = true;
                 whatwedoVolumeOffIcon.classList.add('hidden');
                 whatwedoVolumeOnIcon.classList.remove('hidden');
             } else {
                 whatwedoVideo.muted = true;
                 whatwedoHasSound = false;
                 whatwedoVolumeOffIcon.classList.remove('hidden');
                 whatwedoVolumeOnIcon.classList.add('hidden');
             }
             
             // Toggle zoom
             if (!whatwedoIsZoomed) {
                 whatwedoVideoContainer.style.transform = 'scale(1.1)';
                 whatwedoVideoContainer.style.transition = 'transform 0.3s ease';
                 whatwedoVideoContainer.style.zIndex = '1000';
                 whatwedoIsZoomed = true;
             } else {
                 whatwedoVideoContainer.style.transform = 'scale(1)';
                 whatwedoIsZoomed = false;
             }
         });
         
         // Update play/pause icons based on video state
         whatwedoVideo.addEventListener('play', function() {
             whatwedoPlayIcon.classList.add('hidden');
             whatwedoPauseIcon.classList.remove('hidden');
         });
         
         whatwedoVideo.addEventListener('pause', function() {
             whatwedoPlayIcon.classList.remove('hidden');
             whatwedoPauseIcon.classList.add('hidden');
         });
         
         // Reset zoom when clicking outside
         document.addEventListener('click', function(e) {
             if (!whatwedoVideoContainer.contains(e.target) && whatwedoIsZoomed) {
                 whatwedoVideoContainer.style.transform = 'scale(1)';
                 whatwedoIsZoomed = false;
             }
         });
     }
     
     // Photo Gallery Functionality
     const photoGallery = document.getElementById('photo-gallery');
     const photoModal = document.getElementById('photo-modal');
     const modalImage = document.getElementById('modal-image');
     const closeModal = document.getElementById('close-modal');
     const prevPhoto = document.getElementById('prev-photo');
     const nextPhoto = document.getElementById('next-photo');
     const viewMoreBtn = document.getElementById('view-more-btn');
     const viewLessBtn = document.getElementById('view-less-btn');
     
     let currentPhotoIndex = 0;
     const totalPhotos = 66;
     const photosPerPage = 8;
     let photosDisplayed = photosPerPage;
     
     // Generate photo gallery items
     function generatePhotoGallery() {
         if (!photoGallery) return;
         
         photoGallery.innerHTML = ''; // Clear existing photos
         
         for (let i = 1; i <= photosDisplayed; i++) {
             const photoItem = document.createElement('div');
             photoItem.className = 'photo-gallery-item';
             photoItem.setAttribute('data-aos', 'fade-up');
             photoItem.setAttribute('data-aos-delay', (i * 50).toString());
             
             const img = document.createElement('img');
             img.src = `assets/photo (${i}).jpg`;
             img.alt = `Event Memory ${i}`;
             img.loading = 'lazy';
             
             photoItem.appendChild(img);
             photoItem.addEventListener('click', () => openModal(i - 1));
             
             photoGallery.appendChild(photoItem);
         }
         
         // Update buttons visibility
         updateButtons();
         
         // Reinitialize AOS for new elements
         if (typeof AOS !== 'undefined') {
             AOS.refresh();
         }
     }
     
     // Update buttons visibility and text
     function updateButtons() {
         if (!viewMoreBtn || !viewLessBtn) return;
         
         if (photosDisplayed === photosPerPage) {
             // Only initial 8 photos shown
             viewMoreBtn.style.display = 'inline-block';
             viewLessBtn.style.display = 'none';
         } else if (photosDisplayed >= totalPhotos) {
             // All photos are shown
             viewMoreBtn.style.display = 'none';
             viewLessBtn.style.display = 'inline-block';
         } else {
             // Some photos shown, but not all
             viewMoreBtn.style.display = 'inline-block';
             viewLessBtn.style.display = 'inline-block';
         }
     }
     
     // View More button functionality
     if (viewMoreBtn) {
         viewMoreBtn.addEventListener('click', () => {
             if (photosDisplayed < totalPhotos) {
                 // Show 8 more photos
                 photosDisplayed = Math.min(photosDisplayed + photosPerPage, totalPhotos);
                 generatePhotoGallery();
             }
         });
     }
     
     // View Less button functionality
     if (viewLessBtn) {
         viewLessBtn.addEventListener('click', () => {
             // Reset to first 8 photos
             photosDisplayed = photosPerPage;
             generatePhotoGallery();
         });
     }
     
     // Initialize gallery
     generatePhotoGallery();
     
     // Modal functions
     function openModal(photoIndex) {
         currentPhotoIndex = photoIndex;
         modalImage.src = `assets/photo (${photoIndex + 1}).jpg`;
         modalImage.alt = `Event Memory ${photoIndex + 1}`;
         photoModal.classList.remove('hidden');
         photoModal.classList.add('show');
         document.body.style.overflow = 'hidden';
         
         // Reinitialize feather icons for modal buttons
         setTimeout(() => {
             if (typeof feather !== 'undefined') {
                 feather.replace();
             }
         }, 100);
     }
     
     function closeModalFunc() {
         photoModal.classList.add('hidden');
         photoModal.classList.remove('show');
         document.body.style.overflow = 'auto';
     }
     
     function showPrevPhoto() {
         currentPhotoIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : totalPhotos - 1;
         modalImage.src = `assets/photo (${currentPhotoIndex + 1}).jpg`;
         modalImage.alt = `Event Memory ${currentPhotoIndex + 1}`;
     }
     
     function showNextPhoto() {
         currentPhotoIndex = currentPhotoIndex < totalPhotos - 1 ? currentPhotoIndex + 1 : 0;
         modalImage.src = `assets/photo (${currentPhotoIndex + 1}).jpg`;
         modalImage.alt = `Event Memory ${currentPhotoIndex + 1}`;
     }
     
     // Event listeners for modal
     if (closeModal) {
         closeModal.addEventListener('click', closeModalFunc);
     }
     
     if (prevPhoto) {
         prevPhoto.addEventListener('click', showPrevPhoto);
     }
     
     if (nextPhoto) {
         nextPhoto.addEventListener('click', showNextPhoto);
     }
     
     // Close modal when clicking outside the image
     if (photoModal) {
         photoModal.addEventListener('click', (e) => {
             if (e.target === photoModal) {
                 closeModalFunc();
             }
         });
     }
     
     // Keyboard navigation
     document.addEventListener('keydown', (e) => {
         if (!photoModal.classList.contains('hidden')) {
             switch(e.key) {
                 case 'Escape':
                     closeModalFunc();
                     break;
                 case 'ArrowLeft':
                     showPrevPhoto();
                     break;
                 case 'ArrowRight':
                     showNextPhoto();
                     break;
             }
         }
     });
 });