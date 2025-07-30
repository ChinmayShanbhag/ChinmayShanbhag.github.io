/**
 * ETHEREAL PORTFOLIO - Advanced Animation System
 * 
 * Performance-optimized for 120fps displays with advanced GSAP ScrollTrigger animations,
 * particle systems, neural network visualizations, and device-specific optimizations.
 * 
 * Author: Alex Rivera
 * Technologies: GSAP 3.12+, ScrollTrigger, Canvas API, WebGL optimization
 */

// ===== PERFORMANCE & ANIMATION GLOBALS =====
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global animation state and performance tracking
const ANIMATION_STATE = {
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isHighRefreshRate: window.screen.refreshRate > 60 || false,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth <= 1024 && window.innerWidth > 768,
    devicePixelRatio: window.devicePixelRatio || 1,
    isMenuOpen: false,
    particleSystem: null,
    neuralNetwork: null
};

// Performance-optimized animation durations for 120fps
const DURATIONS = {
    instant: 0.08,
    fast: 0.16,
    normal: 0.24,
    slow: 0.48,
    elastic: 0.6
};

// Hardware-accelerated easing curves
const EASINGS = {
    outExpo: "power4.out",
    outBack: "back.out(1.7)",
    outElastic: "elastic.out(1, 0.3)",
    outQuart: "power3.out",
    inOutQuart: "power3.inOut"
};

// ===== PARTICLE SYSTEM CLASS =====
class ParticleSystem {
    constructor(container, options = {}) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = container;
        this.particles = [];
        
        // Performance-optimized defaults
        this.options = {
            count: ANIMATION_STATE.isMobile ? 30 : 50,
            maxSpeed: 0.5,
            connectionDistance: 120,
            particleSize: ANIMATION_STATE.devicePixelRatio,
            colors: ['#667eea', '#764ba2', '#f093fb', '#00d4ff'],
            ...options
        };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        // Set canvas size with device pixel ratio optimization
        this.resize();
        this.container.appendChild(this.canvas);
        
        // Create particles with hardware acceleration in mind
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.maxSpeed,
                vy: (Math.random() - 0.5) * this.options.maxSpeed,
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        // Optimize for high DPI displays while maintaining performance
        const pixelRatio = Math.min(ANIMATION_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(pixelRatio, pixelRatio);
    }
    
    bindEvents() {
        // Throttled resize for performance
        window.addEventListener('resize', this.throttle(() => {
            this.resize();
        }, 16), { passive: true });
    }
    
