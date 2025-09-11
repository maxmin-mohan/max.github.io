// Carousel functionality for Mohan Kumar's Video Editing Portfolio

class Carousel {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');
        
        this.options = {
            autoplay: options.autoplay || false,
            autoplayDelay: options.autoplayDelay || 5000,
            loop: options.loop || true,
            slidesToShow: options.slidesToShow || 1,
            slidesToScroll: options.slidesToScroll || 1,
            ...options
        };
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupSlides();
        this.bindEvents();
        this.updateButtons();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Add touch/swipe support
        this.addTouchSupport();
    }
    
    setupSlides() {
        if (!this.track || !this.slides.length) return;
        
        // Set initial position
        this.track.style.transform = `translateX(0)`;
        
        // Clone slides for infinite loop
        if (this.options.loop && this.totalSlides > 1) {
            this.cloneSlides();
        }
    }
    
    cloneSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.totalSlides - 1].cloneNode(true);
        
        firstSlide.classList.add('clone', 'last-clone');
        lastSlide.classList.add('clone', 'first-clone');
        
        this.track.appendChild(firstSlide);
        this.track.insertBefore(lastSlide, this.slides[0]);
        
        // Update slides reference
        this.slides = this.track.querySelectorAll('.carousel-slide');
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Pause autoplay on hover
        if (this.options.autoplay) {
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Make container focusable for keyboard navigation
        this.container.setAttribute('tabindex', '0');
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            this.stopAutoplay();
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            }
            
            isDragging = false;
            if (this.options.autoplay) {
                this.startAutoplay();
            }
        });
    }
    
    next() {
        if (this.isTransitioning) return;
        
        this.currentSlide++;
        
        if (this.options.loop && this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        } else if (!this.options.loop && this.currentSlide >= this.totalSlides) {
            this.currentSlide = this.totalSlides - 1;
            return;
        }
        
        this.slideTo(this.currentSlide);
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        this.currentSlide--;
        
        if (this.options.loop && this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        } else if (!this.options.loop && this.currentSlide < 0) {
            this.currentSlide = 0;
            return;
        }
        
        this.slideTo(this.currentSlide);
    }
    
    slideTo(index) {
        if (this.isTransitioning || !this.track) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        
        const slideWidth = this.container.offsetWidth;
        const translateX = -index * slideWidth;
        
        this.track.style.transition = 'transform 0.5s ease';
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Handle infinite loop
        if (this.options.loop) {
            setTimeout(() => {
                if (this.currentSlide >= this.totalSlides) {
                    this.track.style.transition = 'none';
                    this.track.style.transform = 'translateX(0)';
                    this.currentSlide = 0;
                } else if (this.currentSlide < 0) {
                    this.track.style.transition = 'none';
                    this.track.style.transform = `translateX(-${(this.totalSlides - 1) * slideWidth}px)`;
                    this.currentSlide = this.totalSlides - 1;
                }
            }, 500);
        }
        
        setTimeout(() => {
            this.isTransitioning = false;
            this.updateButtons();
        }, 500);
    }
    
    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        if (!this.options.loop) {
            this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            this.nextBtn.style.opacity = this.currentSlide >= this.totalSlides - 1 ? '0.5' : '1';
            
            this.prevBtn.disabled = this.currentSlide === 0;
            this.nextBtn.disabled = this.currentSlide >= this.totalSlides - 1;
        }
    }
    
    startAutoplay() {
        if (!this.options.autoplay || this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    destroy() {
        this.stopAutoplay();
        
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prev);
        }
        
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.next);
        }
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousels();
});

function initializeCarousels() {
    // Featured videos carousel
    const featuredCarousel = document.getElementById('featuredCarousel');
    if (featuredCarousel) {
        const featuredContainer = featuredCarousel.closest('.carousel-container');
        if (featuredContainer) {
            new Carousel(featuredContainer, {
                autoplay: true,
                autoplayDelay: 4000,
                loop: true
            });
        }
    }
    
    // Category carousels
    const categoryCarousels = document.querySelectorAll('[id$="Carousel"]');
    categoryCarousels.forEach(carouselId => {
        const carousel = document.getElementById(carouselId);
        if (carousel) {
            const container = carousel.closest('.carousel-container');
            if (container) {
                new Carousel(container, {
                    autoplay: false,
                    loop: true
                });
            }
        }
    });
    
    // Social links carousel (if exists)
    const socialCarousel = document.querySelector('.social-carousel .carousel-container');
    if (socialCarousel) {
        new Carousel(socialCarousel, {
            autoplay: true,
            autoplayDelay: 3000,
            loop: true
        });
    }
}

// Utility function to create carousel programmatically
function createCarousel(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (container) {
        return new Carousel(container, options);
    }
    return null;
}

// Export for use in other files
window.Carousel = Carousel;
window.createCarousel = createCarousel;
