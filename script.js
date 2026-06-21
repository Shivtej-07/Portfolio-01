/* ===========================================
   SHIVTEJ DEVKAR - PORTFOLIO JAVASCRIPT
   Premium Interactions & Animations
   =========================================== */

'use strict';

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      // Trigger AOS after load
      initAOS();
    }, 500);
  }, 2200);
});

// ===== TYPING ANIMATION =====
const typingTexts = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'React.js Developer',
  'Node.js Developer',
  'Problem Solver'
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  if (!typingEl) return;

  const currentText = typingTexts[typeIndex];

  if (isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % typingTexts.length;
    typeSpeed = 500; // Pause before next word
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing after loader
setTimeout(typeEffect, 2500);

// ===== SCROLL PROGRESS BAR =====
const scrollProgressBar = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrollPercent + '%';
  }
}

// ===== STICKY NAVBAR =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ===== ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

function updateScrollTopBtn() {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COMBINED SCROLL HANDLER =====
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbar();
      updateActiveNav();
      updateScrollTopBtn();
      checkAOS();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Run once on init
updateNavbar();
updateScrollTopBtn();

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on overlay click
document.addEventListener('click', (e) => {
  if (navMenu?.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburger?.contains(e.target)) {
    hamburger?.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== AOS (ANIMATE ON SCROLL) =====
let aosElements = [];

function initAOS() {
  aosElements = document.querySelectorAll('[data-aos]');
  checkAOS();
}

function checkAOS() {
  const windowHeight = window.innerHeight;

  aosElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 80;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('aos-animate');

      // Trigger skill bars when skills section is visible
      if (el.closest('#skills') || el.classList.contains('skills-grid')) {
        animateSkillBars();
      }

      // Trigger metric bars when why-hire section is visible
      if (el.closest('#why-hire') || el.classList.contains('metrics-grid')) {
        animateMetricBars();
      }
    }
  });
}

// ===== COUNTER ANIMATION =====
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  const counters = document.querySelectorAll('.count-num, .stat-num');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    if (!target) return;

    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(update);
  });

  countersAnimated = true;
}

// Observer for counter section
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const whyHireSection = document.getElementById('why-hire');
if (whyHireSection) counterObserver.observe(whyHireSection);

// Hero stats counters
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num[data-count]');
      statNums.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        if (!target) return;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        requestAnimationFrame(update);
      });
      heroStatsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsCard = document.querySelector('.stats-card');
if (statsCard) heroStatsObserver.observe(statsCard);

// ===== SKILL BARS ANIMATION =====
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 200);
  });

  skillsAnimated = true;
}

// Observer for skills section
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== METRIC BARS ANIMATION =====
let metricsAnimated = false;

function animateMetricBars() {
  if (metricsAnimated) return;

  document.querySelectorAll('.metric-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.width = width;
    }, 300);
  });

  metricsAnimated = true;
}

// Observer for why-hire section
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateMetricBars();
      metricsObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

if (whyHireSection) metricsObserver.observe(whyHireSection);

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s ease';
  });
});

// ===== GLASS CARD HOVER GLOW =====
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function validateField(input, errorEl, message) {
  if (!input.value.trim()) {
    input.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    return false;
  }
  input.classList.remove('error');
  errorEl.classList.remove('visible');
  return true;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  let valid = true;

  // Validate name
  if (!validateField(nameInput, nameError, 'Please enter your name.')) valid = false;

  // Validate email
  if (!nameInput.value.trim()) {
    // Already caught above
  }
  if (!emailInput.value.trim()) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter your email.';
    emailError.classList.add('visible');
    valid = false;
  } else if (!validateEmail(emailInput.value)) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('visible');
    valid = false;
  } else {
    emailInput.classList.remove('error');
    emailError.classList.remove('visible');
  }

  if (!validateField(subjectInput, subjectError, 'Please enter a subject.')) valid = false;
  if (!validateField(messageInput, messageError, 'Please enter your message.')) valid = false;

  if (!valid) return;

  // Simulate form submission
  const btnText = submitBtn.querySelector('span');
  const btnIcon = submitBtn.querySelector('svg');

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  btnText.textContent = 'Sending...';

  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    btnText.textContent = 'Send Message';

    formSuccess.style.display = 'flex';
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1800);
});

// Remove error on input
['contactName', 'contactEmail', 'contactSubject', 'contactMessage'].forEach(id => {
  const el = document.getElementById(id);
  el?.addEventListener('input', () => {
    el.classList.remove('error');
    const errorEl = document.getElementById(id.replace('contact', '').toLowerCase() + 'Error');
    if (errorEl) errorEl.classList.remove('visible');
  });
});

// ===== DOWNLOAD RESUME BUTTON =====
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Show a toast notification since there's no actual resume file
  showToast('Resume download will be available soon!', 'info');
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: ${type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)'};
    border: 1px solid ${type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'};
    color: ${type === 'success' ? '#10B981' : '#6366F1'};
    backdrop-filter: blur(10px);
    padding: 14px 22px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 9999;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 320px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== PARALLAX EFFECT ON HERO ORB =====
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== ACHIEVEMENT CARD HOVER RIPPLE =====
document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${y - size / 2}px;
      left: ${x - size / 2}px;
      background: rgba(99,102,241,0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s linear;
      pointer-events: none;
    `;

    if (!card.style.position) card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// ===== TECH TAGS ANIMATION =====
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach((tag, i) => {
  tag.style.animationDelay = `${i * 0.05}s`;
});

// ===== METRIC CARD OBSERVER FOR COUNT ANIMATION =====
const metricCardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const countEls = entry.target.querySelectorAll('.count-num');
      countEls.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!target) return;
        animateValue(el, 0, target, 2000);
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
  metricCardObserver.observe(card);
});

function animateValue(el, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOutQuart(progress);
    el.textContent = Math.floor(eased * (end - start) + start);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = end;
    }
  }

  requestAnimationFrame(step);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// ===== INTERSECTION OBSERVER FOR SECTION TAGS =====
const sectionTagObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.section-tag').forEach(tag => {
  sectionTagObserver.observe(tag);
});

// ===== FOOTER YEAR =====
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  const year = new Date().getFullYear();
  yearEl.innerHTML = yearEl.innerHTML.replace('2025', year);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== CURSOR CUSTOM EFFECT (Desktop Only) =====
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #6366F1;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
  `;

  const cursorTrail = document.createElement('div');
  cursorTrail.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(99,102,241,0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transition: all 0.15s ease;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorTrail);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top  = e.clientY - 4 + 'px';
    cursorTrail.style.left = e.clientX - 15 + 'px';
    cursorTrail.style.top  = e.clientY - 15 + 'px';
  });

  // Scale cursor on hover over interactive elements
  document.querySelectorAll('a, button, .project-card, .metric-card, .achievement-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursorTrail.style.transform = 'scale(1.5)';
      cursorTrail.style.borderColor = 'rgba(99,102,241,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorTrail.style.transform = 'scale(1)';
      cursorTrail.style.borderColor = 'rgba(99,102,241,0.4)';
    });
  });
}

// ===== INITIALIZATION COMPLETE =====
console.log('%c🚀 Shivtej Devkar Portfolio Loaded!', 'color: #6366F1; font-size: 16px; font-weight: bold;');
console.log('%cMERN Stack Developer | Full Stack Web Developer', 'color: #06B6D4; font-size: 12px;');
console.log('%c📧 shivtejdevkar670@gmail.com | 📱 +91 9623430670', 'color: #8B5CF6; font-size: 11px;');
