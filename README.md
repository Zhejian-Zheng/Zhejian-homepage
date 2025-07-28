# Zhejian 个人主页

一个现代化的个人主页，参考了 [dmego/home.github.io](https://github.com/dmego/home.github.io) 的设计风格。

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变色彩和毛玻璃效果
- 📱 **响应式布局** - 完美适配各种设备尺寸
- 🌊 **动态背景** - 流畅的动画效果和视差滚动
- 💬 **一言集成** - 自动获取并显示每日一言
- 🎯 **交互体验** - 丰富的悬停效果和点击反馈
- ⚡ **性能优化** - 快速加载和流畅动画

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/Zhejian-homepage.git
cd Zhejian-homepage
```

### 2. 自定义配置

编辑 `index.html` 文件，修改以下内容：

#### 个人信息
```html
<h1 class="name">你的名字</h1>
<p class="title">你的职位</p>
<p class="bio">你的个人简介</p>
```

#### 社交链接
```html
<a href="https://github.com/yourusername" target="_blank" class="social-link github">
    <i class="fab fa-github"></i>
</a>
<a href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/" target="_blank" class="social-link linkedin">
    <i class="fab fa-linkedin"></i>
</a>
```

#### 技能标签
```html
<div class="skills">
    <span class="skill-tag">你的技能1</span>
    <span class="skill-tag">你的技能2</span>
</div>
```

### 3. 替换头像

将你的头像图片放在 `assets/images/` 目录下，并命名为 `avatar.jpg` 或 `avatar.png`，然后更新 HTML 中的路径：

```html
<img src="assets/images/your-avatar.jpg" alt="头像" id="avatar">
```

### 4. 部署

#### GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源

#### 其他平台部署

- **Netlify**: 直接拖拽项目文件夹到 Netlify
- **Vercel**: 连接 GitHub 仓库自动部署
- **传统服务器**: 上传文件到服务器目录

## 🎨 自定义样式

### 修改主题色彩

编辑 `assets/css/style.css` 文件中的 CSS 变量：

```css
/* 主色调 */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### 添加自定义动画

在 CSS 文件中添加新的动画：

```css
@keyframes yourAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

## 📱 响应式设计

项目已经针对以下设备进行了优化：

- 📱 手机 (320px - 768px)
- 📱 平板 (768px - 1024px)
- 💻 桌面 (1024px+)

## 🔧 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **JavaScript ES6+** - 交互功能
- **Font Awesome** - 图标库
- **Google Fonts** - 字体服务

## 🌟 功能特性

### 一言 API
- 自动获取每日一言
- 点击刷新功能
- 错误处理和备用内容

### 动画效果
- 页面加载动画
- 悬停效果
- 视差滚动
- 鼠标跟随效果

### 交互功能
- 键盘快捷键支持
- 触摸设备优化
- 性能监控
- 错误处理

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- 🎨 现代化设计
- 📱 响应式布局
- 🌊 动态背景效果
- 💬 一言 API 集成

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 设计灵感来自 [dmego/home.github.io](https://github.com/dmego/home.github.io)
- 一言 API 服务
- Font Awesome 图标库
- Google Fonts 字体服务

## 📞 联系

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)
- 💼 LinkedIn: [Zhejian Zheng](https://www.linkedin.com/in/zhejian-zheng-9a5563312/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！