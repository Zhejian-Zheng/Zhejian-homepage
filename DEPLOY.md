# 部署指南

## 🚀 快速部署

### GitHub Pages 部署

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - 选择 Source 为 "Deploy from a branch"
   - 选择 Branch 为 "main"
   - 点击 Save

3. **访问你的网站**
   - 你的网站将在 `https://yourusername.github.io/your-repo-name` 上线

### Netlify 部署

1. **注册 Netlify 账户**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub 账户登录

2. **部署项目**
   - 点击 "New site from Git"
   - 选择你的 GitHub 仓库
   - 保持默认设置，点击 "Deploy site"

3. **自定义域名 (可选)**
   - 在站点设置中添加自定义域名
   - 配置 DNS 记录

### Vercel 部署

1. **注册 Vercel 账户**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 保持默认设置，点击 "Deploy"

3. **自动部署**
   - 每次推送到 GitHub 都会自动重新部署

## 🔧 自定义配置

### 修改个人信息

编辑 `config.js` 文件：

```javascript
const CONFIG = {
    personal: {
        name: "你的名字",
        title: "你的职位",
        bio: "你的个人简介"
    }
    // ... 其他配置
};
```

### 更换头像

1. 将你的头像图片放在 `assets/images/` 目录
2. 更新 `config.js` 中的路径：

```javascript
personal: {
    avatar: "assets/images/your-avatar.jpg"
}
```

### 修改社交链接

```javascript
social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://www.linkedin.com/in/zhejian-zheng-9a5563312/",
    email: "mailto:your.email@example.com"
}
```

## 📱 移动端优化

项目已经针对移动端进行了优化：

- 响应式设计
- 触摸友好的交互
- 优化的字体大小
- 适配不同屏幕尺寸

## 🔍 SEO 优化

### 添加 Meta 标签

在 `index.html` 的 `<head>` 部分添加：

```html
<meta name="description" content="你的个人主页描述">
<meta name="keywords" content="关键词1,关键词2,关键词3">
<meta name="author" content="你的名字">
<meta property="og:title" content="你的名字 - 个人主页">
<meta property="og:description" content="你的个人主页描述">
<meta property="og:image" content="你的头像URL">
```

### 添加 Google Analytics

在 `index.html` 的 `<head>` 部分添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ 故障排除

### 常见问题

1. **页面无法加载**
   - 检查文件路径是否正确
   - 确保所有文件都已上传

2. **一言无法显示**
   - 检查网络连接
   - 查看浏览器控制台错误信息

3. **样式显示异常**
   - 清除浏览器缓存
   - 检查 CSS 文件是否正确加载

4. **移动端显示问题**
   - 检查 viewport meta 标签
   - 测试不同设备尺寸

### 性能优化

1. **图片优化**
   - 压缩图片文件大小
   - 使用 WebP 格式
   - 添加懒加载

2. **代码优化**
   - 压缩 CSS 和 JavaScript
   - 启用 Gzip 压缩
   - 使用 CDN 加速

## 📞 获取帮助

如果遇到问题，可以：

1. 查看 [README.md](README.md) 文档
2. 提交 GitHub Issue
3. 联系技术支持

---

祝你部署顺利！🎉 