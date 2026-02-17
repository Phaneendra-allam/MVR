/* ═══════════════════════════════════════════════
   MVRP EXPORTS – NAVIGATION JAVASCRIPT
   Sticky nav, mobile menu, active links, back-to-top
═══════════════════════════════════════════════ */

/* ── Elements ── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const backToTop   = document.getElementById('backToTop');
const navLinks    = document.querySelectorAll('.nav-links a');

/* ═══════════════════
   STICKY NAV
═══════════════════ */
function handleNavScroll() {
  const scrollY = window.scrollY;

  // Add scrolled class for darker bg
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button visibility
  if (backToTop) {
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}

/* ═══════════════════
   MOBILE MENU
═══════════════════ */
function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen.toString());

  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('active') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    closeMenu();
  }
});

/* ═══════════════════
   ACTIVE NAV LINKS
   (highlight current section)
═══════════════════ */
function updateActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  let activeId = null;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      activeId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (activeId && link.getAttribute('href') === `#${activeId}`) {
      link.classList.add('active');
    }
  });
}

/* ═══════════════════
   SMOOTH SCROLL
   (for anchor links)
═══════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar ? navbar.offsetHeight : 72;
    const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });
  });
});

/* ═══════════════════
   BACK TO TOP
═══════════════════ */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════
   EVENT LISTENERS
═══════════════════ */
window.addEventListener('scroll', () => {
  handleNavScroll();
  updateActiveNavLink();
}, { passive: true });

// Initial call on load
handleNavScroll();
updateActiveNavLink();
