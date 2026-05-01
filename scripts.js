document.addEventListener('DOMContentLoaded', () => {
  // ── Hamburger Menü ve Tam Ekran Mobil Deneyim ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      
      // Menü açıkken arkaplanı kaydırmayı kilitle (App hissiyatı)
      if (navLinks.classList.contains('open')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Menüdeki bir linke tıklandığında menüyü zarifçe kapat
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  // ── Aktif Sayfa İşaretleyicisi ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Kaydırdıkça Gelen Siber Animasyonlar ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 }); // %15'i göründüğünde tetikle (daha pürüzsüz)

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // ── Daktilo Efekti (Typewriter) ──
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