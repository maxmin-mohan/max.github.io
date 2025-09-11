// Modal functionality for Mohan Kumar's Video Editing Portfolio

class VideoModal {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.modalVideo = document.getElementById('modalVideo');
        this.closeBtn = this.modal?.querySelector('.close-modal');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.modal || !this.modalVideo) return;
        
        this.bindEvents();
        this.setupVideoHandling();
    }
    
    bindEvents() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Prevent body scroll when modal is open
        this.modal.addEventListener('wheel', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    
    setupVideoHandling() {
        // Handle video events
        this.modalVideo.addEventListener('loadstart', () => {
            this.showLoadingState();
        });
        
        this.modalVideo.addEventListener('canplay', () => {
            this.hideLoadingState();
        });
        
        this.modalVideo.addEventListener('error', () => {
            this.showErrorState();
        });
        
        // Pause video when modal closes
        this.modal.addEventListener('transitionend', () => {
            if (!this.isOpen && !this.modalVideo.paused) {
                this.modalVideo.pause();
            }
        });
    }
    
    open(videoSrc, videoTitle = 'Video') {
        if (!this.modal || !this.modalVideo) return;
        
        this.isOpen = true;
        
        // Set video source and title
        this.modalVideo.src = videoSrc;
        this.modalVideo.setAttribute('data-title', videoTitle);
        
        // Show modal
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        requestAnimationFrame(() => {
            this.modal.classList.add('modal-open');
        });
        
        // Focus for keyboard navigation
        this.modal.focus();
        
        // Dispatch custom event
        this.dispatchEvent('modalOpened', { videoSrc, videoTitle });
    }
    
    close() {
        if (!this.modal || !this.isOpen) return;
        
        this.isOpen = false;
        
        // Remove animation class
        this.modal.classList.remove('modal-open');
        
        // Hide modal after animation
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Clear video source
            this.modalVideo.src = '';
            this.modalVideo.removeAttribute('data-title');
        }, 300);
        
        // Dispatch custom event
        this.dispatchEvent('modalClosed');
    }
    
    showLoadingState() {
        const loadingOverlay = this.createLoadingOverlay();
        this.modal.appendChild(loadingOverlay);
    }
    
    hideLoadingState() {
        const loadingOverlay = this.modal.querySelector('.modal-loading');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }
    
    showErrorState() {
        const errorOverlay = this.createErrorOverlay();
        this.modal.appendChild(errorOverlay);
    }
    
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-loading';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading video...</p>
            </div>
        `;
        
        // Add styles
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        `;
        
        return overlay;
    }
    
    createErrorOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-error';
        overlay.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Video Not Available</h3>
                <p>Sorry, this video could not be loaded.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    Close
                </button>
            </div>
        `;
        
        // Add styles
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        `;
        
        return overlay;
    }
    
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true
        });
        this.modal.dispatchEvent(event);
    }
    
    // Public methods
    isModalOpen() {
        return this.isOpen;
    }
    
    getCurrentVideo() {
        return {
            src: this.modalVideo.src,
            title: this.modalVideo.getAttribute('data-title')
        };
    }
}

// Image modal for portfolio thumbnails
class ImageModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'image-modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="" alt="" class="modal-image">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                </div>
            </div>
        `;
        
        // Add styles
        this.modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        `;
        
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            margin: 5% auto;
            width: 90%;
            max-width: 800px;
            background: var(--surface-color);
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-xl);
        `;
        
        const modalImage = this.modal.querySelector('.modal-image');
        modalImage.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
        `;
        
        const modalInfo = this.modal.querySelector('.modal-info');
        modalInfo.style.cssText = `
            padding: 2rem;
            text-align: center;
        `;
        
        const closeBtn = this.modal.querySelector('.close-modal');
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            color: var(--text-primary);
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 10;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-normal);
        `;
        
        document.body.appendChild(this.modal);
    }
    
    bindEvents() {
        const closeBtn = this.modal.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    open(imageSrc, title = '', description = '') {
        if (!this.modal) return;
        
        this.isOpen = true;
        
        const modalImage = this.modal.querySelector('.modal-image');
        const modalTitle = this.modal.querySelector('.modal-title');
        const modalDescription = this.modal.querySelector('.modal-description');
        
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus for keyboard navigation
        this.modal.focus();
    }
    
    close() {
        if (!this.modal || !this.isOpen) return;
        
        this.isOpen = false;
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeModals();
});

function initializeModals() {
    // Initialize video modal
    window.videoModal = new VideoModal();
    
    // Initialize image modal
    window.imageModal = new ImageModal();
    
    // Add click handlers to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const thumbnail = this.querySelector('.video-thumbnail img');
            const title = this.querySelector('h3, h4')?.textContent || 'Video';
            const videoSrc = this.getAttribute('data-video-src') || 'assets/videos/sample-video.mp4';
            
            if (thumbnail) {
                // Open video modal
                window.videoModal.open(videoSrc, title);
            }
        });
    });
    
    // Add click handlers to image thumbnails
    const imageThumbnails = document.querySelectorAll('.image-thumbnail');
    imageThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageSrc = this.src || this.getAttribute('data-src');
            const title = this.alt || this.getAttribute('data-title') || 'Image';
            const description = this.getAttribute('data-description') || '';
            
            if (imageSrc) {
                window.imageModal.open(imageSrc, title, description);
            }
        });
    });
}

// Utility functions
function openVideoModal(videoSrc, title) {
    if (window.videoModal) {
        window.videoModal.open(videoSrc, title);
    }
}

function closeVideoModal() {
    if (window.videoModal) {
        window.videoModal.close();
    }
}

function openImageModal(imageSrc, title, description) {
    if (window.imageModal) {
        window.imageModal.open(imageSrc, title, description);
    }
}

function closeImageModal() {
    if (window.imageModal) {
        window.imageModal.close();
    }
}

// Export for use in other files
window.VideoModal = VideoModal;
window.ImageModal = ImageModal;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
