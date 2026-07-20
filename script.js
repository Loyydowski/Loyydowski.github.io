const nav = document.getElementById('main-nav');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 24) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

const typingQuoteEl = document.getElementById('typing-quote');
if (typingQuoteEl) {
  const quoteText = "Let's build something preem, shall we?";
  let charIndex = 0;
  
  function type() {
    if (charIndex <= quoteText.length) {
      typingQuoteEl.innerHTML = quoteText.slice(0, charIndex) + '<span class="typing-cursor"></span>';
      charIndex++;
      setTimeout(type, 50 + Math.random() * 50);
    } else {
      typingQuoteEl.innerHTML = quoteText + '<span class="typing-cursor"></span>';
    }
  }
  
  setTimeout(type, 400);
}
