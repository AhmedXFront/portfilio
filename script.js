const stage = document.getElementById('stage');
const scanline = document.getElementById('scanline');
const zones = stage.querySelectorAll('.zone');
const layers = stage.querySelectorAll('.layer:not(.base)');
const lgFront = document.getElementById('lgFront');
const lgBack = document.getElementById('lgBack');

function show(id) {
  layers.forEach(l => l.classList.toggle('active', l.id === id));
  if (lgFront) {
    lgFront.classList.toggle('active', id === 'frontendImg');
    lgFront.classList.toggle('on', id === 'frontendImg');
  }
  if (lgBack) {
    lgBack.classList.toggle('active', id === 'backendImg');
    lgBack.classList.toggle('on', id === 'backendImg');
  }
}

function reset() {
  layers.forEach(l => l.classList.remove('active'));
  if (lgFront) lgFront.classList.remove('active', 'on');
  if (lgBack) lgBack.classList.remove('active', 'on');
  if (stage) stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

// حركة الإمالة الـ 3D وتتبع الماوس مع خط الإضاءة التفاعلي (Scanline)
if (stage) {
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (scanline) {
      scanline.style.left = `${x}px`;
    }

    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  zones.forEach(z => z.addEventListener('mouseenter', () => show(z.dataset.target)));
  stage.addEventListener('mouseleave', reset);

  // دعم شاشات اللمس للهواتف
  stage.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const r = stage.getBoundingClientRect();
    const x = t.clientX - r.left;
    if (scanline) {
      scanline.style.left = `${x}px`;
    }
    show(x < r.width / 2 ? 'frontendImg' : 'backendImg');
  }, { passive: true });
}

document.addEventListener('touchstart', e => {
  if (stage && !stage.contains(e.target)) reset();
}, { passive: true });

layers.forEach(img => { const i = new Image(); i.src = img.src; });

const sendBtn = document.getElementById('copyMail');
if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    const email = 'ahanmedmohammed@gmail.com';
    const mailtoUrl = `mailto:${email}?subject=Contact%20from%20Portfolio`;

    // If it's not already an anchor with href, open mailto directly
    if (sendBtn.tagName.toLowerCase() !== 'a' || !sendBtn.getAttribute('href')) {
      window.location.href = mailtoUrl;
    }

    // Visual feedback
    const originalText = sendBtn.textContent;
    sendBtn.textContent = 'Opening...';
    setTimeout(() => {
      sendBtn.textContent = originalText;
    }, 2000);

    // Fallback: copy email to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => { });
    }
  });
}
