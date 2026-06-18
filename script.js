const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const musicBtn=document.getElementById('musicBtn');
const bgm=document.getElementById('bgm');
const openingScreen=document.getElementById('openingScreen');
const mainPage=document.getElementById('mainPage');
const openInvite=document.getElementById('openInvite');

if(localStorage.getItem('theme')==='dark'){
  body.classList.add('dark');
  themeBtn.textContent='☀'
}

themeBtn.addEventListener('click',()=>{
  body.classList.toggle('dark');
  themeBtn.textContent=body.classList.contains('dark')?'☀':'☾';
  localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light')
});

openInvite.addEventListener('click',()=>{
  openingScreen.style.opacity='0';
  openingScreen.style.pointerEvents='none';
  mainPage.classList.remove('hidden');
  bgm.play().catch(()=>{});
  setTimeout(()=>openingScreen.style.display='none',400)
});

musicBtn.addEventListener('click',async()=>{
  if(bgm.paused){
    try{
      await bgm.play();
      musicBtn.textContent='❚❚'
    }catch(e){}
  }else{
    bgm.pause();
    musicBtn.textContent='♫'
  }
});

const target=new Date('2026-12-19T08:00:00+07:00').getTime();
const tick=()=>{
  const d=Math.max(target-Date.now(),0);
  days.textContent=String(Math.floor(d/86400000)).padStart(2,'0');
  hours.textContent=String(Math.floor((d%86400000)/3600000)).padStart(2,'0');
  minutes.textContent=String(Math.floor((d%3600000)/60000)).padStart(2,'0');
  seconds.textContent=String(Math.floor((d%60000)/1000)).padStart(2,'0');
  if(d<=0){
    document.getElementById('countdownBox').innerHTML='<div><span>Sudah</span><small>Dimulai</small></div><div><span>Acara</span><small>Berlangsung</small></div><div><span>Mohon</span><small>Duduk</small></div><div><span>Terima</span><small>Kasih</small></div>';
    clearInterval(timer)
  }
};
const timer=setInterval(tick,1000);
tick();

rsvpForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=rsvpName.value.trim();
  const status=rsvpStatus.value;
  const guest=rsvpGuest.value||'1';
  const message=rsvpMessage.value.trim();
  const text=`Halo, saya ${name}. Saya ingin konfirmasi kehadiran: ${status}. Jumlah tamu: ${guest}. ${message ? 'Pesan: ' + message : ''} Pada undangan pernikahan Adam & Sari.`;
  window.open('https://wa.me/6281234567890?text='+encodeURIComponent(text),'_blank')
});

const copyRekening=document.getElementById('copyRekening');
const rekeningNumber=document.getElementById('rekeningNumber');
if(copyRekening&&rekeningNumber){
  copyRekening.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(rekeningNumber.textContent.trim());
      copyRekening.textContent='Tersalin';
      setTimeout(()=>copyRekening.textContent='Salin',1200)
    }catch(e){
      copyRekening.textContent='Gagal';
      setTimeout(()=>copyRekening.textContent='Salin',1200)
    }
  });
}
