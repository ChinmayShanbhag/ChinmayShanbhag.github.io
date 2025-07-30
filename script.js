/**
 * Personal Portfolio Website JavaScript
 * Features: GSAP Animations, ScrollTrigger, Mobile Navigation, Form Handling
 * Author: Your Name
 */

// ===== GSAP REGISTRATION =====
gsap.registerPlugin(ScrollTrigger);

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeStatCounters();
    initializeProjectCards();
    initializeParallaxEffects();
});

// ===== GSAP ANIMATIONS INITIALIZATION =====
function initializeAnimations() {
    // Set initial states for animations
    gsap.set('.hero-greeting, .hero-name, .hero-subtitle, .hero-description, .hero-buttons', {
        opacity: 0,
        y: 50
    });
    
    gsap.set('.hero-visual', {
        opacity: 0,
        scale: 0.8
    });
    
    gsap.set('.section-title, .section-subtitle', {
        opacity: 0,
        y: 30
    });
    
    gsap.set('.project-card, .stat-item, .skill-category', {
        opacity: 0,
        y: 50
    });

    // Hero section entrance animation
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    heroTimeline
        .to('.hero-greeting', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.hero-name', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.6')
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-visual', {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)'
        }, '-=0.8');

    // Section headers animation on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.to(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out'
        });
    });

    // About section animations
    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });

    aboutTimeline
        .to('.about-text', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.stat-item', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.4');

    // Skills animation
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.to(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Contact section animation
    const contactTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });

    contactTimeline
        .to('.contact-info', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.contact-form', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');
}

// ===== PROJECT CARDS ANIMATION =====
function initializeProjectCards() {
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        // Set initial state
        gsap.set(card, {
            opacity: 0,
            y: 50,
            scale: 0.9
        });

        // Animate on scroll
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });

        // Hover animation enhancement
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-background', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: '50%',
        ease: 'none'
    });

    // Floating animation for hero visual
    gsap.to('.animated-bg', {
        y: '+=20',
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });

    // Scroll indicator fade out
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'bottom 80%',
            end: 'bottom 50%',
            scrub: 1
        },
        opacity: 0,
        y: 20,
        ease: 'none'
    });
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Animate menu items
            if (isMenuOpen) {
                gsap.fromTo('.nav-links .nav-link', 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.3, 
                        stagger: 0.1,
                        delay: 0.2
                    }
                );
            }
        });
    }

    // Close mobile menu when clicking on nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                isMenuOpen = false;
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll progress indicator (optional enhancement)
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== STAT COUNTERS =====
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(stat, {
                    innerText: finalNumber,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        stat.innerText = Math.ceil(stat.innerText);
                    }
                });
            }
        });
    });
}

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.name + '-error');
    let isValid = true;
    let errorMessage = '';

    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'text':
        case 'textarea':
            if (value.length < 2) {
                isValid = false;
                errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} must be at least 2 characters`;
            }
            break;
    }

    if (value === '') {
        isValid = false;
        errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
    }

    if (errorElement) {
        errorElement.textContent = isValid ? '' : errorMessage;
        field.style.borderColor = isValid ? '' : '#e53e3e';
    }

    return isValid;
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification('Please fix the errors above', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual endpoint)
        await simulateFormSubmission(formData);
        
        // Success state
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Success animation
        gsap.to(form, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
    } catch (error) {
        showNotification('Something went wrong. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function simulateFormSubmission(formData) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Randomly succeed or fail for demo purposes
            Math.random() > 0.1 ? resolve() : reject(new Error('Simulated error'));
        }, 2000);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Any scroll-based functionality that doesn't use ScrollTrigger
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(() => {
    // Recalculate ScrollTrigger positions on resize
    ScrollTrigger.refresh();
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        isMenuOpen = false;
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus management for mobile menu
document.addEventListener('focusin', (e) => {
    if (isMenuOpen) {
        const navLinks = document.querySelector('.nav-links');
        const focusableElements = navLinks.querySelectorAll('a, button');
        
        if (!navLinks.contains(e.target)) {
            focusableElements[0].focus();
        }
    }
});

// ===== LAZY LOADING ENHANCEMENT =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger actual loading
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
} else {
    initializeLazyLoading();
}

// ===== CONSOLE EASTER EGG =====
console.log(`
🎨 Portfolio Website
━━━━━━━━━━━━━━━━━━━━
Built with: HTML5, CSS3, JavaScript & GSAP
Performance: Optimized for speed and accessibility
Mobile: Fully responsive design

👋 Hello fellow developer!
If you're interested in the code or want to collaborate,
feel free to reach out!
`);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAnimations,
        initializeNavigation,
        showNotification,
        throttle,
        debounce
    };
} 