// Execute after page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize daily quote
    initHitokoto();
    
    // Initialize page animations
    initAnimations();
    
    // Initialize avatar loading
    initAvatar();
    
    // Initialize social links
    initSocialLinks();
    
    // Initialize navigation links
    initNavLinks();
    
    // Initialize fullscreen toggle
    initFullscreenToggle();
    
    // Initialize background image
    initBackgroundImage();
    
    // Initialize mobile-specific features
    initMobileFeatures();
});

// Daily quote API initialization
function initHitokoto() {
    const hitokotoText = document.getElementById('hitokoto-text');
    const hitokotoAuthor = document.getElementById('hitokoto-author');
    
    // Daily quote API addresses
    const primaryAPI = 'https://api.quotable.io/random';
    const fallbackAPI = 'https://api.goprogram.ai/inspiration';
    
    // Local quotes as final fallback
    const localQuotes = [
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { content: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
        { content: "Life is not just about code, but also poetry and dreams.", author: "Developer" }
    ];
    
    // Fetch daily quote
    function fetchHitokoto() {
        // Add cache-busting parameter and random category to ensure fresh quotes
        const timestamp = Date.now();
        const categories = ['inspirational', 'wisdom', 'success', 'life', 'motivation', 'philosophy'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const apiUrl = `${primaryAPI}?t=${timestamp}&tags=${randomCategory}`;
        
        console.log('Fetching quote from:', apiUrl);
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Quote received:', data);
                hitokotoText.textContent = data.content;
                hitokotoAuthor.textContent = `— ${data.author}`;
                
                // Add fade-in animation
                hitokotoText.style.opacity = '0';
                hitokotoAuthor.style.opacity = '0';
                
                setTimeout(() => {
                    hitokotoText.style.transition = 'opacity 0.5s ease';
                    hitokotoAuthor.style.transition = 'opacity 0.5s ease';
                    hitokotoText.style.opacity = '1';
                    hitokotoAuthor.style.opacity = '1';
                }, 100);
            })
            .catch(error => {
                console.error('Primary API failed, trying fallback:', error);
                // Try fallback API
                const fallbackUrl = `${fallbackAPI}?t=${timestamp}`;
                fetch(fallbackUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Fallback quote received:', data);
                        hitokotoText.textContent = data.quote;
                        hitokotoAuthor.textContent = `— ${data.author}`;
                        
                        // Add fade-in animation
                        hitokotoText.style.opacity = '0';
                        hitokotoAuthor.style.opacity = '0';
                        
                        setTimeout(() => {
                            hitokotoText.style.transition = 'opacity 0.5s ease';
                            hitokotoAuthor.style.transition = 'opacity 0.5s ease';
                            hitokotoText.style.opacity = '1';
                            hitokotoAuthor.style.opacity = '1';
                        }, 100);
                    })
                    .catch(fallbackError => {
                        console.error('Both APIs failed, using local quotes:', fallbackError);
                        // Use local quotes as final fallback
                        const randomLocalQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
                        hitokotoText.textContent = randomLocalQuote.content;
                        hitokotoAuthor.textContent = `— ${randomLocalQuote.author}`;
                        
                        // Add fade-in animation
                        hitokotoText.style.opacity = '0';
                        hitokotoAuthor.style.opacity = '0';
                        
                        setTimeout(() => {
                            hitokotoText.style.transition = 'opacity 0.5s ease';
                            hitokotoAuthor.style.transition = 'opacity 0.5s ease';
                            hitokotoText.style.opacity = '1';
                            hitokotoAuthor.style.opacity = '1';
                        }, 100);
                    });
            });
    }
    
    // Initial load daily quote
    fetchHitokoto();
    
    // Click quote area to refresh
    const hitokotoContainer = document.querySelector('.hitokoto');
    hitokotoContainer.addEventListener('click', function() {
        hitokotoText.textContent = 'Loading daily quote...';
        hitokotoAuthor.textContent = '— Quote';
        fetchHitokoto();
    });
    
    // Add click hint
    hitokotoContainer.style.cursor = 'pointer';
    hitokotoContainer.title = 'Click to refresh quote';
}

// Page animation initialization
function initAnimations() {
    // Add mouse movement parallax effect (only on desktop)
    if (!('ontouchstart' in window)) {
        document.addEventListener('mousemove', function(e) {
            const particles = document.querySelector('.particles');
            if (particles) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                particles.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            }
        });
    }
    
    // Add special effects in fullscreen mode
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('hitokoto')) {
            return; // Quote area click doesn't add ripple
        }
        
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.2)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.8s linear';
        ripple.style.left = (e.clientX - 10) + 'px';
        ripple.style.top = (e.clientY - 10) + 'px';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
}

// Avatar initialization
function initAvatar() {
    const avatar = document.getElementById('avatar');
    
    // If avatar fails to load, use default avatar
    avatar.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzUiIHI9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjM1IiByPSIxMCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTMwIDgwQzMwIDcwIDQwIDYwIDYwIDYwQzgwIDYwIDkwIDcwIDkwIDgwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDBfbGluZWFyXzFfMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMTIwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2NjdlZWEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+CjwvbGluYXI+';
    });
    
    // Add avatar loading animation
    avatar.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease';
    });
}

