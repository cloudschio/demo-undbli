const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const musicBtn = document.getElementById('musicBtn');
const bgm = document.getElementById('bgm');
const openingScreen = document.getElementById('openingScreen');
const mainPage = document.getElementById('mainPage');
const openInvite = document.getElementById('openInvite');

const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  body.classList.add('dark');
  themeBtn.textContent = '☀';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  themeBtn.textContent = dark ? '☀' : '☾';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

openInvite.addEventListener('click', () => {
  openingScreen.style.display = 'none';
  mainPage.classList.remove('hidden');
  bgm.play().catch(() => {});
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
