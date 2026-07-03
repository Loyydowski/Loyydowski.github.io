/* ============================================
   PORTFOLIO JS — Bartosz Kuba
   ============================================ */

// ── Navigation scroll effect ──────────────────
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile menu toggle ────────────────────────
const menuBtn    = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ── Skill bars animation (IntersectionObserver) ──
const skillFills = document.querySelectorAll('.skill-item__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Fade-in-up for sections ───────────────────
const sections = document.querySelectorAll('.section, .hero__content, .hero__visual');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 0.05}s`;
      entry.target.classList.add('fade-in-up');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(s => sectionObserver.observe(s));

// ── Active nav link on scroll ─────────────────
const navLinks = document.querySelectorAll('.nav__link');
const sectionIds = ['about', 'skills', 'projects', 'contact'];

window.addEventListener('scroll', () => {
  let current = '';
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) {
      current = id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--clr-accent)';
    }
  });
}, { passive: true });

// ── Typing effect in hero code block ─────────
(function typingEffect() {
  const codeEl = document.querySelector('.hero__code code');
  if (!codeEl) return;

  const finalHTML = codeEl.innerHTML;
  codeEl.innerHTML = '';

  // Strip HTML tags for character-by-character typing
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = finalHTML;
  const plainText = tempDiv.textContent;

  let i = 0;
  function type() {
    if (i <= plainText.length) {
      // For performance, reveal the full styled HTML gradually by character count
      // We approximate by showing chars of plain text
      const fraction = i / plainText.length;
      const charCount = Math.floor(fraction * finalHTML.length);
      // Find safe HTML boundary (don't cut mid-tag)
      let safeEnd = charCount;
      if (safeEnd < finalHTML.length) {
        const nextClose = finalHTML.indexOf('>', safeEnd);
        const nextOpen  = finalHTML.indexOf('<', safeEnd);
        if (nextOpen !== -1 && nextOpen < safeEnd) {
          safeEnd = nextClose + 1;
        }
      }
      codeEl.innerHTML = finalHTML.slice(0, safeEnd) + '<span class="cursor">|</span>';
      i++;
      setTimeout(type, 18);
    } else {
      codeEl.innerHTML = finalHTML;
    }
  }

  // Start typing after a short delay
  setTimeout(type, 800);
})();

// ── Cursor blink style ────────────────────────
const style = document.createElement('style');
style.textContent = `
  .cursor {
    display: inline-block;
    color: var(--clr-accent);
    font-weight: 300;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// ── Smooth appear for hero elements ──────────
(function heroAppear() {
  const items = [
    '.hero__badge',
    '.hero__title',
    '.hero__subtitle',
    '.hero__description',
    '.hero__cta',
    '.hero__socials',
    '.hero__card',
    '.hero__scroll-hint'
  ];

  items.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  });
})();