// Social links initialization
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Desktop hover effects
        if (!('ontouchstart' in window)) {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Add click ripple effect
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Navigation links initialization
function initNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an external link (starts with http or is a file path)
            if (href.startsWith('http') || href.includes('.html') || href.includes('.php') || href.includes('.htm')) {
                // Allow external links to work normally
                // Add click feedback before navigation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                return; // Don't prevent default for external links
            }
            
            // For internal anchor links, prevent default and handle manually
            e.preventDefault();
            
            const target = href.substring(1);
            
            // Here you can add page navigation logic
            console.log('Navigate to:', target);
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Mobile-specific features initialization
function initMobileFeatures() {
    // Check if device is mobile
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile) {
        document.body.classList.add('touch-device');
        
        // Optimize viewport for mobile
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        
        // Add mobile-specific touch handlers
        const touchElements = document.querySelectorAll('.social-link, .nav-link, .hitokoto, .skill-tag');
        touchElements.forEach(element => {
            // Touch start feedback
            element.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: false });
            
            // Touch end feedback
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.transition = 'transform 0.2s ease';
                }, 100);
            });
            
            // Touch cancel feedback
            element.addEventListener('touchcancel', function(e) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            });
        });
        
        // Add swipe gesture support for quote refresh
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndY - touchStartY;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe down - refresh quote
                    const hitokotoContainer = document.querySelector('.hitokoto');
                    if (hitokotoContainer) {
                        hitokotoContainer.click();
                    }
                }
            }
        }
        
        // Add vibration feedback for mobile devices
        if ('vibrate' in navigator) {
            const interactiveElements = document.querySelectorAll('.social-link, .nav-link, .hitokoto');
            interactiveElements.forEach(element => {
                element.addEventListener('click', function() {
                    navigator.vibrate(10);
                });
            });
        }
        
        // Optimize scrolling for mobile
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.webkitOverflowScrolling = 'touch';
        }
        
        // Add mobile-specific keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Space bar to refresh quote
            if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const hitokotoContainer = document.querySelector('.hitokoto');
                if (hitokotoContainer) {
                    hitokotoContainer.click();
                }
            }
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    /* Mobile-specific animations */
    @media (hover: none) and (pointer: coarse) {
        .social-link:active,
        .nav-link:active,
        .skill-tag:active,
        .hitokoto:active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
    }
    
    /* Touch feedback animation */
    .touch-feedback {
        animation: touchFeedback 0.2s ease;
    }
    
    @keyframes touchFeedback {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add loading bar
function addLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.style.position = 'fixed';
    loadingBar.style.top = '0';
    loadingBar.style.left = '0';
    loadingBar.style.width = '0%';
    loadingBar.style.height = '3px';
    loadingBar.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    loadingBar.style.transition = 'width 0.3s ease';
    loadingBar.style.zIndex = '9999';
    
    document.body.appendChild(loadingBar);
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => {
                    loadingBar.remove();
                }, 300);
            }, 200);
        }
        loadingBar.style.width = progress + '%';
    }, 100);
}

// Show loading bar on page load
window.addEventListener('load', addLoadingBar);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R refresh daily quote
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        const hitokotoContainer = document.querySelector('.hitokoto');
        if (hitokotoContainer) {
            hitokotoContainer.click();
        }
    }
    
    // ESC key to exit fullscreen
    if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        } else if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        } else if (document.msFullscreenElement) {
            document.msExitFullscreen();
        }
    }
    
    // F11 key to toggle fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        }
    }
});

// Add touch device support
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Optimize interaction for touch devices
    const touchElements = document.querySelectorAll('.social-link, .nav-link, .hitokoto');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add page visibility API support
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh daily quote when page becomes visible
        const hitokotoText = document.getElementById('hitokoto-text');
        if (hitokotoText && hitokotoText.textContent === 'Loading daily quote...') {
            setTimeout(() => {
                initHitokoto();
            }, 1000);
        }
    }
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
});

// Fullscreen toggle functionality
function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    
    // Check if fullscreen API is supported
    if (!document.fullscreenEnabled && 
        !document.webkitFullscreenEnabled && 
        !document.mozFullScreenEnabled && 
        !document.msFullscreenEnabled) {
        fullscreenToggle.style.display = 'none';
        return;
    }
    
    // Toggle fullscreen
    fullscreenToggle.addEventListener('click', function() {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });
    
    // Listen for fullscreen state changes
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
    
    function updateFullscreenIcon() {
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            fullscreenToggle.textContent = 'Exit Fullscreen';
            fullscreenToggle.title = 'Exit fullscreen';
        } else {
            fullscreenToggle.textContent = 'Fullscreen';
            fullscreenToggle.title = 'Enter fullscreen';
        }
    }
}

