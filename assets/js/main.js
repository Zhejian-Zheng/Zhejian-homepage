// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化一言
    initHitokoto();
    
    // 初始化页面动画
    initAnimations();
    
    // 初始化头像加载
    initAvatar();
    
    // 初始化社交链接
    initSocialLinks();
    
    // 初始化导航链接
    initNavLinks();
    
    // 初始化全屏切换
    initFullscreenToggle();
});

// 一言API初始化
function initHitokoto() {
    const hitokotoText = document.getElementById('hitokoto-text');
    const hitokotoAuthor = document.getElementById('hitokoto-author');
    
    // 一言API地址
    const hitokotoAPI = 'https://v1.hitokoto.cn/';
    
    // 获取一言
    function fetchHitokoto() {
        fetch(hitokotoAPI)
            .then(response => response.json())
            .then(data => {
                hitokotoText.textContent = data.hitokoto;
                hitokotoAuthor.textContent = `—— ${data.from}`;
                
                // 添加淡入动画
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
                console.error('获取一言失败:', error);
                hitokotoText.textContent = '生活不止眼前的代码，还有诗和远方';
                hitokotoAuthor.textContent = '—— 程序员';
            });
    }
    
    // 初始加载一言
    fetchHitokoto();
    
    // 点击一言区域刷新
    const hitokotoContainer = document.querySelector('.hitokoto');
    hitokotoContainer.addEventListener('click', function() {
        hitokotoText.textContent = '正在加载一言...';
        hitokotoAuthor.textContent = '—— 一言';
        fetchHitokoto();
    });
    
    // 添加点击提示
    hitokotoContainer.style.cursor = 'pointer';
    hitokotoContainer.title = '点击刷新一言';
}

// 页面动画初始化
function initAnimations() {
    // 添加鼠标移动视差效果
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelector('.particles');
        if (particles) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            particles.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        }
    });
    
    // 添加全屏模式下的特殊效果
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('hitokoto')) {
            return; // 一言区域点击不添加波纹
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

// 头像初始化
function initAvatar() {
    const avatar = document.getElementById('avatar');
    
    // 如果头像加载失败，使用默认头像
    avatar.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzUiIHI9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjM1IiByPSIxMCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTMwIDgwQzMwIDcwIDQwIDYwIDYwIDYwQzgwIDYwIDkwIDcwIDkwIDgwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDBfbGluZWFyXzFfMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMTIwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2NjdlZWEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+';
    });
    
    // 添加头像加载动画
    avatar.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease';
    });
}

// 社交链接初始化
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击波纹效果
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

// 导航链接初始化
function initNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href').substring(1);
            
            // 这里可以添加页面跳转逻辑
            console.log('导航到:', target);
            
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// 添加CSS动画
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
`;
document.head.appendChild(style);

// 添加页面加载进度条
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
    
    // 模拟加载进度
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

// 页面加载时显示进度条
window.addEventListener('load', addLoadingBar);

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R 刷新一言
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        const hitokotoContainer = document.querySelector('.hitokoto');
        if (hitokotoContainer) {
            hitokotoContainer.click();
        }
    }
    
    // ESC 键退出全屏
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
    
    // F11 键切换全屏
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('全屏请求失败:', err);
            });
        }
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 为触摸设备优化交互
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

// 添加页面可见性API支持
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时刷新一言
        const hitokotoText = document.getElementById('hitokoto-text');
        if (hitokotoText && hitokotoText.textContent === '正在加载一言...') {
            setTimeout(() => {
                initHitokoto();
            }, 1000);
        }
    }
});

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 全屏切换功能
function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const icon = fullscreenToggle.querySelector('i');
    
    // 检查是否支持全屏API
    if (!document.fullscreenEnabled && 
        !document.webkitFullscreenEnabled && 
        !document.mozFullScreenEnabled && 
        !document.msFullscreenEnabled) {
        fullscreenToggle.style.display = 'none';
        return;
    }
    
    // 切换全屏
    fullscreenToggle.addEventListener('click', function() {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // 进入全屏
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
            // 退出全屏
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
    
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
    
    function updateFullscreenIcon() {
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            icon.className = 'fas fa-compress';
            fullscreenToggle.title = '退出全屏';
        } else {
            icon.className = 'fas fa-expand';
            fullscreenToggle.title = '进入全屏';
        }
    }
}

// 添加性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
} 