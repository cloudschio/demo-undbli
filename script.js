const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const musicBtn = document.getElementById('musicBtn');
const bgm = document.getElementById('bgm');
const openingScreen = document.getElementById('openingScreen');
const mainPage = document.getElementById('mainPage');
const openInvite = document.getElementById('openInvite');
const progressBar = document.getElementById('progressBar');
const titleAnim = document.getElementById('titleAnim');

const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  body.classList.add('dark');
  themeBtn.textContent = '☀';
}

const typeText = (el, text, delay = 80) => {
  el.textContent = '';
  let i = 0;
  const run = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(run, delay);
    }
  };
  run();
};

typeText(titleAnim, 'Adam & Sari', 100);

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  themeBtn.textContent = dark ? '☀' : '☾';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

openInvite.addEventListener('click', () => {
  openingScreen.style.opacity = '0';
  openingScreen.style.pointerEvents = 'none';
  mainPage.classList.remove('hidden');
  bgm.play().catch(() => {});
  setTimeout(() => openingScreen.style.display = 'none', 500);
});

musicBtn.addEventListener('click', async () => {
  if (bgm.paused) {
    try {
      await bgm.play();
      musicBtn.textContent = '❚❚';
    } catch (e) {}
  } else {
    bgm.pause();
    musicBtn.textContent = '♫';
  }
});

const target = new Date('2026-06-18T08:00:00+07:00').getTime();

setInterval(() => {
  const d = Math.max(target - Date.now(), 0);
  days.textContent = String(Math.floor(d / 86400000)).padStart(2, '0');
  hours.textContent = String(Math.floor((d % 86400000) / 3600000)).padStart(2, '0');
  minutes.textContent = String(Math.floor((d % 3600000) / 60000)).padStart(2, '0');
  seconds.textContent = String(Math.floor((d % 60000) / 1000)).padStart(2, '0');
}, 1000);

const modal = document.getElementById('qrisModal');
const open = () => modal.classList.add('show');
const close = () => modal.classList.remove('show');

openQris.addEventListener('click', open);
openQris2.addEventListener('click', open);
closeQris.addEventListener('click', close);
modal.addEventListener('click', e => {
  if (e.target === modal) close();
});

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = rsvpName.value.trim();
  const status = rsvpStatus.value;
  const guest = rsvpGuest.value || '1';
  const message = rsvpMessage.value.trim();
  const text = `Halo, saya ${name}. Saya ingin konfirmasi kehadiran: ${status}. Jumlah tamu: ${guest}. ${message ? 'Pesan: ' + message : ''} Pada undangan pernikahan Adam & Sari.`;
  window.open('https://wa.me/6281234567890?text=' + encodeURIComponent(text), '_blank');
});

const update = () => {
  const max = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
};
window.addEventListener('scroll', update);
update();

const cards = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  cards.forEach(el => {
    const rate = parseFloat(el.dataset.parallax || '0.05');
    el.style.transform = `translateY(${sc * rate * 0.08}px)`;
  });
});
