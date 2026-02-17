/* ═══════════════════════════════════════════════
   MVRP EXPORTS – PRODUCTS JAVASCRIPT
   Category filter tabs, product card interactions
═══════════════════════════════════════════════ */

/* ═══════════════════
   PRODUCT FILTER
   Filter cards by category tab
═══════════════════ */
function filterProducts(category, clickedBtn) {
  const allCards   = document.querySelectorAll('.product-card');
  const allTabs    = document.querySelectorAll('.tab-btn');

  // Update active tab
  allTabs.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  if (clickedBtn) {
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');
  }

  // Filter cards
  const visibleCards = [];
  allCards.forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    const match   = (category === 'all' || cardCat === category);

    card.classList.remove('visible');
    card.style.animationDelay = '';

    if (match) {
      visibleCards.push(card);
    }
  });

  // Show matching cards with staggered animation
  visibleCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
      card.style.animationDelay = `${i * 45}ms`;
    }, 10);
  });

  // Update result count (optional feedback)
  updateProductCount(visibleCards.length);
}

/* ── Show product count ── */
function updateProductCount(count) {
  // Optional: show count somewhere
  // Could add a counter badge near tabs
}

/* ═══════════════════
   PRODUCT CARD HOVER
   Track mouse for parallax micro-effect
═══════════════════ */
function initProductCardParallax() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX  = (e.clientX - centerX) / rect.width;
      const deltaY  = (e.clientY - centerY) / rect.height;

      const emoji = card.querySelector('.product-emoji');
      if (emoji) {
        emoji.style.transform = `translate(${deltaX * 6}px, ${deltaY * 6}px) scale(1.05)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const emoji = card.querySelector('.product-emoji');
      if (emoji) {
        emoji.style.transform = '';
      }
    });
  });
}

/* ═══════════════════
   INQUIRY LINK CLICK
   Populate product in form when clicking card inquiry
═══════════════════ */
function initInquiryLinks() {
  document.querySelectorAll('.inquiry-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Get product name from card
      const card        = btn.closest('.product-card');
      const productName = card ? card.querySelector('h3').textContent : '';
      const selectEl   = document.getElementById('fproduct');

      if (selectEl && productName) {
        // Find matching option
        Array.from(selectEl.options).forEach(opt => {
          if (opt.text.toLowerCase().includes(productName.toLowerCase())) {
            selectEl.value = opt.value;
          }
        });
      }
    });
  });
}

/* ═══════════════════
   INIT
═══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Show all products on load
  filterProducts('all', document.querySelector('.tab-btn'));
  initProductCardParallax();
  initInquiryLinks();
});
