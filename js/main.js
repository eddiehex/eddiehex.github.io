// Enhanced Main JavaScript for Geek Theme

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced image modal with keyboard support
  function initImageModal() {
    const images = document.querySelectorAll('.page-content img');
    let modal = document.getElementById('imageModal');
    
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imageModal';
      modal.className = 'image-modal';
      modal.innerHTML = '<img class="modal-content" id="modalImg">';
      document.body.appendChild(modal);
    }
    
    const modalImg = modal.querySelector('#modalImg');
    
    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close modal on click or escape
    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
      }
    });
    
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('loading');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Enhanced scroll-to-top button
  function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #7fff00, #6bdb00);
      color: #000;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      visibility: hidden;
      z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    });
    
    // Smooth scroll to top
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', () => {
      scrollBtn.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
      scrollBtn.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  // Reading progress bar
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #7fff00, #6bdb00);
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const progress = (scrollTop / documentHeight) * 100;
      
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }

  // Theme preference detection and enhancement
  function initThemeEnhancements() {
    // Detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Add theme class to body
    document.body.classList.add('theme-dark');
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
    });
  }

  // Enhanced animations
  function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
      });
    }, observerOptions);
    
    // Observe post cards and other elements
    const elementsToAnimate = document.querySelectorAll('.post-card, .service-card, .page-content');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced search with debouncing
  function enhanceSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        // Add loading state
        this.classList.add('searching');
        
        // Simulate search delay
        setTimeout(() => {
          this.classList.remove('searching');
        }, 500);
      }, 300);
    });
    
    // Add search loading styles
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
      #search-input.searching {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z' fill='%237fff00'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 1rem center;
        animation: searchPulse 1s infinite;
      }
      
      @keyframes searchPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(searchStyle);
  }

  // Performance optimization
  function initPerformanceOptimizations() {
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/css/style.css';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);
    
    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  }

  // Initialize all features
  initImageModal();
  initLazyLoading();
  initScrollToTop();
  initReadingProgress();
  initThemeEnhancements();
  initAnimations();
  enhanceSearch();
  initPerformanceOptimizations();

  // Console welcome message
  console.log('%c🦈 Shark Blog - Geek Theme', 'color: #7fff00; font-size: 16px; font-weight: bold;');
  console.log('%cTheme enhanced with modern features!', 'color: #6bdb00; font-size: 12px;');
});