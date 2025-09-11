/**
 * Featured Work Component - Vanilla JavaScript
 * A responsive grid component for showcasing video work with Google Drive integration
 */

class FeaturedWork {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.modal = document.getElementById('featuredWorkModal');
        this.modalVideo = document.getElementById('featuredWorkModalVideo');
        this.modalClose = document.getElementById('featuredWorkModalClose');
        this.modalTitle = document.getElementById('featuredWorkModalTitle');
        this.modalCategory = document.getElementById('featuredWorkModalCategory');
        
        this.options = {
            videos: options.videos || [],
            autoplay: options.autoplay !== false,
            showCategory: options.showCategory !== false,
            showTitle: options.showTitle !== false,
            ...options
        };
        
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Featured Work container not found');
            return;
        }
        
        this.renderGrid();
        this.bindEvents();
        this.setupImageLoading();
    }

    renderGrid() {
        if (!this.options.videos.length) {
            this.container.innerHTML = '<p style="text-align: center; color: #b3b3b3; grid-column: 1 / -1;">No videos available</p>';
            return;
        }

        this.container.innerHTML = this.options.videos.map((video, index) => `
            <div class="featured-work-item" 
                 data-video-id="${video.videoId}" 
                 data-title="${this.escapeHtml(video.title)}" 
                 data-category="${this.escapeHtml(video.category)}" 
                 data-index="${index}"
                 tabindex="0"
                 role="button"
                 aria-label="Play ${video.title}">
                <img src="${video.thumbnail}" 
                     alt="${this.escapeHtml(video.title)}" 
                     class="featured-work-thumbnail" 
                     loading="lazy"
                     onload="this.classList.add('loaded')"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg=='; this.classList.add('loaded');">
                <div class="featured-work-overlay">
                    <div class="featured-work-play-icon">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="featured-work-info">
                    ${this.options.showTitle ? `<h3 class="featured-work-item-title">${this.escapeHtml(video.title)}</h3>` : ''}
                    ${this.options.showCategory ? `<p class="featured-work-item-category">${this.escapeHtml(video.category)}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    bindEvents() {
        // Grid item clicks
        this.container.addEventListener('click', (e) => {
            const workItem = e.target.closest('.featured-work-item');
            if (workItem) {
                this.openModal(workItem);
            }
        });

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const workItem = e.target.closest('.featured-work-item');
                if (workItem) {
                    this.openModal(workItem);
                }
            }
        });

        // Modal close events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    setupImageLoading() {
        // Add loading states for images
        const images = this.container.querySelectorAll('.featured-work-thumbnail');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                // Fallback for broken images
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                img.classList.add('loaded');
            });
        });
    }

    openModal(workItem) {
        if (!this.modal) {
            console.error('Modal not found');
            return;
        }

        const videoId = workItem.dataset.videoId;
        const title = workItem.dataset.title;
        const category = workItem.dataset.category;

        if (!videoId) {
            console.error('Video ID not found');
            return;
        }

        // Update modal content
        if (this.modalTitle) this.modalTitle.textContent = title;
        if (this.modalCategory) this.modalCategory.textContent = category;

        // Create Google Drive embed URL
        const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;
        if (this.modalVideo) {
            this.modalVideo.src = embedUrl;
        }

        // Show modal with animation
        this.modal.style.display = 'flex';
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus management
        if (this.modalClose) {
            this.modalClose.focus();
        }

        // Dispatch custom event
        this.dispatchEvent('modalOpened', { videoId, title, category });
    }

    closeModal() {
        if (!this.modal) return;

        // Hide modal with animation
        this.modal.classList.remove('active');
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            if (this.modalVideo) {
                this.modalVideo.src = '';
            }
            document.body.style.overflow = 'auto';
        }, 300);

        // Dispatch custom event
        this.dispatchEvent('modalClosed');
    }

    // Public method to update videos
    updateVideos(videos) {
        this.options.videos = videos;
        this.renderGrid();
        this.setupImageLoading();
    }

    // Public method to add a single video
    addVideo(video) {
        this.options.videos.push(video);
        this.renderGrid();
        this.setupImageLoading();
    }

    // Public method to remove a video
    removeVideo(videoId) {
        this.options.videos = this.options.videos.filter(video => video.videoId !== videoId);
        this.renderGrid();
        this.setupImageLoading();
    }

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleResize() {
        // Handle responsive adjustments if needed
        const items = this.container.querySelectorAll('.featured-work-item');
        items.forEach(item => {
            // Reset any transform that might be stuck
            if (item.style.transform) {
                item.style.transform = '';
            }
        });
    }

    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`featuredWork:${eventName}`, {
            detail,
            bubbles: true
        });
        this.container.dispatchEvent(event);
    }

    // Public method to get current videos
    getVideos() {
        return [...this.options.videos];
    }

    // Public method to get video by ID
    getVideo(videoId) {
        return this.options.videos.find(video => video.videoId === videoId);
    }
}

// Auto-initialize if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-featured-work]');
    containers.forEach(container => {
        const videos = JSON.parse(container.dataset.videos || '[]');
        const options = JSON.parse(container.dataset.options || '{}');
        
        new FeaturedWork(container.id, {
            videos,
            ...options
        });
    });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeaturedWork;
} else {
    window.FeaturedWork = FeaturedWork;
}