    update() {
        // Performance-optimized particle updates
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary collision with elastic bounce
            if (particle.x < 0 || particle.x > this.canvas.width / ANIMATION_STATE.devicePixelRatio) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height / ANIMATION_STATE.devicePixelRatio) {
                particle.vy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width / ANIMATION_STATE.devicePixelRatio, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height / ANIMATION_STATE.devicePixelRatio, particle.y));
        });
    }
    
    draw() {
        // Clear with optimized alpha blending
        this.ctx.fillStyle = 'rgba(15, 15, 35, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first (behind particles)
        this.drawConnections();
        
        // Draw particles with hardware acceleration hints
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, this.options.particleSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        // Optimized connection drawing with distance culling
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = (1 - distance / this.options.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        if (!ANIMATION_STATE.isReducedMotion) {
            this.update();
            this.draw();
        }
        
        // Use requestAnimationFrame for smooth 120fps when available
        requestAnimationFrame(() => this.animate());
    }
    
    // Performance utility
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== NEURAL NETWORK VISUALIZATION CLASS =====
class NeuralNetworkCanvas {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        
        this.options = {
            nodeCount: ANIMATION_STATE.isMobile ? 15 : 25,
            layers: ANIMATION_STATE.isMobile ? 3 : 4,
            pulseSpeed: 0.02,
            connectionOpacity: 0.3,
            nodeSize: 3,
            ...options
        };
        
        this.time = 0;
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createNetwork();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const pixelRatio = Math.min(ANIMATION_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.ctx.scale(pixelRatio, pixelRatio);
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const layerWidth = this.width / (this.options.layers + 1);
        const nodesPerLayer = Math.ceil(this.options.nodeCount / this.options.layers);
        
        // Create nodes in layers
        for (let layer = 0; layer < this.options.layers; layer++) {
            const x = layerWidth * (layer + 1);
            const layerHeight = this.height / (nodesPerLayer + 1);
            
            for (let node = 0; node < nodesPerLayer; node++) {
                this.nodes.push({
                    x: x + (Math.random() - 0.5) * 50,
                    y: layerHeight * (node + 1) + (Math.random() - 0.5) * 30,
                    layer: layer,
                    activation: Math.random(),
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        }
        
        // Create connections between adjacent layers
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((otherNode, j) => {
                if (i !== j && Math.abs(node.layer - otherNode.layer) === 1) {
                    this.connections.push({
                        from: i,
                        to: j,
                        weight: Math.random(),
                        pulse: 0
                    });
                }
            });
        });
    }
    
    update() {
        this.time += this.options.pulseSpeed;
        
        // Update node activations with sine wave
        this.nodes.forEach(node => {
            node.activation = (Math.sin(this.time + node.pulsePhase) + 1) / 2;
        });
        
        // Update connection pulses
        this.connections.forEach(connection => {
            connection.pulse = Math.sin(this.time * 2 + connection.weight * 10) * 0.5 + 0.5;
        });
    }
    
    draw() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            
            const opacity = this.options.connectionOpacity * connection.pulse;
            this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.options.nodeSize + node.activation * 2, 0, Math.PI * 2);
            
            const intensity = node.activation;
            this.ctx.fillStyle = `rgba(${102 + intensity * 50}, ${126 + intensity * 50}, 234, ${0.6 + intensity * 0.4})`;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = '#667eea';
            this.ctx.shadowBlur = 10 * intensity;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    animate() {
        if (!ANIMATION_STATE.isReducedMotion) {
            this.update();
            this.draw();
        }
        requestAnimationFrame(() => this.animate());
    }
}

// ===== MAGNETIC INTERACTION SYSTEM =====
class MagneticElements {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic-btn, .magnetic-project');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            // Optimize mouse events with passive listeners
            element.addEventListener('mouseenter', (e) => this.onMouseEnter(e), { passive: true });
            element.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
            element.addEventListener('mouseleave', (e) => this.onMouseLeave(e), { passive: true });
        });
    }
    
    onMouseEnter(e) {
        const element = e.currentTarget;
        // Pre-optimize for transform by setting will-change
        element.style.willChange = 'transform';
    }
    
    onMouseMove(e) {
        if (ANIMATION_STATE.isMobile) return; // Disable on mobile for performance
        
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate magnetic pull strength (max 20px)
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        // Use GSAP for hardware-accelerated transforms
        gsap.to(element, {
            x: deltaX,
            y: deltaY,
            duration: DURATIONS.fast,
            ease: EASINGS.outQuart
        });
    }
    
    onMouseLeave(e) {
        const element = e.currentTarget;
        
        // Return to original position
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: DURATIONS.normal,
            ease: EASINGS.outBack,
            onComplete: () => {
                // Remove will-change after animation
                element.style.willChange = 'auto';
            }
        });
    }
}

// ===== DEVICE-SPECIFIC ANIMATION SYSTEM =====
class DeviceOptimizedAnimations {
    constructor() {
        this.setupMatchMedia();
        this.initializeAnimations();
    }
    
