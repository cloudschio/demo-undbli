const preload = document.getElementById('preload');
const openBtn = document.getElementById('openBtn');
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');

const targetDate = new Date('2026-07-20T11:00:00+08:00').getTime();

openBtn.addEventListener('click', async () => {
  preload.classList.add('hidden');
  try {
    await bgm.play();
    musicToggle.textContent = '❚❚';
  } catch (e) {}
});

musicToggle.addEventListener('click', async () => {
  if (bgm.paused) {
    try {
      await bgm.play();
      musicToggle.textContent = '❚❚';
    } catch (e) {}
  } else {
    bgm.pause();
    musicToggle.textContent = '♪';
  }
});

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = distance > 0 ? days : 0;
  document.getElementById('hours').textContent = distance > 0 ? hours : 0;
  document.getElementById('minutes').textContent = distance > 0 ? minutes : 0;
  document.getElementById('seconds').textContent = distance > 0 ? seconds : 0;
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
  item.innerHTML = `
    <strong>${name}${role ? ` <span style="color:#d9a441;font-weight:500;">(${role})</span>` : ''}</strong>
    <p>${message}</p>
  `;
  wishList.prepend(item);
  wishForm.reset();
});
