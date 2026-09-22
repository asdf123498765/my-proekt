/* ============================================
   1. ОБЁРТКА SECTION-FRAME — ПЕРВЫМ ДЕЛОМ
   ============================================ */
(function() {
  document.querySelectorAll('.content-section').forEach(sec => {
    if (sec.parentElement.classList.contains('section-frame')) return;

    const frame = document.createElement('div');
    frame.className = 'section-frame';
    sec.parentNode.insertBefore(frame, sec);
    frame.appendChild(sec);
  });
})();


/* ============================================
   2. НАВИГАЦИЯ
   ============================================ */
(function() {
   sections.forEach(s => s.classList.remove('hidden'));
  const track = document.getElementById('buttonTrack');
  if (!track) return;

  const buttons = track.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const carousel = track.parentElement;
  const TOTAL = buttons.length;

  let currentChapter = 1;
  try {
    const saved = localStorage.getItem('lastChapter');
    if (saved) {
      const num = parseInt(saved, 10);
      if (num >= 1 && num <= TOTAL) currentChapter = num;
    }
  } catch (e) {
    console.warn('localStorage недоступен');
  }

  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  // ===== Показать секцию — ТОЛЬКО frame =====
  function showSection(num) {
    // ⚠️ Работаем ТОЛЬКО с frame. Секции НЕ трогаем!
    document.querySelectorAll('.section-frame').forEach(frame => {
      frame.classList.add('hidden');
      frame.classList.remove('fade-in', 'next', 'prev');
    });

    const target = document.getElementById(`section-${num}`);
    if (!target) return;

    const frame = target.closest('.section-frame');
    if (frame) {
      frame.classList.remove('hidden');
      frame.classList.add('fade-in', 'next');
    }
  }

  function centerActiveButton() {
    const active = track.querySelector('.nav-btn.active');
    if (!active) return;

    const carouselWidth = carousel.offsetWidth;
    const btnLeft = active.offsetLeft;
    const btnWidth = active.offsetWidth;

    const offset = btnLeft - (carouselWidth / 2) + (btnWidth / 2);
    track.style.transform = `translateX(${-offset}px)`;
  }

  let progressAnimId = null;

  function animateProgress(toPercent, duration = 400) {
    if (!progressFill || !progressText) return;
    if (progressAnimId) cancelAnimationFrame(progressAnimId);

    const fromPercent = parseInt(progressText.textContent, 10) || 0;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(fromPercent + (toPercent - fromPercent) * eased);

      progressText.textContent = current + '%';
      progressFill.style.width = current + '%';

      if (t < 1) progressAnimId = requestAnimationFrame(tick);
      else progressAnimId = null;
    }
    progressAnimId = requestAnimationFrame(tick);
  }

  function updateProgress() {
    const percent = Math.round((currentChapter / TOTAL) * 100);
    animateProgress(percent, 400);
  }

  function goToChapter(num) {
    if (num < 1 || num > TOTAL) return;

    currentChapter = num;

    buttons.forEach(b => b.classList.remove('active'));
    buttons[num - 1].classList.add('active');

    showSection(num);
    centerActiveButton();
    updateProgress();

    try {
      localStorage.setItem('lastChapter', num);
    } catch (e) {
      console.warn('localStorage недоступен');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => goToChapter(i + 1));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goToChapter(currentChapter - 1);
    if (e.key === 'ArrowRight') goToChapter(currentChapter + 1);
  });

  window.addEventListener('resize', centerActiveButton);
  window.addEventListener('orientationchange', () => {
    setTimeout(centerActiveButton, 100);
  });

  // ===== Старт =====
  buttons[currentChapter - 1].classList.add('active');
  showSection(currentChapter);
  updateProgress();

  requestAnimationFrame(() => {
    requestAnimationFrame(centerActiveButton);
  });

  window.addEventListener('load', centerActiveButton);
})();