    setupMatchMedia() {
        // GSAP MatchMedia for device-specific optimizations
        const mm = gsap.matchMedia();
        
        // Mobile optimizations (reduced complexity)
        mm.add("(max-width: 768px)", () => {
            ANIMATION_STATE.isMobile = true;
            this.initMobileAnimations();
        });
        
        // Tablet optimizations
        mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
            ANIMATION_STATE.isTablet = true;
            this.initTabletAnimations();
        });
        
        // Desktop optimizations (full complexity)
        mm.add("(min-width: 1025px)", () => {
            this.initDesktopAnimations();
        });
        
        // High refresh rate optimizations
        mm.add("(min-resolution: 120dpi)", () => {
            ANIMATION_STATE.isHighRefreshRate = true;
            this.enableHighRefreshRateOptimizations();
        });
        
        // Reduced motion support
        mm.add("(prefers-reduced-motion: reduce)", () => {
            ANIMATION_STATE.isReducedMotion = true;
            this.disableComplexAnimations();
        });
    }
    
    initMobileAnimations() {
        // Simplified animations for mobile performance
        gsap.set(['.floating-shape', '.floating-element'], { display: 'none' });
        
        // Reduce particle count
        if (ANIMATION_STATE.particleSystem) {
            ANIMATION_STATE.particleSystem.options.count = 15;
        }
    }
    
    initTabletAnimations() {
        // Moderate complexity for tablets
        gsap.set(['.floating-shape', '.floating-element'], { display: 'block' });
    }
    
    initDesktopAnimations() {
        // Full animation complexity for desktop
        this.initAdvancedParallax();
        this.initComplexGeometryAnimations();
    }
    
    enableHighRefreshRateOptimizations() {
        // Optimize for 120fps+ displays
        gsap.ticker.fps(120);
    }
    
    disableComplexAnimations() {
        // Disable complex animations for accessibility
        gsap.set('*', { animation: 'none', transition: 'none' });
    }
    
    initAdvancedParallax() {
        // Multi-layer parallax with different speeds
        gsap.utils.toArray('.floating-element').forEach((element, i) => {
            gsap.to(element, {
                y: (i + 1) * -100,
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1 + i * 0.5 // Different speeds for each layer
                }
            });
        });
    }
    
    initComplexGeometryAnimations() {
        // Advanced floating geometry animations
        gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            
            tl.to(shape, {
                rotation: 360,
                scale: 1.2,
                duration: 3 + i,
                ease: EASINGS.inOutQuart
            });
        });
    }
    
    initializeAnimations() {
        this.initHeroAnimations();
        this.initScrollTriggerAnimations();
        this.initTextAnimations();
        this.initMorphingAnimations();
    }
    
    // ===== HERO SECTION ANIMATIONS =====
    initHeroAnimations() {
        const tl = gsap.timeline({ delay: 0.5 });
        
        // Typewriter effect for hero subtitle
        if (document.querySelector('.typewriter-text')) {
            gsap.to('.typewriter-text', {
                text: "Creative Developer & Digital Artist",
                duration: 2,
                ease: "none",
                delay: 1.5
            });
            
            gsap.fromTo('.typewriter-text', 
                { opacity: 0 },
                { opacity: 1, duration: 0.5, delay: 1.5 }
            );
        }
        
        // Glitch effect trigger
        this.initGlitchEffect();
        
        // Staggered hero content animation
        tl.fromTo(['.hero-greeting', '.hero-name', '.hero-description'], 
            { 
                opacity: 0, 
                y: 50,
                // Hardware acceleration optimization
                force3D: true
            },
            { 
                opacity: 1, 
                y: 0,
                duration: DURATIONS.normal,
                ease: EASINGS.outExpo,
                stagger: 0.2
            }
        )
        .fromTo('.hero-buttons', 
            { opacity: 0, scale: 0.8 },
            { 
                opacity: 1, 
                scale: 1,
                duration: DURATIONS.elastic,
                ease: EASINGS.outBack
            },
            "-=0.3"
        );
        
        // Floating geometry entrance
        gsap.fromTo('.geometry-svg', 
            { opacity: 0, scale: 0.5, rotation: -180 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: DURATIONS.elastic,
                ease: EASINGS.outBack,
                delay: 1
            }
        );
    }
    
    initGlitchEffect() {
        const glitchElement = document.querySelector('.glitch-text');
        if (!glitchElement) return;
        
        // Trigger glitch effect periodically
        setInterval(() => {
            if (!ANIMATION_STATE.isReducedMotion) {
                glitchElement.style.animation = 'none';
                glitchElement.offsetHeight; // Trigger reflow
                glitchElement.style.animation = 'glitch-1 0.3s ease-out';
            }
        }, 8000);
    }
    
    // ===== SCROLL TRIGGER ANIMATIONS =====
    initScrollTriggerAnimations() {
        // Section reveals with stagger
        gsap.utils.toArray('.section-title').forEach(title => {
            // Split text for character-by-character animation
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
            
            gsap.fromTo(title.querySelectorAll('.char'), 
                { 
                    opacity: 0, 
                    y: 100,
                    rotationX: -90,
                    force3D: true
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: DURATIONS.normal,
                    ease: EASINGS.outBack,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
        
        // Project cards with magnetic reveal
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { 
                    opacity: 0, 
                    y: 100,
                    rotationY: -15,
                    scale: 0.8,
                    force3D: true
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: DURATIONS.elastic,
                    ease: EASINGS.outBack,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "play none none reverse"
                    },
                    delay: i * 0.1
                }
            );
        });
        
        // Stats counter animation
        this.initStatsCounters();
        
        // Skill cards floating animation
        this.initSkillCardsAnimation();
    }
    
    initStatsCounters() {
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const finalNumber = parseInt(stat.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(stat, 
                        { innerText: 0 },
                        {
                            innerText: finalNumber,
                            duration: 2,
                            ease: EASINGS.outExpo,
                            snap: { innerText: 1 },
                            onUpdate: function() {
                                stat.innerText = Math.ceil(this.targets()[0].innerText);
                            }
                        }
                    );
                }
            });
        });
    }
    
    initSkillCardsAnimation() {
        gsap.utils.toArray('.floating-card').forEach((card, i) => {
            // Continuous floating animation
            gsap.to(card, {
                y: "+=10",
                duration: 2 + i * 0.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
            
            // Scroll-triggered reveal
            gsap.fromTo(card, 
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: DURATIONS.normal,
                    ease: EASINGS.outBack,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // ===== TEXT ANIMATIONS =====
    initTextAnimations() {
        // Reveal text animation for about section
        gsap.utils.toArray('.reveal-text').forEach(text => {
            gsap.fromTo(text, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: DURATIONS.normal,
                    ease: EASINGS.outExpo,
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // ===== MORPHING ANIMATIONS =====
    initMorphingAnimations() {
        // Blob morphing animation
        if (document.querySelector('.blob-path')) {
            gsap.to('.blob-path', {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1
            });
        }
        
        // Liquid morph backgrounds
        gsap.utils.toArray('.stat-bg-morph').forEach(morph => {
            gsap.to(morph, {
                rotation: 360,
                duration: 15,
                ease: "none",
                repeat: -1
            });
        });
        
        // Wave animation
        if (document.querySelector('.wave-path')) {
            gsap.to('.wave-path', {
                morphSVG: "M0,80 C300,20 600,100 900,40 C1050,10 1200,70 1200,80 L1200,120 L0,120 Z",
                duration: 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        }
    }
}

// ===== ENHANCED NAVIGATION SYSTEM =====
class NavigationSystem {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinkItems = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScrolling();
    }
    
    setupScrollEffects() {
        // Optimized scroll listener with throttling
        let ticking = false;
        
        const updateNavbar = () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }
    
    setupMobileMenu() {
        if (!this.mobileToggle) return;
        
        this.mobileToggle.addEventListener('click', () => {
            ANIMATION_STATE.isMenuOpen = !ANIMATION_STATE.isMenuOpen;
            
            this.mobileToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = ANIMATION_STATE.isMenuOpen ? 'hidden' : '';
            
            // Animate menu items with stagger
            if (ANIMATION_STATE.isMenuOpen) {
                gsap.fromTo(this.navLinkItems, 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: DURATIONS.normal, 
                        ease: EASINGS.outBack,
                        stagger: 0.1,
                        delay: 0.2
                    }
                );
            }
        });
        
        // Close menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (ANIMATION_STATE.isMobile) {
                    ANIMATION_STATE.isMenuOpen = false;
                    this.mobileToggle.classList.remove('active');
                    this.navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        // Intersection Observer for active link highlighting
        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveLink(activeId) {
        this.navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        // Enhanced smooth scrolling with GSAP
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        duration: DURATIONS.slow,
                        ease: EASINGS.outExpo
                    });
                }
            });
        });
    }
}

// ===== FORM ENHANCEMENT SYSTEM =====
class FormSystem {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (!this.contactForm) return;
        
        this.setupFormAnimations();
        this.setupValidation();
        this.setupSubmission();
    }
    
    setupFormAnimations() {
        // Floating label effect
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    gsap.to(label, {
                        y: -10,
                        scale: 0.85,
                        color: '#667eea',
                        duration: DURATIONS.fast,
                        ease: EASINGS.outExpo
                    });
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        gsap.to(label, {
                            y: 0,
                            scale: 1,
                            color: '#e2e8f0',
                            duration: DURATIONS.fast,
                            ease: EASINGS.outExpo
                        });
                    }
                });
            }
        });
    }
    
    setupValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    validateField(field) {
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
            
            // Animate error message
            if (!isValid) {
                gsap.fromTo(errorElement, 
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: DURATIONS.fast }
                );
            }
        }
        
        return isValid;
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement && errorElement.textContent) {
            gsap.to(errorElement, {
                opacity: 0,
                duration: DURATIONS.fast,
                onComplete: () => {
                    errorElement.textContent = '';
                }
            });
        }
    }
    
    async setupSubmission() {
        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(e);
        });
    }
    
    async handleFormSubmission(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const inputs = form.querySelectorAll('input, textarea');
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state with morphing animation
        submitBtn.classList.add('loading');
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: DURATIONS.fast,
            yoyo: true,
            repeat: -1
        });
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            gsap.to(form, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    form.reset();
                }
            });
            
        } catch (error) {
            this.showNotification('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            gsap.killTweensOf(submitBtn);
            gsap.set(submitBtn, { scale: 1 });
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        gsap.to(notification, {
            x: 0,
            duration: DURATIONS.normal,
            ease: EASINGS.outBack
        });
        
        // Auto remove
        setTimeout(() => {
            gsap.to(notification, {
                x: '100%',
                duration: DURATIONS.normal,
                ease: EASINGS.outExpo,
                onComplete: () => notification.remove()
            });
        }, 5000);
    }
}

