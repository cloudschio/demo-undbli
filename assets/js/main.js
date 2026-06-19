const target = new Date("2026-12-19T10:00:00+07:00").getTime();
const el = {
  d: document.getElementById("d"),
  h: document.getElementById("h"),
  m: document.getElementById("m"),
  s: document.getElementById("s"),
};
function tick(){
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  el.d.textContent = d;
  el.h.textContent = h;
  el.m.textContent = m;
  el.s.textContent = s;
}
tick();
setInterval(tick, 1000);
