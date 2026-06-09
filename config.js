/**
 * Portfolio Website - Configuration
 * Yanis Touhami - Martech Consultant
 * Centralized configuration for external services and settings
 */

// ===== Site Configuration =====
const SITE_CONFIG = {
  // Your website URL (used for social sharing, etc.)
  url: 'https://yanistouhami.com',
  
  // Your name (used in meta tags, etc.)
  name: 'Yanis Touhami',
  
  // Default theme: 'light' or 'dark'
  defaultTheme: 'light'
};

// ===== Blogger Configuration =====
// Set this up if you want to load blog posts from Blogger
const BLOGGER_CONFIG = {
  // Your Blogger blog ID (found in your Blogger dashboard URL)
  blogId: 'YOUR_BLOGGER_BLOG_ID',
  
  // Optional: Blogger API key (for server-side or authenticated requests)
  apiKey: 'YOUR_BLOGGER_API_KEY',
  
  // Maximum number of posts to display
  maxPosts: 6,
  
  // Your Blogger blog URL (for JSONP fallback)
  blogUrl: 'https://www.googleapis.com/blogger/v3/blogs/'
};

// ===== Podcast Configuration =====
// Define your podcast episodes here if not using an external service
const PODCAST_CONFIG = {
  // Set to true to enable podcast section
  enabled: true,
  
  // Your podcast episodes
  episodes: [
    {
      title: 'The Future of Martech',
      description: 'Exploring how AI and automation are reshaping marketing technology.',
      date: '2024-01-15',
      audioUrl: 'https://example.com/podcast/episode1.mp3',
      duration: '45:32'
    },
    {
      title: 'Cloud Migration Strategies',
      description: 'Best practices for moving your marketing stack to the cloud.',
      date: '2024-02-20',
      audioUrl: 'https://example.com/podcast/episode2.mp3',
      duration: '38:17'
    },
    {
      title: 'Data Privacy in Marketing',
      description: 'Navigating GDPR, CCPA, and other regulations in your marketing efforts.',
      date: '2024-03-10',
      audioUrl: 'https://example.com/podcast/episode3.mp3',
      duration: '52:04'
    }
  ]
};

// ===== Formspree Configuration =====
// Set this up if you want to use Formspree for form submissions
const FORMSPREE_CONFIG = {
  // Your Formspree form ID (found in your Formspree dashboard)
  formId: 'YOUR_FORMSPREE_FORM_ID'
};

// ===== Social Media Links =====
const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/yanistouhami',
  twitter: 'https://twitter.com/yanistouhami',
  github: 'https://github.com/yanistouhami',
  medium: 'https://medium.com/@yanistouhami'
};

// ===== Analytics Configuration =====
// Note: This site respects privacy by default
// If you want to add analytics, configure it here
const ANALYTICS_CONFIG = {
  // Google Analytics ID (leave empty to disable)
  gaId: '',
  
  // Plausible Analytics domain (leave empty to disable)
  plausibleDomain: ''
};

// ===== Export for Browser Access =====
// Attach configurations to the window object for browser access
window.SITE_CONFIG = SITE_CONFIG;
window.BLOGGER_CONFIG = BLOGGER_CONFIG;
window.PODCAST_CONFIG = PODCAST_CONFIG;
window.FORMSPREE_CONFIG = FORMSPREE_CONFIG;
window.SOCIAL_LINKS = SOCIAL_LINKS;
window.ANALYTICS_CONFIG = ANALYTICS_CONFIG;