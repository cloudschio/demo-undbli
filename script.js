// === COUNTDOWN ===
// Set tanggal pernikahan (ganti dengan tanggal yang benar)
const weddingDate = new Date('2027-02-31T10:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  } else {
    // Jika sudah lewat tanggal pernikahan
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// === OPEN INVITATION ===
const openInviteBtn = document.getElementById('openInvite');
const cover = document.getElementById('cover');

// Pastikan elemen ada sebelum menambah event listener
if (openInviteBtn && cover) {
  openInviteBtn.addEventListener('click', function() {
    console.log('Tombol dibuka!');
    cover.classList.add('hidden');
    
    // Start music otomatis
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (music) {
      music.play().catch((err) => {
        console.log('Auto-play prevented:', err);
      });
      if (musicToggle) {
        musicToggle.classList.add('playing');
      }
    }
  });
} else {
  console.log('Error: Element not found');
}

// === MUSIC TOGGLE ===
const musicToggleBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

if (musicToggleBtn && bgMusic) {
  musicToggleBtn.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play().catch((err) => {
        console.log('Play error:', err);
      });
      musicToggleBtn.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggleBtn.classList.remove('playing');
    }
  });
}

// === NAVIGATION ACTIVE STATE ===
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// === Smooth scrolling untuk anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// === RSVP FORM ===
const rsvpCategory = document.getElementById('rsvpCategory');
const rsvpGuest = document.getElementById('rsvpGuest');

if (rsvpCategory && rsvpGuest) {
  rsvpCategory.addEventListener('change', function() {
    if (this.value === 'keluarga') {
      rsvpGuest.innerHTML = '<option value="">-- Jumlah Orang --</option>' +
        '<option value="1">1 Orang</option>' +
        '<option value="2">2 Orang</option>' +
        '<option value="3">3-4 Orang</option>' +
        '<option value="4">5+ Orang</option>';
    } else {
      rsvpGuest.innerHTML = '<option value="">-- Jumlah Orang --</option>' +
        '<option value="1">1 Orang</option>' +
        '<option value="2">2 Orang</option>';
    }
    
    rsvpGuest.disabled = false;
  });
}

function sendRSVP(event) {
  event.preventDefault();
  
  const name = document.getElementById('rsvpName').value.trim();
  const category = document.getElementById('rsvpCategory').value;
  const guest = document.getElementById('rsvpGuest').value;
  const attend = document.getElementById('rsvpAttend').value;
  const message = document.getElementById('rsvpMessage').value.trim();
  
  if (!name || !category || !attend || !message) {
    alert('Mohon lengkapi semua data!');
    return;
  }
  
  let attendText = '';
  if (attend === 'hadir') attendText = '✅ Hadir';
  else if (attend === 'tidak') attendText = '❌ Tidak Hadir';
  else attendText = '🤔 Mungkin Hadir';
  
  let rsvpMessage = `🙏 *RSVP UNDANGAN PERNIKAHAN*\n\n` +
    `Nama: ${name}\n` +
    `Kategori: ${category}\n`;
  
  if (category === 'keluarga' && guest) {
    rsvpMessage += `Jumlah: ${guest}\n`;
  }
  
  rsvpMessage += `Kehadiran: ${attendText}\n\n` +
    `Ucapan:\n${message}`;
  
  // Ganti nomor WhatsApp di bawah ini
  const phoneNumber = ''; // Contoh: '628123456789'
  
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rsvpMessage)}`;
  
  window.open(whatsappURL, '_blank');
}
