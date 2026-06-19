const target = new Date("2026-12-19T10:00:00+07:00").getTime();
const el = { d: document.getElementById("d"), h: document.getElementById("h"), m: document.getElementById("m"), s: document.getElementById("s") };

function tick(){
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  el.d.textContent = d;
  el.h.textContent = h;
  el.m.textContent = m;
  el.s.textContent = s;
}
tick();
setInterval(tick, 1000);

const btn = document.getElementById('waBtn');
btn?.addEventListener('click', () => {
  const nama = document.getElementById('nama').value.trim() || 'Tamu';
  const pesan = document.getElementById('pesan').value.trim() || 'InsyaAllah saya hadir.';
  const jumlah = document.getElementById('jumlah').value.trim() || '1';
  const text = `Halo, saya ${nama}.%0A%0A${pesan}%0A%0AJumlah hadir: ${jumlah}`;
  window.open(`https://wa.me/62881081912121?text=${text}`, '_blank');
});

const openBtn = document.getElementById('openInvite');
const screen = document.getElementById('openingScreen');
openBtn?.addEventListener('click', () => {
  screen.style.opacity = '0';
  screen.style.pointerEvents = 'none';
  screen.style.transition = 'opacity .45s ease';
  setTimeout(() => screen.remove(), 500);
});

const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;
const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/25/audio_2ef93ce35f.mp3?filename=soft-piano-140607.mp3');
audio.loop = true;
audio.volume = 0.28;
musicToggle?.addEventListener('click', async () => {
  try {
    if (!isPlaying) {
      await audio.play();
      isPlaying = true;
      musicToggle.textContent = 'Pause Music';
    } else {
      audio.pause();
      isPlaying = false;
      musicToggle.textContent = 'Play Music';
    }
  } catch (e) {
    console.log(e);
  }
});

window.addEventListener('load', () => {
  const announce = document.createElement('div');
  announce.className = 'modal-announce show';
  announce.innerHTML = '<strong>Selamat datang</strong><div style="margin-top:6px;color:#666">Klik Buka Undangan untuk mulai melihat detail acara.</div>';
  document.body.appendChild(announce);
  setTimeout(() => announce.classList.remove('show'), 3800);
});

const track = document.getElementById('sliderTrack');
const slides = track ? Array.from(track.children) : [];
let index = 0;

function showSlide(i){
  if(!track || !slides.length) return;
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  track.style.transition = 'transform .45s ease';
}

document.getElementById('prevSlide')?.addEventListener('click', () => showSlide(index - 1));
document.getElementById('nextSlide')?.addEventListener('click', () => showSlide(index + 1));
setInterval(() => showSlide(index + 1), 4500);

document.querySelectorAll('.top-nav a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('openingScreen')?.remove();
}));
