/**
 * DATA SCIENCE PORTFOLIO - Advanced Interactive System
 * 
 * Performance-optimized for 120fps with data science focused interactions
 * Neural network visualizations, interactive charts, cursor effects
 * Device-specific optimizations for data analysis portfolio
 * 
 * Author: Elena Chen - Data Scientist & AI Engineer
 * Technologies: Canvas API, Web Animations, Performance APIs
 */

// ===== PERFORMANCE & DEVICE DETECTION GLOBALS =====
const PORTFOLIO_STATE = {
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isHighRefreshRate: window.screen.refreshRate > 60 || false,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth <= 1024 && window.innerWidth > 768,
    devicePixelRatio: window.devicePixelRatio || 1,
    isMenuOpen: false,
    cursorX: 0,
    cursorY: 0,
    neuralNetwork: null,
    heroChart: null,
    skillsNetwork: null,
    contactParticles: null,
    aboutChart: null
};

// Performance-optimized animation durations for 120fps
const DURATIONS = {
    instant: 80,    // 0.08s
    fast: 160,      // 0.16s
    normal: 240,    // 0.24s
    slow: 480,      // 0.48s
    elastic: 800    // 0.8s
};

// Data science color palette
const DATA_COLORS = {
    primary: '#4f46e5',
    purple: '#7c3aed',
    amber: '#f59e0b',
    cyan: '#06b6d4',
    emerald: '#10b981',
    orange: '#f97316',
    neonBlue: '#00d4ff',
    neonPink: '#ff006e',
    neonGreen: '#39ff14'
};

// ===== NEURAL NETWORK BACKGROUND CLASS =====
class NeuralNetworkBackground {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        // Performance-optimized defaults
        this.options = {
            nodeCount: PORTFOLIO_STATE.isMobile ? 20 : 40,
            connectionDistance: 150,
            nodeSpeed: 0.3,
            pulseSpeed: 0.02,
            mouseInfluence: 100,
            colors: [DATA_COLORS.primary, DATA_COLORS.purple, DATA_COLORS.cyan, DATA_COLORS.amber],
            ...options
        };
        