// ===== SCROLL PROGRESS INDICATOR =====
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.bindEvents();
    }
    
    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            z-index: 9999;
            transition: width 0.1s ease;
            will-change: width;
        `;
        document.body.appendChild(this.progressBar);
    }
    
    bindEvents() {
        let ticking = false;
        
        const updateProgress = () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            this.progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        
        if (window.location.hash === '#debug') {
            this.createDebugPanel();
            this.startMonitoring();
        }
    }
    
    createDebugPanel() {
        this.debugPanel = document.createElement('div');
        this.debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
        `;
        document.body.appendChild(this.debugPanel);
    }
    
    startMonitoring() {
        const monitor = () => {
            this.frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                this.frameCount = 0;
                this.lastTime = currentTime;
                
                if (this.debugPanel) {
                    this.debugPanel.innerHTML = `
                        FPS: ${this.fps}<br>
                        Device Pixel Ratio: ${ANIMATION_STATE.devicePixelRatio}<br>
                        Mobile: ${ANIMATION_STATE.isMobile}<br>
                        Reduced Motion: ${ANIMATION_STATE.isReducedMotion}<br>
                        Particles: ${ANIMATION_STATE.particleSystem?.options.count || 0}
                    `;
                }
            }
            
            requestAnimationFrame(monitor);
        };
        
        monitor();
    }
}

