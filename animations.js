/* ═══════════════════════════════════════════════
   MVRP EXPORTS – ANIMATIONS JAVASCRIPT
   Scroll reveal, counter animation, page effects
═══════════════════════════════════════════════ */

/* ═══════════════════
   SCROLL REVEAL
   IntersectionObserver
═══════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Fire once only
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ═══════════════════
   COUNTER ANIMATION
   Counts up from 0 to target
═══════════════════ */
function animateCounter(el) {
  const target  = parseInt(el.getAttribute('data-target'), 10);
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = 1800; // ms
  const startTime = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutQuart(progress);
    const current  = Math.round(eased * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ═══════════════════
   HERO CARD STAGGER
   Delayed animations for hero product cards
═══════════════════ */
function initHeroCardStagger() {
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach((card, i) => {
    card.style.animationDelay = `${0.5 + i * 0.08}s`;
    card.style.opacity = '0';
    card.style.animation = `heroFadeUp 0.5s ease ${0.5 + i * 0.08}s both`;
  });
}

/* ═══════════════════
   ABOUT VALUE CARD STAGGER
═══════════════════ */
function initAboutCardStagger() {
  const valueCards = document.querySelectorAll('.about-value-card');
  valueCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });
}

/* ═══════════════════
   PRODUCT CARD STAGGER
   Applied when tab filter runs
═══════════════════ */
function staggerProductCards(cards) {
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 50}ms`;
  });
}

/* ═══════════════════
   SECTION ENTRY GLOW
   Gold border glow on section scroll
═══════════════════ */
function initSectionGlow() {
  const glowSections = document.querySelectorAll('.cert-card, .market-card, .testi-card');
  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = Math.random() * 200 + 'ms';
      }
    });
  }, { threshold: 0.1 });

  glowSections.forEach(el => glowObserver.observe(el));
}

/* ═══════════════════
   INIT ALL ANIMATIONS
═══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initHeroCardStagger();
  initAboutCardStagger();
  initSectionGlow();
});
