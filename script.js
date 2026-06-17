const loader = document.getElementById('loader');
const openBtn = document.getElementById('openBtn');
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
const copyBtns = document.querySelectorAll('.copy-btn');
const targetDate = new Date('2026-07-20T11:00:00+08:00').getTime();
const progressFill = document.getElementById('progressFill');
const cursorSparkle = document.getElementById('cursorSparkle');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const bottomLinks = document.querySelectorAll('.bottom-nav a');
const sections = ['details','location','gallery','rsvp'].map(id => document.getElementById(id)).filter(Boolean);

function createParticle(){
  const p = document.createElement('span');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
  p.style.setProperty('--size', (Math.random() * 6 + 4) + 'px');
  p.style.setProperty('--dur', (Math.random() * 5 + 6) + 's');
  p.style.opacity = (Math.random() * 0.5 + 0.35).toFixed(2);
  p.style.animationDelay = (Math.random() * 4) + 's';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 12000);
}

function startParticles(){
  for(let i=0;i<18;i++) setTimeout(createParticle, i*180);
  setInterval(createParticle, 900);
}

openBtn.addEventListener('click', async () => {
  loader.classList.add('hidden');
  startParticles();
  try { await bgm.play(); musicToggle.textContent = '❚❚'; } catch (e) {}
});

musicToggle.addEventListener('click', async () => {
  if (bgm.paused) {
    try { await bgm.play(); musicToggle.textContent = '❚❚'; } catch (e) {}
  } else {
    bgm.pause();
    musicToggle.textContent = '♪';
  }
});

copyBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = 'Tersalin';
      setTimeout(() => btn.textContent = old, 1500);
    } catch (e) {
      alert('Gagal menyalin teks');
    }
  });
});

function updateCountdown(){
  const d = targetDate - Date.now();
  const days = Math.floor(d / (1000*60*60*24));
  const hours = Math.floor((d % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((d % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((d % (1000*60)) / 1000);
  document.getElementById('days').textContent = d > 0 ? days : 0;
  document.getElementById('hours').textContent = d > 0 ? hours : 0;
  document.getElementById('minutes').textContent = d > 0 ? minutes : 0;
  document.getElementById('seconds').textContent = d > 0 ? seconds : 0;
}
setInterval(updateCountdown, 1000);
updateCountdown();

wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const role = document.getElementById('guestRole').value.trim();
  const message = document.getElementById('guestMessage').value.trim();
  if (!name || !message) return;
  const item = document.createElement('div');
  item.className = 'wish-item';
  item.innerHTML = `<strong>${name}${role ? ` <span style="color:#d9a441;font-weight:500;">(${role})</span>` : ''}</strong><p>${message}</p>`;
  wishList.prepend(item);
  wishForm.reset();
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:.15});
revealEls.forEach(el => io.observe(el));

document.querySelectorAll('a, button, .gift-card, .event-card, .profile-card, .gallery-item').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.remove('click-pop');
    void el.offsetWidth;
    el.classList.add('click-pop');
  });
});

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.remove('hidden');
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.add('hidden'); });

window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.2;
  const layer = document.querySelector('.parallax-layer');
  if (layer) layer.style.transform = `translateY(${y}px)`;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = percent + '%';

  let active = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) active = sec.id;
  });
  bottomLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + active);
  });
});

window.addEventListener('mousemove', (e) => {
  cursorSparkle.style.left = e.clientX + 'px';
  cursorSparkle.style.top = e.clientY + 'px';
  cursorSparkle.style.opacity = '1';
});
window.addEventListener('mouseleave', () => {
  cursorSparkle.style.opacity = '0';
});
