// Personal Homepage Configuration
// Modify the following configuration to customize your personal homepage

const CONFIG = {
    // Personal Information
    personal: {
        name: "Zhejian Zheng",
        title: "Software Engineer & Developer",
        bio: "Passionate about programming, focused on frontend development and user experience design",
        avatar: "assets/images/profile image.jpg"
    },

    // Social Links
    social: {
        github: "https://github.com/Zhejian-Zheng",
        linkedin: "https://www.linkedin.com/in/zhejian-zheng-9a5563312/"
    },

    // Skills Tags
    skills: [
        "JavaScript",
        "React",
        "Vue.js",
        "Node.js",
        "Python",
        "Git"
    ],

    // Navigation Links
    navigation: [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" }
    ],

    // Theme Colors
    theme: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#f093fb"
    },

    // Daily Quote API Configuration
    hitokoto: {
        enabled: true,
        api: "https://api.quotable.io/random",
        fallback: {
            text: "Life is not just about code, but also poetry and dreams",
            author: "Developer"
        }
    },

    // Page Settings
    settings: {
        enableAnimations: true,
        enableParallax: true,
        enableLoadingBar: true,
        enableBackgroundImage: true
    },

    // Background Image Settings
    background: {
        enabled: true,
        categories: ['nature', 'landscape', 'city', 'architecture', 'technology', 'abstract', 'minimal', 'space'],
        overlayOpacity: 0.7,
        autoChange: false,
        changeInterval: 30000 // 30 seconds
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 