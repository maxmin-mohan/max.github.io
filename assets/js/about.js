// About page functionality for Mohan Kumar's Video Editing Portfolio

class AboutAnimations {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.philosophyCards = document.querySelectorAll('.philosophy-card');
        this.stats = document.querySelectorAll('.stat');
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupStatsCounter();
        this.setupTimelineAnimation();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.philosophy-card, .timeline-item, .skill-category, .tool-item, .process-step'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    animateSkillBar(skillBar) {
        const width = skillBar.getAttribute('data-width');
        if (width) {
            skillBar.style.width = '0%';
            skillBar.style.transition = 'width 1.5s ease-in-out';
            
            setTimeout(() => {
                skillBar.style.width = width;
            }, 200);
        }
    }
    
    setupStatsCounter() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    animateStats(statElement) {
        const statNumber = statElement.querySelector('h3');
        if (!statNumber) return;
        
        const targetValue = parseInt(statNumber.textContent.replace(/\D/g, ''));
        const suffix = statNumber.textContent.replace(/\d/g, '');
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            statNumber.textContent = Math.floor(currentValue) + suffix;
        }, 16);
    }
    
    setupTimelineAnimation() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTimelineItem(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        this.timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    animateTimelineItem(timelineItem) {
        const stepNumber = timelineItem.querySelector('.step-number');
        const content = timelineItem.querySelector('.timeline-content');
        
        if (stepNumber) {
            stepNumber.style.transform = 'scale(0)';
            stepNumber.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                stepNumber.style.transform = 'scale(1)';
            }, 200);
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 400);
        }
    }
}

class ProfileImage {
    constructor() {
        this.profileImg = document.getElementById('profileImg');
        this.imageOverlay = document.querySelector('.image-overlay');
        
        this.init();
    }
    
    init() {
        if (this.profileImg) {
            this.setupImageEffects();
        }
    }
    
    setupImageEffects() {
        // Add hover effect
        this.profileImg.addEventListener('mouseenter', () => {
            this.imageOverlay.style.opacity = '1';
            this.profileImg.style.transform = 'scale(1.05)';
        });
        
        this.profileImg.addEventListener('mouseleave', () => {
            this.imageOverlay.style.opacity = '0';
            this.profileImg.style.transform = 'scale(1)';
        });
        
        // Add click effect
        this.profileImg.addEventListener('click', () => {
            this.showImageModal();
        });
    }
    
    showImageModal() {
        const imageSrc = this.profileImg.src;
        const title = 'Mohan Kumar';
        const description = 'Professional Video Editor';
        
        if (window.imageModal) {
            window.imageModal.open(imageSrc, title, description);
        }
    }
}

class PhilosophyCards {
    constructor() {
        this.cards = document.querySelectorAll('.philosophy-card');
        this.init();
    }
    
    init() {
        this.setupCardEffects();
    }
    
    setupCardEffects() {
        this.cards.forEach((card, index) => {
            // Staggered animation delay
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-xl)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-md)';
            });
            
            // Add click effect
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                }, 150);
            });
        });
    }
}

class ProcessSteps {
    constructor() {
        this.steps = document.querySelectorAll('.process-step');
        this.init();
    }
    
    init() {
        this.setupStepEffects();
    }
    
    setupStepEffects() {
        this.steps.forEach((step, index) => {
            const stepNumber = step.querySelector('.step-number');
            const stepContent = step.querySelector('.step-content');
            
            // Staggered animation
            step.style.animationDelay = `${index * 0.3}s`;
            
            // Add hover effects
            step.addEventListener('mouseenter', function() {
                if (stepNumber) {
                    stepNumber.style.transform = 'scale(1.1)';
                    stepNumber.style.background = 'linear-gradient(135deg, var(--primary-color), #ffed4e)';
                }
            });
            
            step.addEventListener('mouseleave', function() {
                if (stepNumber) {
                    stepNumber.style.transform = 'scale(1)';
                    stepNumber.style.background = 'var(--primary-color)';
                }
            });
        });
    }
}

class ToolsGrid {
    constructor() {
        this.tools = document.querySelectorAll('.tool-item');
        this.init();
    }
    
    init() {
        this.setupToolEffects();
    }
    
    setupToolEffects() {
        this.tools.forEach((tool, index) => {
            const icon = tool.querySelector('i');
            
            // Staggered animation
            tool.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effects
            tool.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.color = 'var(--primary-color)';
                }
            });
            
            tool.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.color = 'var(--primary-color)';
                }
            });
        });
    }
}

class SkillsSection {
    constructor() {
        this.skillCategories = document.querySelectorAll('.skill-category');
        this.init();
    }
    
    init() {
        this.setupSkillEffects();
    }
    
    setupSkillEffects() {
        this.skillCategories.forEach((category, index) => {
            const skillItems = category.querySelectorAll('.skill-item');
            
            // Staggered animation
            category.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effects to skill items
            skillItems.forEach((item, itemIndex) => {
                item.style.animationDelay = `${(index * 0.2) + (itemIndex * 0.1)}s`;
                
                item.addEventListener('mouseenter', function() {
                    const skillBar = this.querySelector('.skill-progress');
                    if (skillBar) {
                        skillBar.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    const skillBar = this.querySelector('.skill-progress');
                    if (skillBar) {
                        skillBar.style.boxShadow = 'none';
                    }
                });
            });
        });
    }
}

// Initialize about page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAbout();
});

function initializeAbout() {
    // Initialize animations
    window.aboutAnimations = new AboutAnimations();
    
    // Initialize profile image
    window.profileImage = new ProfileImage();
    
    // Initialize philosophy cards
    window.philosophyCards = new PhilosophyCards();
    
    // Initialize process steps
    window.processSteps = new ProcessSteps();
    
    // Initialize tools grid
    window.toolsGrid = new ToolsGrid();
    
    // Initialize skills section
    window.skillsSection = new SkillsSection();
    
    // Add custom styles
    addAboutStyles();
}

function addAboutStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .profile-image {
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .image-overlay {
            transition: opacity 0.3s ease;
        }
        
        .philosophy-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .process-step {
            transition: all 0.3s ease;
        }
        
        .step-number {
            transition: all 0.3s ease;
        }
        
        .tool-item {
            transition: all 0.3s ease;
        }
        
        .tool-item i {
            transition: all 0.3s ease;
        }
        
        .skill-item {
            transition: all 0.3s ease;
        }
        
        .skill-progress {
            transition: all 0.3s ease;
        }
        
        .timeline-item {
            transition: all 0.3s ease;
        }
        
        .timeline-content {
            transition: all 0.3s ease;
        }
        
        .stat h3 {
            transition: all 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .step-number:hover {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function animateSkillBar(skillBar) {
    if (window.aboutAnimations) {
        window.aboutAnimations.animateSkillBar(skillBar);
    }
}

function animateStats(statElement) {
    if (window.aboutAnimations) {
        window.aboutAnimations.animateStats(statElement);
    }
}

// Export for use in other files
window.AboutAnimations = AboutAnimations;
window.ProfileImage = ProfileImage;
window.PhilosophyCards = PhilosophyCards;
window.ProcessSteps = ProcessSteps;
window.ToolsGrid = ToolsGrid;
window.SkillsSection = SkillsSection;
window.animateSkillBar = animateSkillBar;
window.animateStats = animateStats;
