// 个人主页配置文件
// 修改以下配置来自定义你的个人主页

const CONFIG = {
    // 个人信息
    personal: {
        name: "Zhejian Zheng",
        title: "Software Engineer & Developer",
        bio: "热爱编程，专注于前端开发和用户体验设计",
        avatar: "assets/images/avatar.svg"
    },

    // 社交链接
    social: {
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        linkedin: "https://www.linkedin.com/in/zhejian-zheng-9a5563312/",
        email: "mailto:your.email@example.com"
    },

    // 技能标签
    skills: [
        "JavaScript",
        "React",
        "Vue.js",
        "Node.js",
        "Python",
        "Git"
    ],

    // 导航链接
    navigation: [
        { name: "关于我", href: "#about" },
        { name: "项目", href: "#projects" },
        { name: "博客", href: "#blog" },
        { name: "联系", href: "#contact" }
    ],

    // 主题色彩
    theme: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#f093fb"
    },

    // 一言API配置
    hitokoto: {
        enabled: true,
        api: "https://v1.hitokoto.cn/",
        fallback: {
            text: "生活不止眼前的代码，还有诗和远方",
            author: "程序员"
        }
    },

    // 页面设置
    settings: {
        enableAnimations: true,
        enableParallax: true,
        enableLoadingBar: true,
        enableBackgroundImage: true
    },

    // 背景图片设置
    background: {
        enabled: true,
        categories: ['nature', 'landscape', 'city', 'architecture', 'technology', 'abstract', 'minimal', 'space'],
        overlayOpacity: 0.7,
        autoChange: false,
        changeInterval: 30000 // 30秒
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 