// Move And Play Kids - Main Application Script

class MoveAndPlayApp {
  constructor() {
    this.currentLang = localStorage.getItem('mpl_lang') || 'fr';
    this.currentSlide = 0;
    this.slides = [];
    this.slideInterval = null;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }
  
  initializeApp() {
    this.initializeI18n();
    this.initializeCarousel();
    this.initializeNavigation();
    this.initializeFilters();
    this.initializeModals();
    this.initializeFAQ();
    this.initializeOpeningPopup();
    this.updateLanguage();
  }
  
  // ===== INTERNATIONALIZATION =====
  initializeI18n() {
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
      // Set active state for current language
      this.updateLanguageButtons();
      
      // Add click listeners to language buttons
      langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = button.getAttribute('data-lang');
          if (lang && lang !== this.currentLang) {
            this.currentLang = lang;
            localStorage.setItem('mpl_lang', this.currentLang);
            this.updateLanguageButtons();
            this.updateLanguage();
          }
        });
      });
    }
  }
  
  updateLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
      const lang = button.getAttribute('data-lang');
      if (lang === this.currentLang) {
        button.classList.add('border-mpl-orange');
        button.classList.remove('border-transparent');
      } else {
        button.classList.remove('border-mpl-orange');
        button.classList.add('border-transparent');
      }
    });
  }
  
  updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation) {
        element.placeholder = translation;
      }
    });
    
    // Update aria-labels
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = this.getTranslation(key);
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });
  }
  
  getTranslation(key) {
    return translations[this.currentLang] && translations[this.currentLang][key] || key;
  }
  
  // ===== HERO CAROUSEL =====
  initializeCarousel() {
    this.slides = document.querySelectorAll('.hero-slide');
    if (this.slides.length === 0) return;
    
    // Show first slide
    this.slides[0].classList.add('active');
    
    // Start automatic slideshow
    this.startSlideshow();
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.pauseSlideshow());
      carousel.addEventListener('mouseleave', () => this.startSlideshow());
    }
  }
  
  showNextSlide() {
    if (this.slides.length === 0) return;
    
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add('active');
  }
  
  startSlideshow() {
    this.pauseSlideshow(); // Clear any existing interval
    this.slideInterval = setInterval(() => this.showNextSlide(), 5000);
  }
  
  pauseSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
  
  // ===== NAVIGATION =====
  initializeNavigation() {
    // Mobile menu toggle
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Update aria-expanded
        const isExpanded = !mobileMenu.classList.contains('hidden');
        burger.setAttribute('aria-expanded', isExpanded);
      });
      
      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
    
    // Highlight current page in navigation
    this.highlightCurrentPage();
    
    // Smooth scrolling for anchor links
    this.initializeSmoothScrolling();
  }
  
  highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // ===== FILTERS =====
  initializeFilters() {
    // Workshop filters
    const ageFilter = document.getElementById('ageFilter');
    const dayFilter = document.getElementById('dayFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (ageFilter || dayFilter || locationFilter) {
      [ageFilter, dayFilter, locationFilter].forEach(filter => {
        if (filter) {
          filter.addEventListener('change', () => this.filterWorkshops());
        }
      });
    }
    
    // Stage filters
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) {
      periodFilter.addEventListener('change', () => this.filterStages());
    }
  }
  
  filterWorkshops() {
    const ageFilter = document.getElementById('ageFilter');
    const dayFilter = document.getElementById('dayFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    const selectedAge = ageFilter ? ageFilter.value : '';
    const selectedDay = dayFilter ? dayFilter.value : '';
    const selectedLocation = locationFilter ? locationFilter.value : '';
    
    const workshopCards = document.querySelectorAll('.workshop-card');
    
    workshopCards.forEach(card => {
      const age = card.dataset.age || '';
      const day = card.dataset.day || '';
      const location = card.dataset.location || '';
      
      const ageMatch = !selectedAge || age.includes(selectedAge) || selectedAge === 'all';
      const dayMatch = !selectedDay || day === selectedDay || selectedDay === 'all';
      const locationMatch = !selectedLocation || location === selectedLocation || selectedLocation === 'all';
      
      if (ageMatch && dayMatch && locationMatch) {
        card.style.display = 'block';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  }
  
  filterStages() {
    const periodFilter = document.getElementById('periodFilter');
    const selectedPeriod = periodFilter ? periodFilter.value : '';
    
    const stageCards = document.querySelectorAll('.stage-card');
    
    stageCards.forEach(card => {
      const period = card.dataset.period || '';
      
      const periodMatch = !selectedPeriod || period === selectedPeriod || selectedPeriod === 'all';
      
      if (periodMatch) {
        card.style.display = 'block';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  }
  
  // ===== FAQ ACCORDION =====
  initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-icon');
        const isOpen = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            otherAnswer.style.maxHeight = '0';
            otherIcon.style.transform = 'rotate(0deg)';
          }
        });
        
        // Toggle current FAQ item
        if (isOpen) {
          faqItem.classList.remove('active');
          answer.style.maxHeight = '0';
          icon.style.transform = 'rotate(0deg)';
        } else {
          faqItem.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
  
  // ===== MODALS =====
  initializeModals() {
    // Stage detail modals
    const detailButtons = document.querySelectorAll('[data-modal-target]');
    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal-target');
        this.openModal(modalId);
      });
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = button.closest('.modal');
        if (modal) {
          this.closeModal(modal.id);
        }
      });
    });
    
    // Close modal on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          this.closeModal(activeModal.id);
        }
      }
    });
  }
  
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus the modal for accessibility
      modal.focus();
    }
  }
  
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // ===== OPENING POPUP =====
  initializeOpeningPopup() {
    const popup = document.getElementById('openingPopup');
    const closeButton = document.getElementById('closePopup');
    
    if (!popup) return;
    
    // Check if popup has been closed before
    const popupClosed = sessionStorage.getItem('openingPopupClosed');
    
    // Show popup only on index.html and if not closed in this session
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/') ||
                        window.location.pathname === '';
    
    if (isIndexPage && !popupClosed) {
      // Show popup after a short delay
      setTimeout(() => {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
      }, 500);
    }
    
    // Close popup function
    const closePopup = () => {
      popup.classList.remove('show');
      document.body.style.overflow = '';
      sessionStorage.setItem('openingPopupClosed', 'true');
    };
    
    // Close button click
    if (closeButton) {
      closeButton.addEventListener('click', closePopup);
    }
    
    // Close on backdrop click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
      }
    });
  }
  
  // ===== UTILITY METHODS =====
  
  // Animate elements on scroll
  initializeScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }
  
  // Form validation
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });
    
    return isValid;
  }
  
  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize the application
const app = new MoveAndPlayApp();

// Export for potential use in other scripts
if (typeof window !== 'undefined') {
  window.MoveAndPlayApp = app;
}
