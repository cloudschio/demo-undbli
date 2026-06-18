const target = new Date('2026-07-20T08:00:00+07:00').getTime();
const ids = ['d','h','m','s'];
setInterval(()=>{const now=new Date().getTime();const diff=Math.max(0,target-now);const d=Math.floor(diff/86400000),h=Math.floor(diff%86400000/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);[d,h,m,s].forEach((v,i)=>document.getElementById(ids[i]).textContent=String(v).padStart(2,'0'));},1000);
const bgm=document.getElementById('bgm'), btn=document.getElementById('musicBtn');
btn.onclick=async()=>{try{if(bgm.paused){await bgm.play();btn.textContent='Pause Musik'}else{bgm.pause();btn.textContent='Putar Musik'}}catch(e){alert('Browser memblokir autoplay. Klik lagi untuk memulai musik.')}};
document.getElementById('enterBtn').onclick=()=>document.getElementById('intro').classList.add('hide');
document.getElementById('topBtn').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
const c=document.getElementById('cursor'), c2=document.getElementById('cursor2');
window.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';c2.style.left=e.clientX+'px';c2.style.top=e.clientY+'px';});
