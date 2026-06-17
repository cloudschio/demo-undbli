const loader = document.getElementById('loader');
const openBtn = document.getElementById('openBtn');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');

openBtn.addEventListener('click', async () => {
  loader.classList.add('hidden');
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
