document.addEventListener('DOMContentLoaded', () => {
  // ── Hamburger Menu ve Arkaplan Kilidi ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      
      if (navLinks.classList.contains('open')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Mobilde linke tıklayınca menüyü kapat
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        body.style.overflow = '';
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
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // ── SMOOTH PAGE TRANSITIONS (NATIVE APP HİSSİYATI) ──
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = this.getAttribute('target');
      
      // Dış linkse, yeni sekme ise veya sayfa içi çapa (#) ise karışma
      if (!href || href.startsWith('http') || href.startsWith('#') || target === '_blank') return;
      
      e.preventDefault(); // Sayfanın küt diye değişmesini engelle
      
      document.body.classList.add('fade-out'); // Çıkış animasyonunu (style.css'deki) başlat
      
      setTimeout(() => {
        window.location.href = href; // Animasyon bitince (400ms) yeni sayfaya yönlendir
      }, 400); 
    });
  });
});
// ── PARTICLES.JS (İNTERAKTİF SİBER AĞ ARKA PLANI) ──
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00d4ff" }, // Neon mavi düğümler
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#0a84ff", "opacity": 0.3, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" }, // Fare/parmak yaklaştıkça ağlar toplanır
          "onclick": { "enable": true, "mode": "push" }, // Tıklayınca yeni düğümler patlar
          "resize": true
        },
        "modes": {
          "grab": { "distance": 150, "line_linked": { "opacity": 0.8 } },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }