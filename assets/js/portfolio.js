// Portfolio functionality for Mohan Kumar's Video Editing Portfolio

class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.activeFilter = 'all';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeFilter();
    }
    
    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.setActiveFilter(filter);
            });
        });
    }
    
    setActiveFilter(filter) {
        this.activeFilter = filter;
        
        // Update button states
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-filter') === filter) {
                button.classList.add('active');
            }
        });
        
        // Filter items
        this.filterItems();
        
        // Animate filtered items
        this.animateFilteredItems();
    }
    
    filterItems() {
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (this.activeFilter === 'all' || category === this.activeFilter) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    }
    
    animateFilteredItems() {
        const visibleItems = Array.from(this.portfolioItems).filter(item => 
            !item.classList.contains('hidden')
        );
        
        visibleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    initializeFilter() {
        // Set initial state
        this.setActiveFilter('all');
    }
    
    // Public method to reinitialize after dynamic content is loaded
    reinitialize() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.initializeFilter();
    }
}

class PortfolioGrid {
    constructor() {
        this.grid = document.getElementById('portfolioGrid');
        this.items = document.querySelectorAll('.portfolio-item');
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.setupMasonryLayout();
        this.addScrollAnimations();
        this.addHoverEffects();
    }
    
    setupMasonryLayout() {
        if (!this.grid) return;
        
        // Simple masonry-like layout using CSS Grid
        this.grid.style.display = 'grid';
        this.grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        this.grid.style.gap = '2rem';
        
        // Add staggered animation
        this.items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.items.forEach(item => {
            observer.observe(item);
        });
    }
    
    addHoverEffects() {
        this.items.forEach(item => {
            const videoCard = item.querySelector('.video-card');
            
            if (videoCard) {
                videoCard.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = 'var(--shadow-xl)';
                });
                
                videoCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'var(--shadow-md)';
                });
            }
        });
    }
}

class VideoPreview {
    constructor() {
        this.videoCards = document.querySelectorAll('.video-card');
        this.previewTimeout = null;
        this.currentPreview = null;
        
        this.init();
    }
    
    init() {
        this.addPreviewHandlers();
    }
    
    addPreviewHandlers() {
        this.videoCards.forEach(card => {
            const thumbnail = card.querySelector('.video-thumbnail');
            
            if (thumbnail) {
                thumbnail.addEventListener('mouseenter', (e) => {
                    this.startPreview(card);
                });
                
                thumbnail.addEventListener('mouseleave', (e) => {
                    this.stopPreview(card);
                });
            }
        });
    }
    