        this.time = 0;
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createNodes();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        // Optimize for high DPI displays while maintaining 120fps
        const pixelRatio = Math.min(PORTFOLIO_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(pixelRatio, pixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createNodes() {
        this.nodes = [];
        this.connections = [];
        
        // Create nodes with neural network properties
        for (let i = 0; i < this.options.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.options.nodeSpeed,
                vy: (Math.random() - 0.5) * this.options.nodeSpeed,
                radius: Math.random() * 3 + 2,
                activation: Math.random(),
                phase: Math.random() * Math.PI * 2,
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                pulseIntensity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    bindEvents() {
        // Throttled mouse tracking for cursor interaction
        if (!PORTFOLIO_STATE.isMobile) {
            this.canvas.addEventListener('mousemove', this.throttle((e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            }, 16), { passive: true });
        }
        
        // Optimized resize handler
        window.addEventListener('resize', this.throttle(() => {
            this.resize();
            this.createNodes();
        }, 250), { passive: true });
    }
    
    update() {
        this.time += this.options.pulseSpeed;
        
        // Update nodes with mouse interaction and neural activation
        this.nodes.forEach((node, i) => {
            // Mouse influence on desktop
            if (!PORTFOLIO_STATE.isMobile) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.mouseInfluence) {
                    const force = (this.options.mouseInfluence - distance) / this.options.mouseInfluence;
                    node.vx += (dx / distance) * force * 0.01;
                    node.vy += (dy / distance) * force * 0.01;
                    node.activation = Math.min(1, node.activation + force * 0.1);
                }
            }
            
            // Neural activation with sine wave
            node.activation = Math.max(0.1, node.activation * 0.99);
            node.activation += (Math.sin(this.time + node.phase) + 1) * 0.02;
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary wrapping
            if (node.x < 0) node.x = this.width;
            if (node.x > this.width) node.x = 0;
            if (node.y < 0) node.y = this.height;
            if (node.y > this.height) node.y = 0;
            
            // Velocity damping
            node.vx *= 0.99;
            node.vy *= 0.99;
        });
        
        // Update connections
        this.updateConnections();
    }
    
    updateConnections() {
        this.connections = [];
        
        // Create connections between nearby nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        strength: (this.options.connectionDistance - distance) / this.options.connectionDistance,
                        activation: (this.nodes[i].activation + this.nodes[j].activation) / 2
                    });
                }
            }
        }
    }
    
    draw() {
        // Clear with subtle trail effect for performance
        this.ctx.fillStyle = 'rgba(15, 15, 30, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw connections with neural activation
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            
            const opacity = connection.strength * connection.activation * 0.3;
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
            this.ctx.lineWidth = connection.strength * 2;
            this.ctx.stroke();
        });
        
        // Draw nodes with activation-based sizing
        this.nodes.forEach(node => {
            const size = node.radius * (0.5 + node.activation * 0.5);
            const glowSize = size * (1 + node.activation);
            
            // Glow effect
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
            gradient.addColorStop(0, `${node.color}aa`);
            gradient.addColorStop(1, `${node.color}00`);
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${node.color}${Math.floor(node.activation * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!PORTFOLIO_STATE.isReducedMotion) {
            this.update();
            this.draw();
        }
        
        // Optimized for 120fps
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

// ===== INTERACTIVE DATA CHART CLASS =====
class InteractiveChart {
    constructor(canvas, chartType = 'line', options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.chartType = chartType;
        this.data = [];
        this.animationProgress = 0;
        this.mouse = { x: -1, y: -1 };
        
        this.options = {
            animated: true,
            responsive: true,
            colors: [DATA_COLORS.primary, DATA_COLORS.cyan, DATA_COLORS.amber, DATA_COLORS.emerald],
            gridLines: true,
            ...options
        };
        
        this.init();
        this.bindEvents();
        this.generateData();
        this.animate();
    }
    
    init() {
        this.resize();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const pixelRatio = Math.min(PORTFOLIO_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(pixelRatio, pixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    bindEvents() {
        if (!PORTFOLIO_STATE.isMobile) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            }, { passive: true });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = -1;
                this.mouse.y = -1;
            }, { passive: true });
        }
    }
    
    generateData() {
        const dataCount = 20;
        
        switch (this.chartType) {
            case 'prediction':
                this.data = this.generatePredictionData(dataCount);
                break;
            case 'sentiment':
                this.data = this.generateSentimentData(dataCount);
                break;
            case 'detection':
                this.data = this.generateDetectionData(dataCount);
                break;
            case 'timeseries':
                this.data = this.generateTimeSeriesData(dataCount);
                break;
            default:
                this.data = this.generateLineData(dataCount);
        }
    }
    
    generatePredictionData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const confidence = 0.7 + Math.random() * 0.3;
            data.push({
                x: i / (count - 1),
                y: confidence,
                category: Math.random() > 0.5 ? 'churn' : 'retain',
                confidence: confidence
            });
        }
        return data;
    }
    
    generateSentimentData(count) {
        const sentiments = ['positive', 'neutral', 'negative'];
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: i / (count - 1),
                y: Math.random(),
                sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
                score: (Math.random() - 0.5) * 2
            });
        }
        return data;
    }
    
    generateDetectionData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const accuracy = 0.85 + Math.random() * 0.15;
            data.push({
                x: i / (count - 1),
                y: accuracy,
                defects: Math.floor(Math.random() * 5),
                accuracy: accuracy
            });
        }
        return data;
    }
    
    generateTimeSeriesData(count) {
        const data = [];
        let trend = 0.5;
        for (let i = 0; i < count; i++) {
            trend += (Math.random() - 0.5) * 0.1;
            trend = Math.max(0.1, Math.min(0.9, trend));
            data.push({
                x: i / (count - 1),
                y: trend,
                timestamp: Date.now() - (count - i) * 86400000,
                value: trend * 1000
            });
        }
        return data;
    }
    
    generateLineData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: i / (count - 1),
                y: Math.random(),
                value: Math.random() * 100
            });
        }
        return data;
    }
    
    drawGrid() {
        if (!this.options.gridLines) return;
        
        this.ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = (this.width * 0.9) * (i / 10) + this.width * 0.05;
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.height * 0.05);
            this.ctx.lineTo(x, this.height * 0.95);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 10; i++) {
            const y = (this.height * 0.9) * (i / 10) + this.height * 0.05;
            this.ctx.beginPath();
            this.ctx.moveTo(this.width * 0.05, y);
            this.ctx.lineTo(this.width * 0.95, y);
            this.ctx.stroke();
        }
    }
    
    drawChart() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
        
        if (this.data.length === 0) return;
        
        const padding = this.width * 0.05;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;
        
        // Draw data line
        this.ctx.strokeStyle = DATA_COLORS.primary;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        this.data.forEach((point, i) => {
            const x = padding + point.x * chartWidth * this.animationProgress;
            const y = padding + (1 - point.y) * chartHeight;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        
        this.ctx.stroke();
        
        // Draw data points with hover effects
        this.data.forEach((point, i) => {
            if (i > this.data.length * this.animationProgress) return;
            
            const x = padding + point.x * chartWidth;
            const y = padding + (1 - point.y) * chartHeight;
            
            // Check mouse proximity for interaction
            const isHovered = !PORTFOLIO_STATE.isMobile && 
                Math.abs(this.mouse.x - x) < 20 && 
                Math.abs(this.mouse.y - y) < 20;
            
            const radius = isHovered ? 8 : 4;
            const alpha = isHovered ? 1 : 0.8;
            
            // Glow effect for hovered points
            if (isHovered) {
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
                gradient.addColorStop(0, `${DATA_COLORS.amber}66`);
                gradient.addColorStop(1, `${DATA_COLORS.amber}00`);
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            // Data point
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${DATA_COLORS.cyan}${Math.floor(alpha * 255).toString(16)}`;
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!PORTFOLIO_STATE.isReducedMotion && this.options.animated) {
            // Smooth animation progress
            this.animationProgress = Math.min(1, this.animationProgress + 0.02);
            
            // Add some data variation for live effect
            if (this.animationProgress >= 1 && Math.random() > 0.98) {
                this.data.forEach(point => {
                    point.y += (Math.random() - 0.5) * 0.02;
                    point.y = Math.max(0, Math.min(1, point.y));
                });
            }
        }
        
        this.drawChart();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== SKILLS NETWORK VISUALIZATION =====
class SkillsNetworkViz {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.options = {
            nodeCount: 12,
            centerNode: true,
            skills: [
                'Python', 'Machine Learning', 'TensorFlow', 'PyTorch',
                'SQL', 'Apache Spark', 'AWS', 'Docker',
                'Pandas', 'Plotly', 'Jupyter', 'Git'
            ],
            ...options
        };
        
        this.time = 0;
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createNetwork();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const pixelRatio = Math.min(PORTFOLIO_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(pixelRatio, pixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.3;
        
        // Create center node (Elena)
        if (this.options.centerNode) {
            this.nodes.push({
                x: centerX,
                y: centerY,
                radius: 30,
                label: 'Elena',
                type: 'center',
                color: DATA_COLORS.amber,
                connections: [],
                strength: 1
            });
        }
        
        // Create skill nodes in a circle
        for (let i = 0; i < this.options.skills.length; i++) {
            const angle = (i / this.options.skills.length) * Math.PI * 2;
            const nodeRadius = radius + (Math.random() - 0.5) * 40;
            
            this.nodes.push({
                x: centerX + Math.cos(angle) * nodeRadius,
                y: centerY + Math.sin(angle) * nodeRadius,
                radius: 15 + Math.random() * 10,
                label: this.options.skills[i],
                type: 'skill',
                color: this.options.colors[i % this.options.colors.length] || DATA_COLORS.primary,
                originalX: centerX + Math.cos(angle) * nodeRadius,
                originalY: centerY + Math.sin(angle) * nodeRadius,
                angle: angle,
                connections: [],
                strength: 0.5 + Math.random() * 0.5
            });
        }
        
        // Create connections
        this.createConnections();
    }
    
    createConnections() {
        // Connect center to all skills
        if (this.options.centerNode) {
            for (let i = 1; i < this.nodes.length; i++) {
                this.connections.push({
                    from: 0,
                    to: i,
                    strength: this.nodes[i].strength,
                    type: 'primary'
                });
            }
        }
        
        // Connect related skills
        const skillConnections = [
            ['Python', 'Machine Learning'], ['Python', 'TensorFlow'], ['Python', 'PyTorch'],
            ['Machine Learning', 'TensorFlow'], ['Machine Learning', 'PyTorch'],
            ['SQL', 'Apache Spark'], ['AWS', 'Docker'], ['Python', 'Pandas'],
            ['Pandas', 'Plotly'], ['Python', 'Jupyter']
        ];
        
        skillConnections.forEach(([skill1, skill2]) => {
            const node1 = this.nodes.find(n => n.label === skill1);
            const node2 = this.nodes.find(n => n.label === skill2);
            
            if (node1 && node2) {
                const index1 = this.nodes.indexOf(node1);
                const index2 = this.nodes.indexOf(node2);
                
                this.connections.push({
                    from: index1,
                    to: index2,
                    strength: 0.3,
                    type: 'secondary'
                });
            }
        });
    }
    
    bindEvents() {
        if (!PORTFOLIO_STATE.isMobile) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            }, { passive: true });
        }
    }
    
    update() {
        this.time += 0.02;
        
        // Update node positions with mouse interaction
        this.nodes.forEach((node, i) => {
            if (node.type === 'center') return;
            
            // Mouse attraction for desktop
            if (!PORTFOLIO_STATE.isMobile) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100 * 0.02;
                    node.x += dx * force;
                    node.y += dy * force;
                }
            }
            
            // Return to original position
            const returnForce = 0.03;
            node.x += (node.originalX - node.x) * returnForce;
            node.y += (node.originalY - node.y) * returnForce;
            
            // Add subtle floating animation
            node.x += Math.sin(this.time + node.angle) * 0.5;
            node.y += Math.cos(this.time + node.angle * 1.1) * 0.3;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            
            const opacity = connection.type === 'primary' ? 0.6 : 0.3;
            const width = connection.type === 'primary' ? 2 : 1;
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * connection.strength})`;
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 2
            );
            gradient.addColorStop(0, `${node.color}66`);
            gradient.addColorStop(1, `${node.color}00`);
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Node circle
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            
            // Node label
            this.ctx.fillStyle = 'white';
            this.ctx.font = `${node.type === 'center' ? '14px' : '10px'} Inter, sans-serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label, node.x, node.y);
        });
    }
    
    animate() {
        if (!PORTFOLIO_STATE.isReducedMotion) {
            this.update();
        }
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== PARTICLE SYSTEM FOR CONTACT SECTION =====
class ContactParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.options = {
            count: PORTFOLIO_STATE.isMobile ? 30 : 60,
            speed: 0.5,
            connectionDistance: 120,
            mouseInfluence: 150,
            colors: [DATA_COLORS.primary, DATA_COLORS.cyan, DATA_COLORS.amber],
            ...options
        };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        const pixelRatio = Math.min(PORTFOLIO_STATE.devicePixelRatio, 2);
        
        this.canvas.width = rect.width * pixelRatio;
        this.canvas.height = rect.height * pixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(pixelRatio, pixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                radius: Math.random() * 2 + 1,
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                opacity: Math.random() * 0.5 + 0.3,
                originalVx: (Math.random() - 0.5) * this.options.speed,
                originalVy: (Math.random() - 0.5) * this.options.speed
            });
        }
    }
    
    bindEvents() {
        if (!PORTFOLIO_STATE.isMobile) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            }, { passive: true });
        }
    }
    
    update() {
        this.particles.forEach(particle => {
            // Mouse interaction
            if (!PORTFOLIO_STATE.isMobile) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.mouseInfluence) {
                    const force = (this.options.mouseInfluence - distance) / this.options.mouseInfluence;
                    particle.vx += (dx / distance) * force * 0.005;
                    particle.vy += (dy / distance) * force * 0.005;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary conditions
            if (particle.x < 0 || particle.x > this.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.height, particle.y));
            }
            
            // Velocity damping
            particle.vx += (particle.originalVx - particle.vx) * 0.01;
            particle.vy += (particle.originalVy - particle.vy) * 0.01;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = (1 - distance / this.options.connectionDistance) * 0.2;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16)}`;
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!PORTFOLIO_STATE.isReducedMotion) {
            this.update();
        }
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== CUSTOM CURSOR SYSTEM =====
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor-follower');
        this.cursorX = 0;
        this.cursorY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.ease = 0.15;
        
        if (PORTFOLIO_STATE.isMobile || !this.cursor) return;
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Show custom cursor
        this.cursor.style.opacity = '1';
    }
    
    bindEvents() {
        // Track mouse movement with throttling for performance
        document.addEventListener('mousemove', this.throttle((e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            
            // Update global state for other components
            PORTFOLIO_STATE.cursorX = e.clientX;
            PORTFOLIO_STATE.cursorY = e.clientY;
        }, 16), { passive: true });
        
        // Cursor interaction states
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px) scale(0.8)`;
        }, { passive: true });
        
        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px) scale(1)`;
        }, { passive: true });
        
        // Interactive element hover effects
        document.querySelectorAll('.cursor-interactive').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px) scale(1.5)`;
                this.cursor.style.backgroundColor = DATA_COLORS.amber;
            }, { passive: true });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px) scale(1)`;
                this.cursor.style.backgroundColor = '';
            }, { passive: true });
        });
    }
    
    animate() {
        // Smooth cursor following with easing
        this.cursorX += (this.targetX - this.cursorX) * this.ease;
        this.cursorY += (this.targetY - this.cursorY) * this.ease;
        
        // Update cursor position
        this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px)`;
        
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

// ===== TYPEWRITER EFFECT =====
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000,
            loop: true,
            ...options
        };
        
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        if (PORTFOLIO_STATE.isReducedMotion) {
            this.element.textContent = this.words[0];
            return;
        }
        
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            // Delete characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                setTimeout(() => this.type(), 500);
                return;
            }
            
            setTimeout(() => this.type(), this.options.deleteSpeed);
        } else {
            // Type characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentWord.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.options.delayBetweenWords);
                return;
            }
            
            setTimeout(() => this.type(), this.options.typeSpeed);
        }
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.initIntersectionObserver();
        this.initScrollEffects();
    }
    
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.reveal-text, .split-reveal, .metric-item, .skill-category, .project-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateElement(element) {
        if (PORTFOLIO_STATE.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        // Split text animation for titles
        if (element.classList.contains('split-reveal')) {
            this.splitTextReveal(element);
        }
        
        // Fade up animation for other elements
        else {
            element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
        
        // Animate skill progress bars
        if (element.classList.contains('skill-category')) {
            this.animateSkillBars(element);
        }
        
        // Animate metric counters
        if (element.classList.contains('metric-item')) {
            this.animateCounter(element);
        }
    }
    
    splitTextReveal(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
        
        const spans = element.querySelectorAll('span');
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }
    
    animateSkillBars(categoryElement) {
        const progressBars = categoryElement.querySelectorAll('.skill-progress, .proficiency-bar');
        
        progressBars.forEach((bar, i) => {
            setTimeout(() => {
                const width = bar.dataset.width || bar.dataset.level;
                bar.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
                bar.style.transform = `scaleX(${width / 100})`;
            }, i * 200);
        });
    }
    
    animateCounter(metricElement) {
        const numberElement = metricElement.querySelector('.metric-number');
        if (!numberElement) return;
        
        const target = parseInt(numberElement.dataset.target) || 0;
        const duration = 2000;
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            numberElement.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    initScrollEffects() {
        // Navbar scroll effect
        let lastScrollY = 0;
        const navbar = document.querySelector('.navbar');
        
        const handleScroll = this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
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

// ===== NAVIGATION SYSTEM =====
class NavigationSystem {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinkItems = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
    }
    
    setupMobileMenu() {
        if (!this.mobileToggle) return;
        
        this.mobileToggle.addEventListener('click', () => {
            PORTFOLIO_STATE.isMenuOpen = !PORTFOLIO_STATE.isMenuOpen;
            
            this.mobileToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = PORTFOLIO_STATE.isMenuOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (PORTFOLIO_STATE.isMobile) {
                    PORTFOLIO_STATE.isMenuOpen = false;
                    this.mobileToggle.classList.remove('active');
                    this.navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    setupSmoothScrolling() {
        // Enhanced smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
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
}

// ===== FORM SYSTEM =====
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
        // Enhanced form field animations
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.style.transform = 'translateY(-2px)';
                    label.style.color = DATA_COLORS.primary;
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.style.transform = 'translateY(0)';
                        label.style.color = '';
                    }
                });
            }
        });
    }
    
    setupValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Basic validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = `${field.name} is required`;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Visual feedback
        if (!isValid) {
            field.style.borderColor = DATA_COLORS.neonPink;
            this.showFieldError(field, errorMessage);
        } else {
            field.style.borderColor = DATA_COLORS.primary;
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }
    
    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
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
        const submitBtn = form.querySelector('.submit-btn');
        const inputs = form.querySelectorAll('input, textarea, select');
        
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
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
            // Reset form styles
            inputs.forEach(input => {
                input.style.borderColor = '';
                const group = input.closest('.form-group');
                if (group) group.style.transform = 'translateY(0)';
            });
            
        } catch (error) {
            this.showNotification('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
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
            background: ${type === 'success' ? DATA_COLORS.emerald : type === 'error' ? DATA_COLORS.neonPink : DATA_COLORS.primary};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ===== MAIN APPLICATION CLASS =====
class DataSciencePortfolio {
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
        
        // Initialize core systems
        this.initializeCoreSystems();
        
        // Initialize visualizations
        this.initializeVisualizations();
        
        // Initialize interaction systems
        this.initializeInteractionSystems();
        
        // Setup responsive handlers
        this.setupResponsiveHandlers();
        
        // Setup accessibility
        this.setupAccessibility();
        
        console.log('%c🔬 Data Science Portfolio Loaded Successfully!', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
        console.log(`%c
