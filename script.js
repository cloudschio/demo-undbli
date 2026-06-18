document.getElementById('openBtn').addEventListener('click',()=>{
  document.getElementById('cover').style.display='none';
  const m=document.getElementById('mainContent');
  m.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'})
});

function cd(){
  const t=new Date('2026-12-19T10:00:00');
  const n=new Date();
  const d=t-n;
  if(d<=0){
    document.getElementById('countdown').innerHTML='<div class="count-box glass" style="grid-column:1/-1"><span>🎉</span><small>Hari Bahagia</small></div>';
    return
  }
  const x=[['days',86400000],['hours',3600000],['minutes',60000],['seconds',1000]];
  x.forEach(([id,v])=>document.getElementById(id).textContent=String(Math.floor((d% (v===86400000?999999999:v*24))/v)).padStart(2,'0'))
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
  e.target.reset()
});

function esc(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function copyAccount(){
  navigator.clipboard.writeText('901794598110').then(()=>{
    const b=document.querySelector('.qris-copy');
    const t=b.textContent;
    b.textContent='Tersalin';
    setTimeout(()=>b.textContent=t,1800)
  })
}
