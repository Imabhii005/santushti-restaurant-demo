/* ══════════════════════════════════════════════
   The Royal RESTAURANT — script.js
   Premium Luxury Spiritual Dining · Vrindavan
══════════════════════════════════════════════ */

'use strict';

/* ── LOADER ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
  }, 1800);
});

/* ── AOS INIT ── */
function initAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      once: true,
      offset: 80,
    });
  }
  initGSAP();
}

/* ── GSAP ── */
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero title stagger
  gsap.from('.hero-title', {
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Floating OM glyphs
  gsap.to('.loader-om', {
    y: -6,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  // Parallax hero bg on scroll
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const bg = document.getElementById('heroBg');
      if (bg) {
        bg.style.transform = `scale(1.08) translateY(${self.progress * 80}px)`;
      }
    },
  });

  // Stat counter animation
  ScrollTrigger.create({
    trigger: '.stats-grid',
    start: 'top 80%',
    once: true,
    onEnter: animateCounters,
  });

  // Section reveal
  gsap.utils.toArray('.section-eyebrow').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      opacity: 0,
      x: -20,
      duration: 0.7,
      ease: 'power2.out',
    });
  });
}

/* ── PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift;
      p.alpha -= 0.0008;
      if (p.y < -10 || p.alpha <= 0) Object.assign(p, createParticle(), { y: H + 10 });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAVBAR SCROLL ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── HAMBURGER MENU ── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

/* ── MAGNETIC BUTTONS ── */
(function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ── ANIMATED COUNTERS ── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach((el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('en-IN');
    }, step);
  });
}

/* ── MENU DATA ── */
const menuData = {
  veg: [
    { icon: '🥘', name: 'Paneer Lababdar', desc: 'Rich tomato-cream gravy', price: '₹180' },
    { icon: '🍆', name: 'Baingan Bharta', desc: 'Flame-roasted eggplant', price: '₹140' },
    { icon: '🫘', name: 'Dal Makhani', desc: 'Slow-cooked black lentils', price: '₹130' },
    { icon: '🌽', name: 'Kadai Sabzi', desc: 'Seasonal vegetables, kadai masala', price: '₹150' },
    { icon: '🥜', name: 'Makhana Curry', desc: 'Fox nuts in cashew sauce', price: '₹160' },
    { icon: '🧀', name: 'Shahi Paneer', desc: 'Cottage cheese in royal gravy', price: '₹190' },
  ],
  thali: [
    { icon: '🍽️', name: 'Vrindavan Special', desc: 'Dal · Sabzi · Rice · Puri · Kheer', price: '₹280' },
    { icon: '👑', name: 'Royal Thali', desc: '12 items · Premium dishes', price: '₹380' },
    { icon: '🌿', name: 'Satvik Thali', desc: 'Ayurvedic · No onion/garlic', price: '₹240' },
    { icon: '🙏', name: 'Prasad Thali', desc: 'Festival special · Blessed items', price: '₹200' },
    { icon: '🏺', name: 'Mathura Thali', desc: 'Regional Braj favorites', price: '₹260' },
    { icon: '🌸', name: 'Mini Thali', desc: 'Perfect for one · 6 items', price: '₹160' },
  ],
  south: [
    { icon: '🥞', name: 'Masala Dosa', desc: 'Crispy rice crepe, spiced potato', price: '₹110' },
    { icon: '🍲', name: 'Idli Sambar', desc: 'Steamed rice cakes, lentil soup', price: '₹90' },
    { icon: '🥚', name: 'Uttapam', desc: 'Thick rice pancake, toppings', price: '₹100' },
    { icon: '🌿', name: 'Medu Vada', desc: 'Crispy lentil donuts', price: '₹80' },
    { icon: '🍛', name: 'Pongal', desc: 'Rice & moong dal, ghee tempered', price: '₹95' },
    { icon: '🥣', name: 'Rava Upma', desc: 'Semolina with vegetables & cashews', price: '₹85' },
  ],
  desserts: [
    { icon: '🍮', name: 'Mathura Peda Kheer', desc: 'Slow-cooked milk with peda', price: '₹95' },
    { icon: '🍯', name: 'Gulab Jamun', desc: 'Soft milk dumplings in rose syrup', price: '₹60' },
    { icon: '🍨', name: 'Rabri Kulfi', desc: 'Traditional saffron frozen dessert', price: '₹85' },
    { icon: '🍚', name: 'Gajar Halwa', desc: 'Carrot pudding with dry fruits', price: '₹75' },
    { icon: '🌙', name: 'Malpua', desc: 'Pan-fried sweet pancake, rabri', price: '₹70' },
    { icon: '✨', name: 'Rasmalai', desc: 'Soft cheese patties in saffron milk', price: '₹90' },
  ],
  beverages: [
    { icon: '🥛', name: 'Thandai Special', desc: 'Rose · Kesar · Badam', price: '₹80' },
    { icon: '🌹', name: 'Rose Lassi', desc: 'Thick yogurt, rose petals', price: '₹60' },
    { icon: '☕', name: 'Masala Chai', desc: 'Spiced Indian milk tea', price: '₹30' },
    { icon: '🌿', name: 'Tulsi Green Tea', desc: 'Holy basil infusion', price: '₹40' },
    { icon: '🍋', name: 'Nimbu Soda', desc: 'Fresh lime, black salt', price: '₹35' },
    { icon: '🥭', name: 'Aam Panna', desc: 'Raw mango cooler', price: '₹45' },
  ],
};

