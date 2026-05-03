document.addEventListener('DOMContentLoaded', () => {
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

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = this.getAttribute('target');
      
      if (!href || href.startsWith('http') || href.startsWith('#') || target === '_blank' || this.hasAttribute('onclick') || this.id === 'radarButton') return;
      
      e.preventDefault(); 
      document.body.classList.add('fade-out'); 
      setTimeout(() => { window.location.href = href; }, 400); 
    });
  });

  // ── SİBER DUYURU MODALI KONTROLLERİ ──
  const radarButton = document.getElementById('radarButton');
  const duyuruModal = document.getElementById('duyuruModal');
  const closeModal = document.getElementById('closeModal');

  if (radarButton && duyuruModal && closeModal) {
    radarButton.addEventListener('click', (e) => {
      e.preventDefault();
      duyuruModal.classList.add('show');
      document.body.style.overflow = 'hidden'; 
    });

    closeModal.addEventListener('click', () => {
      duyuruModal.classList.remove('show');
      document.body.style.overflow = '';
    });

    duyuruModal.addEventListener('click', (e) => {
      if (e.target === duyuruModal) {
        duyuruModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
});

// ── LAZER ARKA PLANI — tsParticles ──
// tsParticles, eski particles.js'in güncel versiyonu.
// clientY kullandığı için scroll sorunu yaşanmaz.
if (document.getElementById('particles-js') && typeof tsParticles !== 'undefined') {
  tsParticles.load('particles-js', {
    fpsLimit: 60,
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: '#00d4ff' },
      shape: { type: 'circle' },
      opacity: { value: 0.3 },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 150,
        color: '#0a84ff',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        outModes: { default: 'out' }
      }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 }
      }
    },
    detectRetina: true
  });
}