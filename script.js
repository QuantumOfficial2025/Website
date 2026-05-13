// ========================================
// QuantumMC+ Website - Advanced JavaScript
// ========================================

// Configuration
let DISCORD_LINK = 'https://discord.gg/'; // UPDATE THIS WITH YOUR ACTUAL DISCORD SERVER LINK
const CONFIG = {
    smoothScroll: true,
    animationsEnabled: true,
    particlesEnabled: true,
};

// ========================================
// Initialize on DOM Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadConfigData();
});

function initializeWebsite() {
    setupNavigation();
    setupScrollAnimations();
    setupDiscordLinks();
    setupSmoothScrolling();
    setupParticleEffects();
    setupInteractiveElements();
}

// ========================================
// Config Loading
// ========================================

let configData = null;

async function loadConfigData() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Failed to load config.json');
        }
        configData = await response.json();
        
        if (configData.social && configData.social.discord) {
            DISCORD_LINK = configData.social.discord;
        }
        
        // Load components from config
        loadAnnouncements();
        loadUpdates();
        applyThemeFromConfig();
        
        console.log('Config loaded successfully:', configData);
    } catch (error) {
        console.warn('Config file not found or invalid, using defaults:', error);
        // Website will still work without config
    }
}

function loadAnnouncements() {
    if (!configData || !configData.announcements) return;
    
    const announcement = configData.announcements;
    if (!announcement.active) return;
    
    const announcementBox = document.getElementById('announcement-box');
    const announcementTitle = document.getElementById('announcement-title');
    const announcementMessage = document.getElementById('announcement-message');
    
    if (announcementBox && announcementTitle && announcementMessage) {
        announcementTitle.textContent = announcement.title;
        announcementMessage.textContent = announcement.message;
        announcementBox.style.display = 'block';
    }
}

function loadUpdates() {
    if (!configData || !configData.updates) return;
    
    const container = document.getElementById('updates-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    configData.updates.forEach(update => {
        const updateCard = createUpdateCard(update);
        container.appendChild(updateCard);
    });
}

function createUpdateCard(update) {
    const card = document.createElement('div');
    card.className = 'update-card';
    
    // Format date
    const date = new Date(update.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Build features HTML
    let featuresHTML = '';
    if (update.features && update.features.length > 0) {
        featuresHTML = `
            <div class="update-section">
                <div class="update-section-title">✨ Features</div>
                <ul class="update-list">
                    ${update.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Build bug fixes HTML
    let bugFixesHTML = '';
    if (update.bugFixes && update.bugFixes.length > 0) {
        bugFixesHTML = `
            <div class="update-section">
                <div class="update-section-title">🐛 Bug Fixes</div>
                <ul class="update-list">
                    ${update.bugFixes.map(fix => `<li>${fix}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Build changelog HTML
    let changelogHTML = '';
    if (update.changelog) {
        changelogHTML = `
            <div class="update-section">
                <div class="update-section-title">📝 Changelog</div>
                <p style="color: var(--text-muted); margin: 0;">${update.changelog}</p>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="update-header">
            <div class="update-title-section">
                <div class="update-version">v${update.version}</div>
                <div class="update-name">${update.title}</div>
                <div class="update-description">${update.description}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                ${update.highlights ? '<div class="update-badge">Highlighted</div>' : ''}
                <div class="update-date">${formattedDate}</div>
            </div>
        </div>
        <div class="update-body">
            ${featuresHTML}
            ${bugFixesHTML}
            ${changelogHTML}
        </div>
    `;
    
    return card;
}

function applyThemeFromConfig() {
    if (!configData || !configData.theme) return;
    
    const theme = configData.theme;
    const root = document.documentElement;
    
    // Only override if values exist
    if (theme.primary) root.style.setProperty('--primary', theme.primary);
    if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
    if (theme.tertiary) root.style.setProperty('--tertiary', theme.tertiary);
    if (theme.bgDark) root.style.setProperty('--bg-dark', theme.bgDark);
    if (theme.bgDarker) root.style.setProperty('--bg-darker', theme.bgDarker);
}

// ========================================
// Navigation Setup
// ========================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Close navbar on mobile click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Mobile menu would close here if implemented
            }
        });
    });
}

// ========================================
// Smooth Scrolling
// ========================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards, download cards, steps, etc.
    document.querySelectorAll(
        '.feature-category, .download-card, .step, .command-card, .stat-item, .contact-link'
    ).forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Discord Links
// ========================================

function setupDiscordLinks() {
    const discordButtons = document.querySelectorAll('[data-discord]');
    const discordModal = document.getElementById('discordModal');
    const modalClose = document.querySelector('.modal-close');

    // Update DISCORD_LINK from config if available
    if (configData && configData.social && configData.social.discord) {
        window.DISCORD_LINK = configData.social.discord;
    }

    discordButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleDiscordClick();
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (discordModal) {
                discordModal.classList.remove('show');
            }
        });
    }

    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (discordModal && e.target === discordModal) {
            discordModal.classList.remove('show');
        }
    });
}

function handleDiscordClick() {
    if (DISCORD_LINK && DISCORD_LINK !== 'https://discord.gg/') {
        window.open(DISCORD_LINK, '_blank');
    } else {
        showDiscordModal();
    }
}

function showDiscordModal() {
    const modal = document.getElementById('discordModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// ========================================
// Particle Effects
// ========================================

function setupParticleEffects() {
    if (!CONFIG.particlesEnabled) return;

    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    // Create floating particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(starsContainer);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * 5;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 255, 136, ${Math.random() * 0.5 + 0.3});
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        pointer-events: none;
        animation: floatParticle ${duration}s linear ${delay}s infinite;
    `;
    
    container.appendChild(particle);
}

// Add floating particle animation to CSS dynamically
if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.innerHTML = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Interactive Elements
// ========================================

function setupInteractiveElements() {
    // Button hover effects
    setupButtonEffects();
    
    // Card hover effects
    setupCardEffects();
    
    // Copy to clipboard for code blocks
    setupCodeBlockCopy();
}

function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = createRipple(e);
            this.appendChild(ripple);
        });
    });
}