/* ── MENU TABS ── */
(function initMenu() {
  const tabs = document.querySelectorAll('.menu-tab');
  const grid = document.getElementById('menuGrid');
  if (!tabs.length || !grid) return;

  function renderMenu(cat) {
    const items = menuData[cat] || [];
    grid.innerHTML = '';
    items.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'menu-item glass-card';
      div.innerHTML = `
        <span class="menu-item-icon">${item.icon}</span>
        <div class="menu-item-body">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <span class="menu-item-dot"></span>
          <span class="menu-item-price">${item.price}</span>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.getAttribute('data-cat'));
    });
  });

  // Initial render
  renderMenu('veg');
})();

/* ── RESERVATION FORM ── */
(function initReservation() {
  const btn = document.getElementById('reserveBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name = document.getElementById('resName')?.value?.trim();
    const phone = document.getElementById('resPhone')?.value?.trim();
    const date = document.getElementById('resDate')?.value;
    const time = document.getElementById('resTime')?.value;
    const guests = document.getElementById('resGuests')?.value;

    if (!name || !phone) {
      alert('Please enter your name and phone number to proceed.');
      return;
    }

    const msg = encodeURIComponent(
      `🙏 Namaste! I'd like to reserve a table at The Royal Restaurant, Vrindavan.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Date:* ${date || 'Flexible'}\n` +
      `*Time:* ${time || 'Flexible'}\n` +
      `*Guests:* ${guests || '2'}\n\n` +
      `Jai Shri Radhe Krishna! 🌸`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');

    const success = document.getElementById('resSuccess');
    if (success) success.style.display = 'flex';
  });

  // Set min date
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
  const quickDate = document.getElementById('quickDate');
  if (quickDate) {
    const today = new Date().toISOString().split('T')[0];
    quickDate.min = today;
    quickDate.value = today;
  }
})();

/* ── GALLERY LIGHTBOX ── */
const lightboxImages = [
  'assets/images/prem-mandir.jpg',
  'assets/images/banke-bihari.webp',
];

window.openLightbox = function (idx) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  if (lightboxImages[idx]) {
    img.src = lightboxImages[idx];
    img.alt = idx === 0 ? 'Prem Mandir Vrindavan' : 'Shri Banke Bihari Ji';
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function () {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.closeLightbox();
});
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) window.closeLightbox();
});

/* ── SMOOTH ACTIVE NAV ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach((link) => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold-light)' : '';
    });
  }, { passive: true });
})();

/* ── SCROLL TO TOP ON LOGO CLICK ── */
document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── AMBIENT GLOW CURSOR TRAIL (desktop only) ── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px;
    border-radius:50%;
    background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
    pointer-events:none; z-index:0; transform:translate(-50%,-50%);
    transition: transform 0.15s ease, left 0.08s linear, top 0.08s linear;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();
