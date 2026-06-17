const loader = document.getElementById('loader');
const openBtn = document.getElementById('openBtn');
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
const copyBtns = document.querySelectorAll('.copy-btn');
const targetDate = new Date('2026-07-20T11:00:00+08:00').getTime();

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
