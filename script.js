// ===== OPEN INVITATION =====
document.getElementById('openBtn').addEventListener('click', function () {
  document.getElementById('cover').style.display = 'none';
  const main = document.getElementById('mainContent');
  main.classList.remove('hidden');
  main.style.animation = 'fadeInUp 0.8s ease both';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COUNTDOWN =====
function updateCountdown() {
  const target = new Date('2026-12-19T10:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<div class="countdown-box" style="grid-column:1/-1"><span>🎉</span><small>Hari Bahagia!</small></div>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== UCAPAN / WISHES =====
const wishes = [];

document.getElementById('wishForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name    = document.getElementById('wishName').value.trim();
  const message = document.getElementById('wishMessage').value.trim();
  if (!name || !message) return;

  wishes.unshift({ name, message });
  renderWishes();
  this.reset();
});

function renderWishes() {
  const list = document.getElementById('wishesList');
  list.innerHTML = wishes.map(w => `
    <div class="wish-item">
      <strong>💙 ${escapeHtml(w.name)}</strong>
      <p>${escapeHtml(w.message)}</p>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===== COPY ACCOUNT NUMBER =====
function copyAccount() {
  navigator.clipboard.writeText('901794598110').then(() => {
    const btn = document.querySelector('.btn-copy');
    const original = btn.textContent;
    btn.textContent = '✅ Tersalin!';
    setTimeout(() => (btn.textContent = original), 2000);
  });
}

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.7s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(sec => observer.observe(sec));
