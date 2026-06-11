/* ============================================
   CEJEC — Vanilla JS (MODIFYE: Animasyon re-jwe lè w desann)
   ============================================ */
(function () {
  'use strict';

  // ---------- Definisi icon pou sparkle ----------
const sparkleIcons = [
    "fa-solid fa-star",
    "fa-solid fa-sparkles",
    "fa-solid fa-circle",
    "fa-solid fa-diamond"
];

  // ---------- Preloader ----------
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) setTimeout(() => pre.classList.add('hidden'), 350);
  });

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavbar();
    setupHamburger();
    setupActiveLink();
    setupNavOverlay(); // Ajoute fonksyon pou nav overlay
    setupScrollProgress();
    setupReveal();          // Animasyon re-jwe chak fwa eleman an rantre nan viewport
    setupCounters();
    setupRipple();
    setupScrollTop();
    setupTyping(); 
    setupParallax();
    setupMagicAnimation();
    setupFaqAccordion();
  }

  // ---------- Navbar scroll ----------
  function setupNavbar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

// ---------- Hamburger Menu ----------
function setupHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  // Toggle menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault(); // Anpeche konpòtman default

    const isOpen = !navLinks.classList.contains('open');
    
    if (isOpen) {
      hamburger.classList.add('open');
      navLinks.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      // Ajoute overlay si li egziste
      const overlay = document.querySelector('.nav-overlay');
      if (overlay) overlay.classList.add('active');
    } else {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      // Retire overlay si li egziste
      const overlay = document.querySelector('.nav-overlay');
      if (overlay) overlay.classList.remove('active');
    } 
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      closeMenu();
    }
  });

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Retire overlay si li egziste
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) overlay.classList.remove('active');
  }
}

  // ---------- Active nav link ----------
  function setupActiveLink() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  function setupNavOverlay() {
  const overlay = document.querySelector('.nav-overlay');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!overlay) return;

  // Klike sou overlay pou fèmen meni
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    overlay.classList.remove('active');
  });
}

  // ---------- Scroll progress bar ----------
  function setupScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    
    const update = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = pct + '%';
    };
    
    window.addEventListener('scroll', update, { passive: true });
  }

  // ============================================
  // REVEAL: Animasyon re-jwe chak fwa eleman an rantre nan viewport
  // ============================================
  function setupReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    
    if (!revealElements.length) return;
    
    if (!('IntersectionObserver' in window)) {
      // Si navigateur pa sipòte IntersectionObserver, montre tout eleman yo
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }
    
    // Kreye yon observer ki re-jwe animasyon an chak fwa eleman an rantre
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lè eleman an rantre nan viewport, ajoute klas "visible" pou montre animasyon an
          entry.target.classList.add('visible');
        } else {
          // Lè eleman an soti nan viewport, retire klas "visible" pou l kapab re-anime lè l rantre ankò
          entry.target.classList.remove('visible');
        }
      });
    }, { 
      threshold: 0.12,        // 12% nan eleman an vizib deklanche animasyon an
      rootMargin: "0px 0px -20px 0px"  // Ti margin pou evite animasyon twò bonè
    });
    
    // Observe chak eleman reveal
    revealElements.forEach(el => observer.observe(el));
  }

  // ---------- Counters (re-anime lè w desann) ----------
  function setupCounters() {
    const counters = document.querySelectorAll('.counter .num');
    if (!counters.length) return;
    
    // Store original values pou re-animation
    counters.forEach(counter => {
      const target = +counter.dataset.count;
      if (!isNaN(target)) {
        counter.dataset.originalTarget = target;
      }
    });
    
    const animateCounter = (el) => {
      const target = +el.dataset.originalTarget || +el.dataset.count;
      if (isNaN(target)) return;
      
      const dur = 1800;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';
      
      // Verifye si li gen yon text node pou animate
      let textNode = el.firstChild;
      if (!textNode || textNode.nodeType !== 3) {
        textNode = document.createTextNode('0');
        el.insertBefore(textNode, el.firstChild);
      }
      
      // Retire plus ki te deja la
      const existingPlus = el.querySelector('.plus');
      if (existingPlus) existingPlus.remove();
      
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const currentValue = Math.floor(target * eased);
        textNode.nodeValue = currentValue.toLocaleString('fr-FR');
        
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          textNode.nodeValue = target.toLocaleString('fr-FR');
          // Ajoute suffix la apef animasyon an fini
          if (suffix && !el.querySelector('.plus')) {
            const s = document.createElement('span');
            s.className = 'plus';
            s.textContent = suffix;
            el.appendChild(s);
          }
        }
      };
      
      requestAnimationFrame(step);
    };
    
    // Observer pou counters ak re-animation
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          // Reset text node a 0 avan re-anime
          const textNode = counter.firstChild;
          if (textNode && textNode.nodeType === 3) {
            textNode.nodeValue = '0';
          }
          // Retire plus la si li te la
          const existingPlus = counter.querySelector('.plus');
          if (existingPlus) existingPlus.remove();
          // Re-anime counter la
          animateCounter(counter);
        }
      });
    }, { threshold: 0.4 });
    
    counters.forEach(c => counterObserver.observe(c));
  }

  // ---------- Ripple ----------
  function setupRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const r = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        r.className = 'ripple';
        r.style.width = r.style.height = size + 'px';
        r.style.left = (e.clientX - rect.left - size / 2) + 'px';
        r.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(r);
        setTimeout(() => r.remove(), 650);
      });
    });
  }

  // ---------- Scroll to top ----------
  function setupScrollTop() {
    const btn = document.querySelector('.to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Hero typing ----------
  function setupTyping() {
    const el = document.querySelector('.typed');
    if (!el) return;
    
    const words = (el.dataset.words || 'Innover,Entreprendre,Réussir').split(',');
    let wi = 0, ci = 0, deleting = false;
    
    const tick = () => {
      const w = words[wi];
      el.textContent = w.slice(0, ci);
      
      if (!deleting && ci < w.length) { 
        ci++; 
        setTimeout(tick, 90); 
      } else if (deleting && ci > 0) { 
        ci--; 
        setTimeout(tick, 45); 
      } else {
        deleting = !deleting;
        if (!deleting) wi = (wi + 1) % words.length;
        setTimeout(tick, deleting ? 1400 : 300);
      }
    };
    
    tick();
  }

  // ---------- Parallax (hero visual) ----------
  function setupParallax() {
    const target = document.querySelector('[data-parallax]');
    if (!target) return;
    
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      target.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ============================================
  // MAGIC ANIMATION - Make Magic Happen
  // ============================================
  function setupMagicAnimation() {
    const magicTitle = document.querySelector('.magic-title');
    
    if (!magicTitle) return;
    
    // Kreye sparkle apre text la fin parèt
    setTimeout(() => {
      createSparkles(magicTitle);
    }, 1300);
    
    // Ajoute animasyon sou logo lè ou klike
    const magicLogo = document.querySelector('.magic-logo');
    if (magicLogo) {
      magicLogo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = 'floatLogo 3s ease-in-out infinite, glowPulse 2s ease-in-out infinite';
        }, 10);
        createSparkles(magicTitle);
      });
    }
  }

  // Fonksyon pou kreye sparkle (etwal majik)
  function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for(let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = `<i class="${sparkleIcons[Math.floor(Math.random()*sparkleIcons.length)]}"></i>`;
      sparkle.className = 'sparkle-particle';
      
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150 + 30;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.fontSize = (Math.random() * 24 + 12) + 'px';
      sparkle.style.opacity = Math.random() * 0.8 + 0.2;
      sparkle.style.position = 'fixed';
      sparkle.style.zIndex = '9999';
      sparkle.style.pointerEvents = 'none';
      //sparkle.style.color = "#FFD700"; // oswa var(--gold)
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle && sparkle.remove) sparkle.remove();
      }, 1000);
    }
  }

  // ---------- FAQ Accordion ----------
  function setupFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const answerContent = answer.querySelector("p");

      question.addEventListener("click", () => {
        // Fermer les autres (accordion style propre)
        faqItems.forEach(el => {
          if (el !== item) {
            el.classList.remove("active");
            el.querySelector(".faq-answer").style.maxHeight = null;
          }
        });

        // Toggle current
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
          // Kalkile wotè total: kontni + padding
          const totalHeight = answer.scrollHeight + 40; // 40px pou padding (20px anwo + 20px anba)
          answer.style.maxHeight = totalHeight + "px";
        } else {
          answer.style.maxHeight = null;
        }
      });
    });
  }
})();