// ===== INITIALIZATION SYSTEM =====
class PortfolioApp {
    constructor() {
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Initialize performance monitoring
        this.performanceMonitor = new PerformanceMonitor();
        
        // Initialize core systems
        this.initializeCoreSystems();
        
        // Initialize visual effects
        this.initializeVisualEffects();
        
        // Initialize interaction systems
        this.initializeInteractionSystems();
        
        // Setup resize handler
        this.setupResizeHandler();
        
        // Setup accessibility enhancements
        this.setupAccessibility();
        
        console.log('🎨 Ethereal Portfolio loaded successfully!');
    }
    
    initializeCoreSystems() {
        // Device-optimized animations
        this.deviceAnimations = new DeviceOptimizedAnimations();
        
        // Navigation system
        this.navigation = new NavigationSystem();
        
        // Form system
        this.formSystem = new FormSystem();
        
        // Scroll progress
        this.scrollProgress = new ScrollProgress();
    }
    
    initializeVisualEffects() {
        // Particle system
        const particleContainer = document.getElementById('particle-canvas');
        if (particleContainer && !ANIMATION_STATE.isReducedMotion) {
            ANIMATION_STATE.particleSystem = new ParticleSystem(particleContainer);
        }
        
        // Neural network visualization
        const neuralCanvas = document.getElementById('neural-network');
        if (neuralCanvas && !ANIMATION_STATE.isReducedMotion) {
            ANIMATION_STATE.neuralNetwork = new NeuralNetworkCanvas(neuralCanvas);
        }
    }
    
