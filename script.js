const CONFIG = {
  title: "Undangan Pernikahan",
  couple: "Kadek & Putu",
  dateISO: "2026-08-20T10:00:00",
  eventDateText: "Sabtu, 20 Agustus 2026",
  backgroundImage: "https://images.unsplash.com/photo-1582719478250-6f2d0b3c1aaf?auto=format&fit=crop&w=1600&q=80",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2f6a1b6b27.mp3?filename=bali-traditional-ambience-7633.mp3"
};

document.getElementById("title").textContent = CONFIG.title;
document.getElementById("couple").textContent = CONFIG.couple;
document.getElementById("dateText").textContent = CONFIG.eventDateText;
document.querySelector(".bg").style.backgroundImage = `url('${CONFIG.backgroundImage}')`;
document.getElementById("bgMusic").src = CONFIG.musicUrl;

const target = new Date(CONFIG.dateISO).getTime();

function tick() {
  const now = Date.now();
  const diff = target - now;

  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));

  document.getElementById("d").textContent = String(d).padStart(2, "0");
  document.getElementById("h").textContent = String(h).padStart(2, "0");
  document.getElementById("m").textContent = String(m).padStart(2, "0");
  document.getElementById("s").textContent = String(s).padStart(2, "0");
}

tick();
setInterval(tick, 1000);

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("change", () => {
  if (musicToggle.checked) {
    music.play().catch(() => {});
  } else {
    music.pause();
  }
});

const openBtn = document.getElementById("openBtn");
openBtn.addEventListener("click", () => {
  document.querySelector(".card").scrollIntoView({ behavior: "smooth" });
  if (musicToggle.checked) music.play().catch(() => {});
});

const rsvpBtn = document.getElementById("rsvpBtn");
const rsvpSection = document.getElementById("rsvpSection");
rsvpBtn.addEventListener("click", () => {
  rsvpSection.style.display = rsvpSection.style.display === "none" ? "block" : "none";
});

const rsvpForm = document.getElementById("rsvpForm");
rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("rsvpName").value.trim();
  const phone = document.getElementById("rsvpPhone").value.trim();
  const attend = document.getElementById("rsvpAttend").value;
  if (!name || !attend) return;

  const list = JSON.parse(localStorage.getItem("rsvps") || "[]");
  list.unshift({ name, phone, attend, when: new Date().toISOString() });
  localStorage.setItem("rsvps", JSON.stringify(list));

  document.getElementById("rsvpMsg").textContent = "Terima kasih — Konfirmasi diterima.";
  rsvpForm.reset();
  setTimeout(() => document.getElementById("rsvpMsg").textContent = "", 3000);
});

const guestForm = document.getElementById("guestForm");
const guestListEl = document.getElementById("guestList");

function renderGuests() {
  const guests = JSON.parse(localStorage.getItem("guests") || "[]");
  guestListEl.innerHTML = guests.length
    ? guests
        .map(
          (g) =>
            `<div class="guest-item"><strong>${escapeHtml(g.name)}</strong><div style="font-size:13px;opacity:.9">${escapeHtml(
              g.msg
            )}</div><div style="font-size:11px;opacity:.6">${new Date(g.when).toLocaleString("id-ID")}</div></div>`
        )
        .join("")
    : '<div style="color:rgba(255,255,255,0.5)">Belum ada ucapan</div>';
}

guestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const msg = document.getElementById("guestMsg").value.trim();
  if (!name || !msg) return;

  const list = JSON.parse(localStorage.getItem("guests") || "[]");
  list.unshift({ name, msg, when: new Date().toISOString() });
  localStorage.setItem("guests", JSON.stringify(list));

  guestForm.reset();
  renderGuests();
});

renderGuests();

function escapeHtml(s) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