    startPreview(card) {
        // Clear any existing preview
        this.stopPreview();
        
        const videoSrc = card.getAttribute('data-video-src');
        if (!videoSrc) return;
        
        // Create preview video element
        const previewVideo = document.createElement('video');
        previewVideo.src = videoSrc;
        previewVideo.muted = true;
        previewVideo.loop = true;
        previewVideo.autoplay = true;
        previewVideo.className = 'video-preview';
        
        // Style the preview video
        previewVideo.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
        `;
        
        // Add to thumbnail
        const thumbnail = card.querySelector('.video-thumbnail');
        thumbnail.style.position = 'relative';
        thumbnail.appendChild(previewVideo);
        
        this.currentPreview = previewVideo;
        
        // Set timeout to stop preview
        this.previewTimeout = setTimeout(() => {
            this.stopPreview(card);
        }, 5000); // 5 second preview
    }
    
    stopPreview(card = null) {
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
            this.previewTimeout = null;
        }
        
        if (this.currentPreview) {
            this.currentPreview.pause();
            this.currentPreview.remove();
            this.currentPreview = null;
        }
        
        // If specific card provided, stop its preview
        if (card) {
            const previewVideo = card.querySelector('.video-preview');
            if (previewVideo) {
                previewVideo.pause();
                previewVideo.remove();
            }
        }
    }
}

class PortfolioSearch {
    constructor() {
        this.searchInput = document.querySelector('.portfolio-search input');
        this.searchResults = document.querySelector('.search-results');
        this.allItems = document.querySelectorAll('.portfolio-item');
        
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        this.searchInput.addEventListener('focus', () => {
            this.showSearchResults();
        });
    }
    
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.showAllItems();
            return;
        }
        
        this.allItems.forEach(item => {
            const title = item.querySelector('h3, h4')?.textContent.toLowerCase() || '';
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            const category = item.getAttribute('data-category') || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
        
        this.updateSearchResults(query);
    }
    
    showAllItems() {
        this.allItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('hidden');
        });
    }
    
    updateSearchResults(query) {
        if (!this.searchResults) return;
        
        const visibleItems = Array.from(this.allItems).filter(item => 
            !item.classList.contains('hidden')
        );
        
        if (query && visibleItems.length === 0) {
            this.searchResults.innerHTML = '<p>No results found for "' + query + '"</p>';
            this.searchResults.style.display = 'block';
        } else {
            this.searchResults.style.display = 'none';
        }
    }
    
    showSearchResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'block';
        }
    }
}

class PortfolioSort {
    constructor() {
        this.sortSelect = document.querySelector('.portfolio-sort select');
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.items = Array.from(document.querySelectorAll('.portfolio-item'));
        
        this.init();
    }
    
    init() {
        if (this.sortSelect) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.sortSelect.addEventListener('change', (e) => {
            this.sortItems(e.target.value);
        });
    }
    
    sortItems(sortBy) {
        const sortedItems = [...this.items].sort((a, b) => {
            switch (sortBy) {
                case 'title-asc':
                    return this.getTitle(a).localeCompare(this.getTitle(b));
                case 'title-desc':
                    return this.getTitle(b).localeCompare(this.getTitle(a));
                case 'category-asc':
                    return this.getCategory(a).localeCompare(this.getCategory(b));
                case 'category-desc':
                    return this.getCategory(b).localeCompare(this.getCategory(a));
                case 'date-newest':
                    return this.getDate(b) - this.getDate(a);
                case 'date-oldest':
                    return this.getDate(a) - this.getDate(b);
                default:
                    return 0;
            }
        });
        
        // Reorder items in DOM
        sortedItems.forEach(item => {
            this.portfolioGrid.appendChild(item);
        });
        
        // Animate reordered items
        this.animateSortedItems();
    }
    
    getTitle(item) {
        return item.querySelector('h3, h4')?.textContent || '';
    }
    
    getCategory(item) {
        return item.getAttribute('data-category') || '';
    }
    
    getDate(item) {
        const dateAttr = item.getAttribute('data-date');
        return dateAttr ? new Date(dateAttr).getTime() : 0;
    }
    
    animateSortedItems() {
        this.items.forEach((item, index) => {
            item.style.transition = 'transform 0.3s ease';
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 50);
        });
    }
}

// Initialize portfolio functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize portfolio filter
    window.portfolioFilter = new PortfolioFilter();
    
    // Initialize portfolio grid
    window.portfolioGrid = new PortfolioGrid();
    
    // Initialize video preview
    window.videoPreview = new VideoPreview();
    
    // Initialize search if search input exists
    if (document.querySelector('.portfolio-search input')) {
        window.portfolioSearch = new PortfolioSearch();
    }
    
    // Initialize sort if sort select exists
    if (document.querySelector('.portfolio-sort select')) {
        window.portfolioSort = new PortfolioSort();
    }
    
    // Add lazy loading for images
    addLazyLoading();
    
    // Add infinite scroll if needed
    addInfiniteScroll();
}

function addLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function addInfiniteScroll() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // Add more items here
                this.textContent = 'Load More';
                this.disabled = false;
            }, 1000);
        });
    }
}

// Utility functions
function filterPortfolio(category) {
    if (window.portfolioFilter) {
        window.portfolioFilter.setActiveFilter(category);
    }
}

function searchPortfolio(query) {
    if (window.portfolioSearch) {
        window.portfolioSearch.performSearch(query);
    }
}

function sortPortfolio(sortBy) {
    if (window.portfolioSort) {
        window.portfolioSort.sortItems(sortBy);
    }
}

// Export for use in other files
window.PortfolioFilter = PortfolioFilter;
window.PortfolioGrid = PortfolioGrid;
window.VideoPreview = VideoPreview;
window.PortfolioSearch = PortfolioSearch;
window.PortfolioSort = PortfolioSort;
window.filterPortfolio = filterPortfolio;
window.searchPortfolio = searchPortfolio;
window.sortPortfolio = sortPortfolio;
