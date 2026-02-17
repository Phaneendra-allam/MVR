/* ═══════════════════════════════════════════════
   MVRP EXPORTS – MAIN JAVASCRIPT
   App initialization, utilities, global features
═══════════════════════════════════════════════ */

/* ═══════════════════
   APP INIT
═══════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  console.log('%c🌾 MVRP Exports – Premium Agricultural Exports', [
    'color: #C8A951',
    'font-size: 14px',
    'font-weight: bold',
    'padding: 8px 12px',
    'background: #0B1F3A',
    'border-radius: 4px'
  ].join(';'));

  console.log('%cMana Vooru Raitulu Panta | exports@mvrpexports.com', [
    'color: #8a9ab5',
    'font-size: 11px'
  ].join(';'));

  initPageFeatures();
});

/* ═══════════════════
   PAGE FEATURES
═══════════════════ */
function initPageFeatures() {
  initLazyImages();
  initTooltips();
  initCertCardFlip();
  initProductSearch();
  trackWhatsAppClick();
  initAccessibility();
}

/* ═══════════════════
   LAZY IMAGES
   Load images only when visible
═══════════════════ */
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imgObserver.observe(img));
}

/* ═══════════════════
   TOOLTIPS
   Simple hover tooltip system
═══════════════════ */
function initTooltips() {
  const tooltipEls = document.querySelectorAll('[data-tooltip]');

  tooltipEls.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      showTooltip(e.currentTarget, e.currentTarget.dataset.tooltip);
    });

    el.addEventListener('mouseleave', () => {
      hideTooltip();
    });
  });
}

let activeTooltip = null;

function showTooltip(el, text) {
  hideTooltip();
  const tip = document.createElement('div');
  tip.className = 'global-tooltip';
  tip.textContent = text;
  tip.style.cssText = `
    position: fixed;
    background: #0B1F3A;
    border: 1px solid rgba(200,169,81,0.3);
    color: #C8A951;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 6px;
    pointer-events: none;
    z-index: 9999;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    font-family: 'Outfit', sans-serif;
  `;

  document.body.appendChild(tip);

  const rect    = el.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  tip.style.top  = `${rect.top - tipRect.height - 8}px`;
  tip.style.left = `${rect.left + (rect.width / 2) - (tipRect.width / 2)}px`;

  activeTooltip = tip;
}

function hideTooltip() {
  if (activeTooltip) {
    activeTooltip.remove();
    activeTooltip = null;
  }
}

/* ═══════════════════
   CERT CARD FLIP
   Click to flip cert card for more info
═══════════════════ */
function initCertCardFlip() {
  // Optional enhancement — add 'flipped' class on click
  document.querySelectorAll('.cert-card').forEach(card => {
    card.style.cursor = 'pointer';
  });
}

/* ═══════════════════
   PRODUCT SEARCH
   Quick keyboard shortcut to filter products
═══════════════════ */
function initProductSearch() {
  // Press '/' to focus first tab
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !isInputFocused()) {
      e.preventDefault();
      const firstTab = document.querySelector('.tab-btn');
      if (firstTab) firstTab.focus();
    }
  });
}

function isInputFocused() {
  const tag = document.activeElement?.tagName;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
}

/* ═══════════════════
   WHATSAPP TRACKING
   Log WhatsApp button click
═══════════════════ */
function trackWhatsAppClick() {
  const waBtn = document.querySelector('.whatsapp-float');
  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    console.log('📱 WhatsApp contact initiated');
    // In Phase 2: send analytics event
    // gtag('event', 'whatsapp_click', { event_category: 'contact' });
  });
}

/* ═══════════════════
   ACCESSIBILITY
   Keyboard & screen reader improvements
═══════════════════ */
function initAccessibility() {
  // Skip to content link (add if missing)
  addSkipLink();

  // Focus trap for mobile menu
  initFocusTrap();

  // Announce page changes for SPA-like behavior
  initAnnouncer();
}

function addSkipLink() {
  if (document.getElementById('skip-link')) return;

  const skip = document.createElement('a');
  skip.id   = 'skip-link';
  skip.href = '#home';
  skip.textContent = 'Skip to main content';
  skip.style.cssText = `
    position: absolute;
    top: -100px;
    left: 16px;
    background: var(--gold, #C8A951);
    color: var(--navy, #0B1F3A);
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    z-index: 9999;
    transition: top 0.2s ease;
    text-decoration: none;
  `;

  skip.addEventListener('focus', () => skip.style.top = '16px');
  skip.addEventListener('blur',  () => skip.style.top = '-100px');

  document.body.insertBefore(skip, document.body.firstChild);
}

function initFocusTrap() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;

  menu.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('active')) return;
    if (e.key !== 'Tab') return;

    const focusable = menu.querySelectorAll('a, button');
    const first     = focusable[0];
    const last      = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function initAnnouncer() {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.cssText = `
    position: absolute;
    width: 1px; height: 1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap;
  `;
  document.body.appendChild(announcer);
  window._announce = (msg) => { announcer.textContent = msg; };
}

/* ═══════════════════
   UTILITY FUNCTIONS
   Reusable helpers
═══════════════════ */
const Utils = {

  // Debounce
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Throttle
  throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right  <= (window.innerWidth  || document.documentElement.clientWidth)
    );
  },

  // Scroll to element
  scrollTo(selector, offset = 80) {
    const el = document.querySelector(selector);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

};

// Make utils globally available
window.MVRPUtils = Utils;

/* ═══════════════════
   PERFORMANCE
   Optimize scroll listeners
═══════════════════ */
const debouncedResize = Utils.debounce(() => {
  // Re-run any layout-dependent calculations on resize
}, 250);

window.addEventListener('resize', debouncedResize, { passive: true });