// Background image functionality
function initBackgroundImage() {
    const backgroundToggle = document.getElementById('background-toggle');
    
    // Local background image options
    const backgroundImages = [
        '/assets/images/backgrounds/yosemite-8177850.jpg',
        '/assets/images/backgrounds/berchtesgaden-2928711.jpg',
        '/assets/images/backgrounds/ball-63527.jpg',
        '/assets/images/backgrounds/cityscape-6942013.jpg',
        '/assets/images/backgrounds/berlin-6755246.jpg'
    ];
    
    // Check if device is mobile
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Toggle background image
    function toggleBackground() {
        try {
            backgroundToggle.classList.add('loading');
            backgroundToggle.textContent = 'Loading...';
            
            // Get random background image
            const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
            
            console.log('Setting background image:', randomImage);
            console.log('Is mobile device:', isMobile);
            
            // Preload image first to ensure it loads properly
            const img = new Image();
            
            img.onload = function() {
                console.log('Background image loaded successfully:', randomImage);
                
                // Set background image with mobile-specific optimizations
                document.body.style.backgroundImage = `url('${randomImage}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
                
                // Mobile-specific optimizations
                if (isMobile) {
                    // Use different approach for mobile devices
                    document.body.style.backgroundAttachment = 'scroll';
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center center';
                    
                    // Force repaint for mobile Chrome
                    document.body.style.transform = 'translateZ(0)';
                    document.body.style.webkitTransform = 'translateZ(0)';
                    document.body.style.willChange = 'background-image';
                    
                    // Additional mobile optimizations
                    document.body.style.webkitBackfaceVisibility = 'hidden';
                    document.body.style.webkitPerspective = '1000px';
                    document.body.style.imageRendering = '-webkit-optimize-contrast';
                    document.body.style.imageRendering = 'crisp-edges';
                } else {
                    // Desktop optimizations
                    document.body.style.backgroundAttachment = 'fixed';
                    document.body.style.imageRendering = 'crisp-edges';
                    document.body.style.imageRendering = '-webkit-optimize-contrast';
                    document.body.style.webkitBackfaceVisibility = 'hidden';
                    document.body.style.webkitTransform = 'translateZ(0)';
                    document.body.style.willChange = 'background-image';
                    document.body.style.webkitFontSmoothing = 'antialiased';
                    document.body.style.mozOsxFontSmoothing = 'grayscale';
                }
                
                backgroundToggle.classList.remove('loading');
                backgroundToggle.textContent = 'Background';
                
                console.log('Background image set successfully');
            };
            
            img.onerror = function() {
                console.error('Failed to load background image:', randomImage);
                // Use fallback gradient background
                document.body.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                
                backgroundToggle.classList.remove('loading');
                backgroundToggle.textContent = 'Background';
                
                // Try to load a different image
                setTimeout(() => {
                    const fallbackImage = backgroundImages.find(img => img !== randomImage);
                    if (fallbackImage) {
                        console.log('Trying fallback image:', fallbackImage);
                        const fallbackImg = new Image();
                        fallbackImg.onload = function() {
                            document.body.style.backgroundImage = `url('${fallbackImage}')`;
                        };
                        fallbackImg.onerror = function() {
                            console.error('All background images failed to load');
                        };
                        fallbackImg.src = fallbackImage;
                    }
                }, 1000);
            };
            
            // Start loading the image
            img.src = randomImage;
            
            // Add timeout for mobile devices
            if (isMobile) {
                setTimeout(() => {
                    if (backgroundToggle.classList.contains('loading')) {
                        console.log('Mobile timeout reached, using fallback');
                        backgroundToggle.classList.remove('loading');
                        backgroundToggle.textContent = 'Background';
                        document.body.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }
                }, 5000); // 5 second timeout for mobile
            }
            
        } catch (error) {
            console.error('Background toggle error:', error);
            backgroundToggle.classList.remove('loading');
            backgroundToggle.textContent = 'Background';
            // Use fallback gradient background
            document.body.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
    
    // Click to toggle background
    backgroundToggle.addEventListener('click', toggleBackground);
    
    // Load first background image on page load with delay for mobile
    if (isMobile) {
        // Delay background loading on mobile to ensure page is fully loaded
        setTimeout(() => {
            toggleBackground();
        }, 1000);
    } else {
        // Load immediately on desktop
        toggleBackground();
    }
    
    // Keyboard shortcut: B key to toggle background
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            toggleBackground();
        }
    });
    
    // Add mobile-specific background handling
    if (isMobile) {
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                // Force background refresh on orientation change
                const currentBg = document.body.style.backgroundImage;
                if (currentBg && currentBg !== 'none') {
                    document.body.style.backgroundImage = 'none';
                    setTimeout(() => {
                        document.body.style.backgroundImage = currentBg;
                    }, 100);
                }
            }, 500);
        });
        
        // Handle visibility change for mobile
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                // Refresh background when page becomes visible
                setTimeout(() => {
                    const currentBg = document.body.style.backgroundImage;
                    if (currentBg && currentBg !== 'none' && !currentBg.includes('gradient')) {
                        document.body.style.backgroundImage = 'none';
                        setTimeout(() => {
                            document.body.style.backgroundImage = currentBg;
                        }, 50);
                    }
                }, 200);
            }
        });
    }
}

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Add mobile-specific viewport handling
function handleMobileViewport() {
    // Fix for mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Initialize mobile viewport handling
handleMobileViewport(); 