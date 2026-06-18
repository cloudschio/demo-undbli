const bgm=document.getElementById('bgm');
const fab=document.getElementById('musicFab');
let started=false;

function toggleMusic(){
  if(!started){
    bgm.volume=.45;
    bgm.play().then(()=>{
      started=true;
      fab.classList.add('playing');
    }).catch(()=>{});
    return;
  }
  if(bgm.paused){
    bgm.play();
    fab.classList.add('playing');
  }else{
    bgm.pause();
    fab.classList.remove('playing');
  }
}

fab.addEventListener('click',toggleMusic);

document.getElementById('openBtn').addEventListener('click',()=>{
  document.getElementById('cover').style.display='none';
  const m=document.getElementById('mainContent');
  m.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
  if(!started){
    bgm.volume=.45;
    bgm.play().then(()=>{
      started=true;
      fab.classList.add('playing');
    }).catch(()=>{});
  }
});

function cd(){
  const t=new Date('2026-12-19T10:00:00');
  const n=new Date();
  const d=t-n;
  if(d<=0){
    document.getElementById('countdown').innerHTML='<div class="count-card" style="grid-column:1/-1"><span>🎉</span><small>Hari Bahagia</small></div>';
    return;
  }
  const x=[['days',86400000],['hours',3600000],['minutes',60000],['seconds',1000]];
  x.forEach(([id,v])=>document.getElementById(id).textContent=String(Math.floor((d%(v===86400000?999999999:v*24))/v)).padStart(2,'0'));
}
cd();
setInterval(cd,1000);

const wishes=[];
document.getElementById('wishForm').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('wishName').value.trim(),
        m=document.getElementById('wishMessage').value.trim();
  if(!n||!m)return;
  wishes.unshift({n,m});
  document.getElementById('wishesList').innerHTML=wishes.map(w=>`<div class="wish-item"><strong>💙 ${esc(w.n)}</strong><p>${esc(w.m)}</p></div>`).join('');
  e.target.reset();
});

function esc(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function copyAccount(){
  navigator.clipboard.writeText('901794598110').then(()=>{
    const b=document.querySelector('.btn-outline[onclick]');
    const t=b.textContent;
    b.textContent='Tersalin';
    setTimeout(()=>b.textContent=t,1800);
  });
}

const reveal=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in-view');
}),{threshold:.15});
reveal.forEach(el=>io.observe(el));
