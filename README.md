# Portfolio

This repository contains the source code for Yanis Touhami's professional portfolio website, showcasing expertise in martech, cloud solutions, AI integration, and digital transformation.

## Files Overview

### 1. **`index.html`**
The main HTML file for the portfolio website. It includes:
- **Structure**: Semantic HTML5 structure with sections for Hero, Services, About, Blog, Podcast, and Contact.
- **Meta Tags**: SEO-optimized meta tags, Open Graph, and Twitter Card metadata for social sharing.
- **Accessibility**: Skip links, ARIA labels, and semantic markup for better accessibility.
- **Responsive Design**: Mobile-friendly navigation and layout.
- **External Integrations**: Links to Blogger API for dynamic blog posts, Formspree for contact forms, and social media profiles.

### 2. **`style.css`**
The primary stylesheet for the portfolio website. It features:
- **CSS Variables**: Custom properties for colors, typography, spacing, borders, shadows, and transitions for easy theming.
- **Dark/Light Theme**: Toggleable theme support with smooth transitions.
- **Responsive Design**: Media queries for mobile, tablet, and desktop views.
- **Accessibility**: Reduced motion support, focus styles, and print styles.
- **Components**: Styles for navigation, cards, buttons, forms, and other UI elements.
- **Animations**: Fade-in animations and smooth transitions.

### 3. **`app.js`**
The main JavaScript file handling client-side functionality:
- **Theme Toggle**: Switch between dark and light themes with localStorage persistence.
- **Lazy Loading**: Dynamic loading of images and blog posts for performance optimization.
- **Dynamic Content**: Fetches and renders blog posts from Blogger API and podcast episodes from configuration.
- **Contact Form**: Handles form submission with Formspree integration.
- **Smooth Scrolling**: Enhanced navigation with smooth scrolling for anchor links.
- **Mobile Navigation**: Toggleable mobile menu for smaller screens.
- **Utility Functions**: Current year display, outbound link tracking, and more.

### 4. **`config.js`**
Centralized configuration file for external services and settings:
- **Site Configuration**: URL, name, and default theme settings.
- **Blogger Configuration**: Settings for loading blog posts from Blogger (API keys, blog ID, etc.).
- **Podcast Configuration**: Episode details for the podcast section.
- **Formspree Configuration**: Form ID for contact form submissions.
- **Social Media Links**: URLs for LinkedIn, Twitter, GitHub, and Medium.
- **Analytics Configuration**: Placeholders for Google Analytics or Plausible Analytics (disabled by default for privacy).

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mondomapam-ui/portfolio.git
   ```

2. **Customize Configuration**:
   - Update `config.js` with your Blogger, Formspree, and social media details.
   - Modify `SITE_CONFIG` to reflect your personal or brand information.

3. **Deploy**:
   - Host the files on any static site hosting service (e.g., GitHub Pages, Netlify, Vercel).

## Features

- **Fully Responsive**: Works on all device sizes.
- **Privacy-Focused**: No tracking cookies or third-party analytics by default.
- **Accessible**: Follows WCAG guidelines for accessibility.
- **Modern Stack**: Uses CSS Variables, Flexbox, Grid, and vanilla JavaScript.
- **Dynamic Content**: Loads blog posts and podcast episodes dynamically.

## License

This project is private and proprietary. All rights reserved.