function setupCardEffects() {
    const cards = document.querySelectorAll('.feature-category, .download-card, .step, .command-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function setupCodeBlockCopy() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '📋 Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 255, 136, 0.2);
            border: 1px solid rgba(0, 255, 136, 0.5);
            color: #00ff88;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.85em;
            transition: all 0.3s ease;
            font-weight: 600;
        `;
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 136, 0.3)';
            this.style.borderColor = '#00ff88';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 255, 136, 0.2)';
            this.style.borderColor = 'rgba(0, 255, 136, 0.5)';
        });
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(copyButton);
    });
}

// ========================================
// Utility Functions
// ========================================

function createRipple(e) {
    const button = e.target;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = e.offsetX - radius + 'px';
    circle.style.top = e.offsetY - radius + 'px';
    circle.classList.add('ripple');

    // Remove existing ripple
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

// ========================================
// Performance Monitoring
// ========================================

function setupPerformanceMonitoring() {
    if (window.location.search.includes('debug=true')) {
        console.log('QuantumMC+ Website - Performance Debug Mode');
        
        // Log paint timing
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Total Load Time: ' + pageLoadTime + 'ms');
            });
        }
    }
}

setupPerformanceMonitoring();

// ========================================
// Mobile Responsiveness
// ========================================

function handleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Handle mobile-specific behavior
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific code
    } else {
        // Desktop-specific code
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// ========================================
// Accessibility Enhancements
// ========================================

function setupAccessibility() {
    // Keyboard navigation
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });

    // Focus visible outline
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

setupAccessibility();

// ========================================
// Export Functions (for debugging)
// ========================================

window.QuantumMC = {
    config: CONFIG,
    getConfig: function() {
        return configData || CONFIG;
    },
    openDiscord: handleDiscordClick,
    showModal: showDiscordModal,
    updateDiscordLink: function(newLink) {
        DISCORD_LINK = newLink;
        console.log('Discord link updated:', newLink);
    }
};

// ========================================
// Service Worker Registration (Optional)
// ========================================

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    // Uncomment below to enable service worker
    // navigator.serviceWorker.register('sw.js').catch(err => {
    //     console.log('Service Worker registration failed:', err);
    // });
}

// ========================================
// Console Message
// ========================================

console.log('%c⚛ QuantumMC+ Website v1.0', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cPowered by Quantum', 'color: #00ccff; font-size: 12px;');
