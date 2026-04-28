document.addEventListener('DOMContentLoaded', () => {
  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Animate on scroll ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // ── Typewriter effect ──
  const typewriterEls = document.querySelectorAll('[data-typewriter]');
  typewriterEls.forEach(el => {
    const text = el.getAttribute('data-typewriter');
    let i = 0;
    el.textContent = '';
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 60);
  });
});
