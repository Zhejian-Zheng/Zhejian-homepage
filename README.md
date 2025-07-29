# Zhejian Personal Homepage

A modern personal homepage inspired by the design style of [dmego/home.github.io](https://github.com/dmego/home.github.io).

## Features

- **Modern Design** - Features gradient colors and glassmorphism effects
- **Responsive Layout** - Perfectly adapts to various device sizes
- **Dynamic Background** - Smooth animations and parallax scrolling
- **Random Background Images** - Uses Unsplash API to fetch high-quality background images
- **Daily Quote Integration** - Automatically fetches and displays daily quotes
- **Interactive Experience** - Rich hover effects and click feedback
- **Performance Optimized** - Fast loading and smooth animations

## Quick Start

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/Zhejian-homepage.git
cd Zhejian-homepage
```

### 2. Customize Configuration

Edit the `index.html` file and modify the following content:

#### Personal Information
```html
<h1 class="name">Your Name</h1>
<p class="title">Your Title</p>
<p class="bio">Your personal bio</p>
```

#### Social Links
```html
<a href="https://github.com/yourusername" target="_blank" class="social-link github">
    GitHub
</a>
<a href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/" target="_blank" class="social-link linkedin">
    LinkedIn
</a>
```

#### Skills Tags
```html
<div class="skills">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
</div>
```

### 3. Replace Profile Image

Place your profile image in the `assets/images/` directory and name it `profile image.jpg` or `profile image.png`, then update the path in the HTML:

```html
<img src="assets/images/profile image.jpg" alt="Profile Image" id="avatar">
```

### 4. Deployment

#### GitHub Pages Deployment

1. Push the code to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select `main` branch as the source

#### Other Platform Deployment

- **Netlify**: Drag and drop the project folder to Netlify
- **Vercel**: Connect GitHub repository for automatic deployment
- **Traditional Server**: Upload files to server directory

## Custom Styling

### Modify Theme Colors

Edit the CSS variables in the `assets/css/style.css` file:

```css
/* Main Colors */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Add Custom Animations

Add new animations in the CSS file:

```css
@keyframes yourAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

## Responsive Design

The project has been optimized for the following devices:

- Mobile (320px - 768px)
- Tablet (768px - 1024px)
- Desktop (1024px+)

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styles and animations
- **JavaScript ES6+** - Interactive functionality
- **Google Fonts** - Font services

## Feature Highlights

### Daily Quote API
- Automatically fetches daily quotes
- Click to refresh functionality
- Error handling and fallback content

### Animation Effects
- Page loading animations
- Hover effects
- Parallax scrolling
- Mouse following effects

### Interactive Features
- Keyboard shortcut support
- Touch device optimization
- Performance monitoring
- Error handling

### Background Image Features
- Click image button to switch backgrounds
- Press B key to quickly switch backgrounds
- Support for multiple image categories
- Automatic screen size adaptation

## Changelog

### v1.1.0 (2024-01-01)
- Added random background image functionality
- Optimized fullscreen display effects
- Improved responsive design
- Enhanced interactive experience

### v1.0.0 (2024-01-01)
- Initial version release
- Modern design
- Responsive layout
- Dynamic background effects
- Daily quote API integration

## Contributing

Welcome to submit Issues and Pull Requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from [dmego/home.github.io](https://github.com/dmego/home.github.io)
- Daily quote API service
- Google Fonts font service

## Contact

- Email: zh.zheng1@gmail.com
- Twitter: [@yourusername](https://twitter.com/yourusername)
- LinkedIn: [Zhejian Zheng](https://www.linkedin.com/in/zhejian-zheng-9a5563312/)

---

If this project helps you, please give it a star!
