/**
 * Portfolio Navigation
 * - Mobile menu toggle
 * - Sticky header on scroll
 * - Active link highlighting
 * - Smooth scroll (CSS handles this)
 * - Dark mode toggle with localStorage
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav__link');
  const themeToggle = document.getElementById('theme-toggle');
  const sections = document.querySelectorAll('section[id]');

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================

  function openMenu() {
    navToggle.classList.add('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('nav__menu--open');
    navOverlay.classList.add('nav__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('nav__menu--open');
    navOverlay.classList.remove('nav__overlay--visible');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('nav__menu--open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle button click
  navToggle.addEventListener('click', toggleMenu);

  // Close on overlay click
  navOverlay.addEventListener('click', closeMenu);

  // Close on nav link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  // ==========================================================================
  // Sticky Header
  // ==========================================================================

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check
  handleScroll();

  // ==========================================================================
  // Active Link Highlighting (Scroll Spy)
  // ==========================================================================

  function highlightActiveSection() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection, { passive: true });

  // Initial check
  highlightActiveSection();

  // ==========================================================================
  // Dark Mode Toggle
  // ==========================================================================

  const THEME_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Theme toggle click
  themeToggle.addEventListener('click', toggleTheme);

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================================================
  // Typing Effect
  // ==========================================================================

  const typingElement = document.getElementById('typing-text');

  if (typingElement) {
    const phrases = [
      'web applications',
      'responsive websites',
      'user interfaces',
      'digital experiences',
      'modern solutions'
    ];

    const config = {
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseAfterType: 2000,
      pauseAfterDelete: 500
    };

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Deleting characters
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, config.pauseAfterDelete);
          return;
        }

        setTimeout(type, config.deleteSpeed);
      } else {
        // Typing characters
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, config.pauseAfterType);
          return;
        }

        setTimeout(type, config.typeSpeed);
      }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
  }

  // ==========================================================================
  // Projects Filter
  // ==========================================================================

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => {
          btn.classList.remove('filter-btn--active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('filter-btn--active');
        button.setAttribute('aria-selected', 'true');

        // Filter cards with animation
        projectCards.forEach(card => {
          const category = card.dataset.category;
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.classList.remove('project-card--hidden');
            card.classList.remove('project-card--fade-out');
            card.classList.add('project-card--fade-in');
          } else {
            card.classList.add('project-card--fade-out');
            // Hide after animation completes
            setTimeout(() => {
              if (!shouldShow) {
                card.classList.add('project-card--hidden');
              }
            }, 300);
          }
        });
      });
    });
  }

  // ==========================================================================
  // Contact Form Validation
  // ==========================================================================

  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const sendAnotherBtn = document.getElementById('send-another');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    const fields = {
      name: {
        element: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: (value) => {
          if (!value.trim()) return 'Name is required';
          if (value.trim().length < 2) return 'Name must be at least 2 characters';
          return '';
        }
      },
      email: {
        element: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: (value) => {
          if (!value.trim()) return 'Email is required';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please enter a valid email';
          return '';
        }
      },
      subject: {
        element: document.getElementById('subject'),
        error: document.getElementById('subject-error'),
        validate: (value) => {
          if (!value.trim()) return 'Subject is required';
          if (value.trim().length < 3) return 'Subject must be at least 3 characters';
          return '';
        }
      },
      message: {
        element: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: (value) => {
          if (!value.trim()) return 'Message is required';
          if (value.trim().length < 10) return 'Message must be at least 10 characters';
          return '';
        }
      }
    };

    // Validate single field
    function validateField(fieldName) {
      const field = fields[fieldName];
      const value = field.element.value;
      const errorMessage = field.validate(value);

      if (errorMessage) {
        field.element.classList.add('form__input--error');
        field.element.classList.remove('form__input--success');
        field.error.textContent = errorMessage;
        return false;
      } else {
        field.element.classList.remove('form__input--error');
        field.element.classList.add('form__input--success');
        field.error.textContent = '';
        return true;
      }
    }

    // Validate all fields
    function validateForm() {
      let isValid = true;
      for (const fieldName in fields) {
        if (!validateField(fieldName)) {
          isValid = false;
        }
      }
      return isValid;
    }

    // Real-time validation on blur
    for (const fieldName in fields) {
      const field = fields[fieldName];
      field.element.addEventListener('blur', () => validateField(fieldName));

      // Clear error on input
      field.element.addEventListener('input', () => {
        if (field.element.classList.contains('form__input--error')) {
          field.element.classList.remove('form__input--error');
          field.error.textContent = '';
        }
      });
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        // Focus first error field
        for (const fieldName in fields) {
          if (fields[fieldName].element.classList.contains('form__input--error')) {
            fields[fieldName].element.focus();
            break;
          }
        }
        return;
      }

      // Show loading state
      submitBtn.classList.add('btn--loading');

      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Hide loading state
      submitBtn.classList.remove('btn--loading');

      // Show success message
      contactForm.parentElement.hidden = true;
      contactSuccess.hidden = false;

      // Reset form
      contactForm.reset();
      for (const fieldName in fields) {
        fields[fieldName].element.classList.remove('form__input--success');
      }
    });

    // Send another message
    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', () => {
        contactSuccess.hidden = true;
        contactForm.parentElement.hidden = false;
        fields.name.element.focus();
      });
    }
  }

  // ==========================================================================
  // Footer Year
  // ==========================================================================

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================

  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animatedElements.forEach(element => {
        element.classList.add('is-visible');
      });
    }
  } else {
    // Fallback: show all elements if IntersectionObserver not supported
    animatedElements.forEach(element => {
      element.classList.add('is-visible');
    });
  }

})();
