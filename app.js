/**
 * Portfolio Website - Main Application JavaScript
 * Yanis Touhami - Martech Consultant
 * Handles theme toggling, lazy loading, form submission, and dynamic content
 */

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initThemeToggle();
  initLazyLoading();
  initBlogPosts();
  initPodcastEpisodes();
  initContactForm();
  initSmoothScroll();
  initLogoScroll();
  initCurrentYear();
  initMobileNav();
});

// ===== Theme Toggle =====
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Set initial icon based on current theme
  updateThemeIcon();

  // Toggle theme on click
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateThemeIcon();
    }
  });
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('.theme-toggle-icon');
  if (!icon) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  icon.textContent = currentTheme === 'dark' ? '☀️' : '🌓';
}

// ===== Lazy Loading =====
function initLazyLoading() {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // Lazy load blog posts
  initBlogPosts();
}

// ===== Blog Posts =====
function initBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;

  // Check if we have Blogger configuration
  if (window.BLOGGER_CONFIG && window.BLOGGER_CONFIG.blogId) {
    loadBloggerPosts(blogContainer);
  } else {
    // Fallback: Display static posts or message
    blogContainer.innerHTML = `
      <article class="card fade-in">
        <h3 class="blog-card-title">Blog Coming Soon</h3>
        <p class="blog-card-excerpt">
          Blog posts will be loaded from Blogger API. Configure your Blogger settings in config.js.
        </p>
      </article>
    `;
  }
}

function loadBloggerPosts(container) {
  const blogId = window.BLOGGER_CONFIG.blogId;
  const apiKey = window.BLOGGER_CONFIG.apiKey || '';
  const maxResults = window.BLOGGER_CONFIG.maxPosts || 6;
  const blogUrl = window.BLOGGER_CONFIG.blogUrl || `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;

  // Use JSONP if API key is not available (for client-side only)
  if (!apiKey) {
    const script = document.createElement('script');
    script.src = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json-in-script&max-results=${maxResults}&callback=handleBloggerPosts`;
    document.body.appendChild(script);
    
    window.handleBloggerPosts = function(data) {
      renderBlogPosts(container, data.feed.entry || []);
      document.body.removeChild(script);
      delete window.handleBloggerPosts;
    };
  } else {
    // Use fetch with API key
    fetch(`${blogUrl}?key=${apiKey}&fetchBodies=false&fetchImages=true&maxResults=${maxResults}`)
      .then(response => response.json())
      .then(data => renderBlogPosts(container, data.items || []))
      .catch(error => {
        console.error('Error loading blog posts:', error);
        container.innerHTML = '<p class="text-center text-secondary">Could not load blog posts. Please try again later.</p>';
      });
  }
}

function renderBlogPosts(container, posts) {
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p class="text-center text-secondary">No blog posts found.</p>';
    return;
  }

  const postHTML = posts.map(post => {
    // Extract data based on response format
    const title = post.title?.$t || post.title || 'Untitled';
    const summary = post.summary?.$t || post.summary || '';
    const published = post.published?.$t || post.published || '';
    const url = post.link?.find(l => l.rel === 'alternate')?.href || 
                post.url || 
                post.link || 
                '#';
    
    // Extract thumbnail if available
    const thumbnail = post.media$thumbnail?.url || 
                     post.thumbnail || 
                     null;
    
    // Format date
    const date = published ? new Date(published).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    return `
      <article class="blog-card fade-in">
        ${thumbnail ? `<img src="${thumbnail}" alt="${title}" class="blog-card-image" loading="lazy">` : ''}
        <h3 class="blog-card-title">
          <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
        </h3>
        <p class="blog-card-excerpt">${summary || 'No excerpt available.'}</p>
        <div class="blog-card-meta">
          <span>${date}</span>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary">Read more</a>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = postHTML;
}

// ===== Podcast Episodes =====
function initPodcastEpisodes() {
  const podcastContainer = document.getElementById('podcast-episodes');
  if (!podcastContainer) return;

  // Check if we have podcast configuration
  if (window.PODCAST_CONFIG && window.PODCAST_CONFIG.episodes) {
    renderPodcastEpisodes(podcastContainer, window.PODCAST_CONFIG.episodes);
  } else {
    // Fallback: Display static episodes or message
    podcastContainer.innerHTML = `
      <article class="card fade-in">
        <h3 class="blog-card-title">Podcast Coming Soon</h3>
        <p class="blog-card-excerpt">
          Podcast episodes will be loaded from configuration. Set up your podcast episodes in config.js.
        </p>
      </article>
    `;
  }
}

function renderPodcastEpisodes(container, episodes) {
  if (!episodes || episodes.length === 0) {
    container.innerHTML = '<p class="text-center text-secondary">No podcast episodes found.</p>';
    return;
  }

  const episodeHTML = episodes.map(episode => {
    const title = episode.title || 'Untitled';
    const description = episode.description || '';
    const date = episode.date ? new Date(episode.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';
    const audioUrl = episode.audioUrl || '';
    const duration = episode.duration || '';

    return `
      <article class="card fade-in">
        <h3 class="blog-card-title">${title}</h3>
        <p class="blog-card-excerpt">${description || 'No description available.'}</p>
        <div class="blog-card-meta">
          <span>${date}</span>
          ${duration ? `<span>${duration}</span>` : ''}
          ${audioUrl ? `<a href="${audioUrl}" target="_blank" rel="noopener noreferrer" class="text-primary">Listen now</a>` : ''}
        </div>
        ${audioUrl ? `
          <audio controls class="mt-md" style="width: 100%;">
            <source src="${audioUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        ` : ''}
      </article>
    `;
  }).join('');

  container.innerHTML = episodeHTML;
}

// ===== Contact Form =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Check if Formspree is configured
    if (window.FORMSPREE_CONFIG && window.FORMSPREE_CONFIG.formId) {
      submitFormToFormspree(form, data, formMessage, submitBtn);
    } else {
      // Fallback: Log to console and show success message
      console.log('Form submission:', data);
      formMessage.innerHTML = `
        <div class="card" style="background: var(--color-success); color: white;">
          <p>Thank you for your message! I'll get back to you soon.</p>
        </div>
      `;
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function submitFormToFormspree(form, data, formMessage, submitBtn) {
  const formId = window.FORMSPREE_CONFIG.formId;
  const endpoint = `https://formspree.io/f/${formId}`;

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      formMessage.innerHTML = `
        <div class="card" style="background: var(--color-success); color: white;">
          <p>Thank you for your message! I'll get back to you soon.</p>
        </div>
      `;
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    formMessage.innerHTML = `
      <div class="card" style="background: var(--color-error); color: white;">
        <p>There was an error submitting your form. Please try again later.</p>
      </div>
    `;
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ===== Logo Scroll to Top =====
function initLogoScroll() {
  const logo = document.querySelector('.navbar-logo');
  if (!logo) return;

  logo.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== Current Year =====
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== Mobile Navigation =====
function initMobileNav() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (!navbarToggle || !navbarLinks) return;

  navbarToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.style.display = isExpanded ? 'none' : 'flex';
  });
}

// ===== Outbound Link Tracking =====
function trackOutboundLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
      // You can add analytics tracking here
      console.log('Outbound link clicked:', this.href);
    });
  });
}

// Initialize outbound link tracking
trackOutboundLinks();
