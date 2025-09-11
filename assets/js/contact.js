// Contact form functionality for Mohan Kumar's Video Editing Portfolio

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.inputs = this.form?.querySelectorAll('input, textarea, select');
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
        this.setupFormStyling();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
        
        // Phone number formatting
        const phoneInput = this.form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }
    }
    
    setupValidation() {
        // Add validation rules
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Name must be at least 2 characters and contain only letters'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                required: false,
                pattern: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Please enter a valid phone number'
            },
            message: {
                required: true,
                minLength: 10,
                message: 'Message must be at least 10 characters long'
            }
        };
    }
    
    setupFormStyling() {
        // Add floating label effect
        this.inputs.forEach(input => {
            if (input.type !== 'checkbox') {
                this.setupFloatingLabel(input);
            }
        });
    }
    
    setupFloatingLabel(input) {
        const label = this.form.querySelector(`label[for="${input.name}"]`);
        if (!label) return;
        
        // Check if input has value on load
        if (input.value.trim() !== '') {
            label.classList.add('floating');
        }
        
        input.addEventListener('focus', () => {
            label.classList.add('floating');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                label.classList.remove('floating');
            }
        });
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Pattern validation
        if (isValid && value && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Min length validation
        if (isValid && value && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Show/hide error
        this.showFieldError(field, isValid, errorMessage);
        
        return isValid;
    }
    
    showFieldError(field, isValid, message) {
        const errorElement = this.form.querySelector(`#${field.name}Error`);
        
        if (errorElement) {
            if (isValid) {
                errorElement.style.display = 'none';
                field.classList.remove('error');
            } else {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                field.classList.add('error');
            }
        }
    }
    
    clearFieldError(field) {
        const errorElement = this.form.querySelector(`#${field.name}Error`);
        if (errorElement) {
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }
    
    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        input.value = value;
    }
    
    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) return;
        
        this.isSubmitting = true;
        this.setSubmitState(true);
        
        try {
            // Collect form data
            const formData = this.collectFormData();
            
            // Submit form (replace with actual submission logic)
            const response = await this.submitFormData(formData);
            
            if (response.success) {
                this.showSuccessMessage();
                this.resetForm();
            } else {
                this.showErrorMessage(response.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            this.isSubmitting = false;
            this.setSubmitState(false);
        }
    }
    
    validateForm() {
        let isValid = true;
        
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        // Add user agent and referrer
        data.userAgent = navigator.userAgent;
        data.referrer = document.referrer;
        
        return data;
    }
    
    async submitFormData(data) {
        // Simulate API call (replace with actual endpoint)
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success
                resolve({ success: true, message: 'Message sent successfully!' });
                
                // In a real implementation, you would:
                // 1. Send data to your backend API
                // 2. Handle the response
                // 3. Return appropriate success/error messages
            }, 2000);
        });
    }
    
    setSubmitState(isSubmitting) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (isSubmitting) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccessMessage() {
        this.showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
    }
    
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.form-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `form-notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Reset floating labels
        this.inputs.forEach(input => {
            if (input.type !== 'checkbox') {
                const label = this.form.querySelector(`label[for="${input.name}"]`);
                if (label) {
                    label.classList.remove('floating');
                }
            }
        });
        
        // Clear all errors
        this.inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }
}

class ContactInfo {
    constructor() {
        this.contactItems = document.querySelectorAll('.contact-item');
        this.socialLinks = document.querySelectorAll('.social-link');
        
        this.init();
    }
    
    init() {
        this.addHoverEffects();
        this.addClickEffects();
    }
    
    addHoverEffects() {
        this.contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
    
    addClickEffects() {
        this.socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

class FAQ {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    this.toggleItem(item);
                });
            }
        });
    }
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
}

// Initialize contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContact();
});

function initializeContact() {
    // Initialize contact form
    window.contactForm = new ContactForm();
    
    // Initialize contact info
    window.contactInfo = new ContactInfo();
    
    // Initialize FAQ
    window.faq = new FAQ();
    
    // Add CSS for animations
    addContactStyles();
}

function addContactStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group label {
            position: relative;
            transition: all 0.3s ease;
        }
        
        .form-group label.floating {
            transform: translateY(-20px) scale(0.9);
            color: var(--primary-color);
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: var(--error-color) !important;
            box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
        }
        
        .contact-item {
            transition: transform 0.3s ease;
        }
        
        .social-link {
            position: relative;
            overflow: hidden;
        }
        
        .faq-item {
            transition: all 0.3s ease;
        }
        
        .faq-answer {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function submitContactForm() {
    if (window.contactForm) {
        window.contactForm.handleSubmit();
    }
}

function validateContactField(fieldName) {
    if (window.contactForm) {
        const field = window.contactForm.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            return window.contactForm.validateField(field);
        }
    }
    return false;
}

// Export for use in other files
window.ContactForm = ContactForm;
window.ContactInfo = ContactInfo;
window.FAQ = FAQ;
window.submitContactForm = submitContactForm;
window.validateContactField = validateContactField;
