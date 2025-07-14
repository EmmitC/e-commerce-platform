// Advanced Animation System
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupLoadingAnimations();
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });
  }

  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      // Category slider parallax
      const categorySlider = document.getElementById('parallaxCategorySlider');
      if (categorySlider) {
        const offset = scrolled * 0.3;
        categorySlider.style.transform = `translateX(-${offset}px)`;
      }

      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestParallaxUpdate);
  }

  setupHoverEffects() {
    // Product card hover effects
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.classList.remove('hovered');
      }
    });

    // Button ripple effect
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn')) {
        this.createRipple(e);
      }
    });
  }

  setupLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Stagger animation for initial elements
      const elements = document.querySelectorAll('.stagger-animation');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 100);
      });
    });
  }

  createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Smooth scroll to element
  scrollTo(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Loading spinner
  showLoading(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    `;
    container.appendChild(spinner);
    return spinner;
  }

  hideLoading(spinner) {
    if (spinner && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
  const animationManager = new AnimationManager();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      animationManager.scrollTo(targetId, 80);
    });
  });
});

// Typing animation for hero text
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation if element exists
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    new TypingAnimation(typingElement, [
      'Wear Confidence. Be Bold.',
      'Express Your Style.',
      'Stand Out From The Crowd.'
    ]);
  }
});