📊 PORTFOLIO ANALYTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Performance: 120fps optimized
🧠 Neural Networks: Active
📈 Interactive Charts: Loaded
🖱️  Cursor Effects: ${!PORTFOLIO_STATE.isMobile ? 'Enabled' : 'Disabled (Mobile)'}
📱 Device: ${PORTFOLIO_STATE.isMobile ? 'Mobile' : PORTFOLIO_STATE.isTablet ? 'Tablet' : 'Desktop'}
🎨 Animations: ${PORTFOLIO_STATE.isReducedMotion ? 'Reduced' : 'Full'}

Built with passion for data science ❤️
        `, 'color: #06b6d4; font-size: 12px;');
    }
    
    initializeCoreSystems() {
        // Navigation system
        this.navigation = new NavigationSystem();
        
        // Scroll animations
        this.scrollAnimations = new ScrollAnimations();
        
        // Form system
        this.formSystem = new FormSystem();
        
        // Typewriter effect for hero
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const words = JSON.parse(typingElement.dataset.words || '["AI Engineer"]');
            this.typewriter = new TypewriterEffect(typingElement, words);
        }
    }
    
    initializeVisualizations() {
        // Neural network background
        const neuralCanvas = document.getElementById('neural-network-bg');
        if (neuralCanvas && !PORTFOLIO_STATE.isReducedMotion) {
            PORTFOLIO_STATE.neuralNetwork = new NeuralNetworkBackground(neuralCanvas);
        }
        
        // Hero chart
        const heroChart = document.getElementById('hero-chart');
        if (heroChart) {
            PORTFOLIO_STATE.heroChart = new InteractiveChart(heroChart, 'line');
        }
        
        // About stats chart
        const aboutStatsChart = document.getElementById('about-stats-chart');
        if (aboutStatsChart) {
            PORTFOLIO_STATE.aboutChart = new InteractiveChart(aboutStatsChart, 'doughnut');
        }
        
        // Project charts
        document.querySelectorAll('.project-chart').forEach(canvas => {
            const chartType = canvas.dataset.chart;
            new InteractiveChart(canvas, chartType);
        });
        
        // Skills network
        const skillsNetwork = document.getElementById('skills-network');
        if (skillsNetwork && !PORTFOLIO_STATE.isReducedMotion) {
            PORTFOLIO_STATE.skillsNetwork = new SkillsNetworkViz(skillsNetwork);
        }
        
        // Contact particles
        const contactParticles = document.getElementById('contact-particles');
        if (contactParticles && !PORTFOLIO_STATE.isReducedMotion) {
            PORTFOLIO_STATE.contactParticles = new ContactParticleSystem(contactParticles);
        }
    }
    
    initializeInteractionSystems() {
        // Custom cursor for desktop
        if (!PORTFOLIO_STATE.isMobile) {
            this.customCursor = new CustomCursor();
        }
    }
    
    setupResponsiveHandlers() {
        // Debounced resize handler for performance
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update device state
                const oldIsMobile = PORTFOLIO_STATE.isMobile;
                PORTFOLIO_STATE.isMobile = window.innerWidth <= 768;
                PORTFOLIO_STATE.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
                
                // Reinitialize systems if device type changed
                if (oldIsMobile !== PORTFOLIO_STATE.isMobile) {
                    this.handleDeviceChange();
                }
                
                // Resize visualizations
                this.resizeVisualizations();
            }, 250);
        }, { passive: true });
    }
    
    handleDeviceChange() {
        // Reinitialize cursor system
        if (!PORTFOLIO_STATE.isMobile && !this.customCursor) {
            this.customCursor = new CustomCursor();
        } else if (PORTFOLIO_STATE.isMobile && this.customCursor) {
            document.body.style.cursor = 'auto';
        }
    }
    
    resizeVisualizations() {
        // Resize all canvas-based visualizations
        [
            PORTFOLIO_STATE.neuralNetwork,
            PORTFOLIO_STATE.heroChart,
            PORTFOLIO_STATE.aboutChart,
            PORTFOLIO_STATE.skillsNetwork,
            PORTFOLIO_STATE.contactParticles
        ].forEach(viz => {
            if (viz && viz.resize) {
                viz.resize();
            }
        });
    }
    
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape' && PORTFOLIO_STATE.isMenuOpen) {
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                
                PORTFOLIO_STATE.isMenuOpen = false;
                mobileToggle?.classList.remove('active');
                navLinks?.classList.remove('active');
                document.body.style.overflow = '';
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
// Initialize the data science portfolio application
const dataSciencePortfolio = new DataSciencePortfolio();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DataSciencePortfolio,
        NeuralNetworkBackground,
        InteractiveChart,
        SkillsNetworkViz,
        ContactParticleSystem,
        CustomCursor,
        PORTFOLIO_STATE
    };
} 