    initializeInteractionSystems() {
        // Magnetic elements
        if (!ANIMATION_STATE.isMobile) {
            this.magneticSystem = new MagneticElements();
        }
    }
    
    setupResizeHandler() {
        // Debounced resize handler for performance
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update device state
                ANIMATION_STATE.isMobile = window.innerWidth <= 768;
                ANIMATION_STATE.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
                
                // Refresh ScrollTrigger
                ScrollTrigger.refresh();
                
                // Resize canvas elements
                if (ANIMATION_STATE.particleSystem) {
                    ANIMATION_STATE.particleSystem.resize();
                }
                if (ANIMATION_STATE.neuralNetwork) {
                    ANIMATION_STATE.neuralNetwork.resize();
                }
            }, 250);
        }, { passive: true });
    }
    
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape' && ANIMATION_STATE.isMenuOpen) {
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                
                ANIMATION_STATE.isMenuOpen = false;
                mobileToggle?.classList.remove('active');
                navLinks?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Focus management for mobile menu
        document.addEventListener('focusin', (e) => {
            if (ANIMATION_STATE.isMenuOpen) {
                const navLinks = document.querySelector('.nav-links');
                const focusableElements = navLinks?.querySelectorAll('a, button');
                
                if (navLinks && !navLinks.contains(e.target)) {
                    focusableElements?.[0]?.focus();
                }
            }
        });
        
        // Announce dynamic content changes to screen readers
        this.createAriaLiveRegion();
    }
    
    createAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
        
        this.ariaLiveRegion = liveRegion;
    }
    
    announceToScreenReader(message) {
        if (this.ariaLiveRegion) {
            this.ariaLiveRegion.textContent = message;
        }
    }
}

// ===== INITIALIZE APPLICATION =====
// Initialize the portfolio application
const portfolioApp = new PortfolioApp();

// ===== CONSOLE EASTER EGG =====
console.log(`
🎨 ETHEREAL PORTFOLIO v2.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Performance: 120fps optimized
🎮 Hardware: GPU accelerated  
📱 Responsive: Device adaptive
🎭 Animations: GSAP powered
🧠 AI: Neural network visualized
✨ Effects: Particle systems
🎪 Interactive: Magnetic elements

Built with passion by Alex Rivera
Want to see the magic behind the curtain?
Check out the source code! 🔍

Performance Stats:
- Device Pixel Ratio: ${ANIMATION_STATE.devicePixelRatio}
- Mobile: ${ANIMATION_STATE.isMobile}
- Reduced Motion: ${ANIMATION_STATE.isReducedMotion}
- High Refresh Rate: ${ANIMATION_STATE.isHighRefreshRate}
`);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        ParticleSystem,
        NeuralNetworkCanvas,
        MagneticElements,
        DeviceOptimizedAnimations,
        ANIMATION_STATE
    };
} 