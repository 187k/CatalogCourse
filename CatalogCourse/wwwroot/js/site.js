// Futuristic animations and interactions
document.addEventListener('DOMContentLoaded', function () {
    initializeFuturisticAnimations();
    initializeFormValidation();
    initializeButtonEffects();
});

// Initialize all animations
function initializeFuturisticAnimations() {
    // Animate cards
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });

    // Animate table rows
    const tableRows = document.querySelectorAll('.futuristic-table tbody tr');
    tableRows.forEach((row, index) => {
        row.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
    });

    // Animate form container
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.animation = 'fadeInUp 0.8s ease-out both';
    }

    // Background elements animation
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animation = `float 8s infinite ease-in-out ${index * 2}s`;
    });
}

// Form validation enhancements
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-control-futuristic');

    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });

        // Real-time validation for some fields
        if (input.type === 'email' || input.name === 'Link') {
            input.addEventListener('input', function () {
                validateField(this);
            });
        }
    });

    // Form submission enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const formInputs = this.querySelectorAll('.form-control-futuristic');

            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const errorSpan = field.nextElementSibling;
    const hasError = errorSpan && errorSpan.classList.contains('text-danger') && errorSpan.textContent.trim() !== '';

    if (hasError) {
        field.classList.add('input-error');
        return false;
    } else {
        field.classList.remove('input-error');
        return true;
    }
}

// Button effects and animations
function initializeButtonEffects() {
    // Pulsing effect for primary buttons
    const saveButtons = document.querySelectorAll('.btn-success-futuristic');
    saveButtons.forEach(btn => {
        setInterval(() => {
            btn.style.animation = 'glow 2s infinite';
            setTimeout(() => {
                btn.style.animation = '';
            }, 2000);
        }, 8000);
    });

    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn-futuristic, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .btn-futuristic, .nav-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `futuristic-notification futuristic-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .futuristic-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                padding: 15px 20px;
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            }

            .futuristic-notification-success {
                border-color: var(--success);
                background: rgba(46, 213, 115, 0.1);
            }

            .futuristic-notification-error {
                border-color: var(--danger);
                background: rgba(255, 71, 87, 0.1);
            }

            .futuristic-notification-warning {
                border-color: var(--warning);
                background: rgba(255, 165, 2, 0.1);
            }

            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                margin-left: auto;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }

    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Utility function for dynamic filter (if needed)
function filterCourses(language) {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        const cardLanguage = card.querySelector('.language-badge').textContent;
        if (language === '' || cardLanguage === language) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Export functions for global use
window.FuturisticUI = {
    showNotification,
    filterCourses,
    initializeFuturisticAnimations
};