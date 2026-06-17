const loader = document.getElementById('loader');
const openInvitation = document.getElementById('openInvitation');
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

const targetDate = new Date('2026-07-20T08:00:00+08:00').getTime();

openInvitation.addEventListener('click', () => {
  loader.style.display = 'none';
});

function updateCountdown() {
  const now = new Date().getTime();
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

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) return;

  const item = document.createElement('div');
  item.className = 'wish-item';
  item.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
  wishList.prepend(item);

  wishForm.reset();
});
