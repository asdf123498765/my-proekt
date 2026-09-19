(function() {
  const overlay = document.getElementById('welcomeOverlay');
  const closeBtn = document.getElementById('welcomeClose');

  if (!overlay || !closeBtn) {
    console.warn('Модальное окно не найдено');
    return;
  }

  if (sessionStorage.getItem('welcomeClosed') === '1') {
    overlay.remove();
    return;
  }

  function lockScroll() {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  function unlockScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  lockScroll();

  let closed = false;

  function closeWelcome() {
    if (closed) return;
    closed = true;

    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    unlockScroll();

    sessionStorage.setItem('welcomeClosed', '1');
    setTimeout(() => overlay.remove(), 300);
  }

  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeWelcome();
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeWelcome();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      closeWelcome();
    }
  });
})();
(function() {
  const track = document.getElementById('buttonTrack');
  if (!track) return;

  const buttons = track.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const carousel = track.parentElement;
  const TOTAL = buttons.length;

  let currentChapter = 1;

  // ===== Показать секцию с направлением =====
  function showSection(num, direction) {
    sections.forEach(s => {
      s.classList.add('hidden');
      s.classList.remove('fade-in', 'next', 'prev');
    });

    const target = document.getElementById(`section-${num}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('fade-in');
      if (direction) target.classList.add(direction);
    }
  }

  // ===== Сдвинуть трек =====
  function centerActiveButton() {
    const active = track.querySelector('.nav-btn.active');
    if (!active) return;

    const carouselWidth = carousel.offsetWidth;
    const btnLeft = active.offsetLeft;
    const btnWidth = active.offsetWidth;

    const offset = btnLeft - (carouselWidth / 2) + (btnWidth / 2);
    track.style.transform = `translateX(${-offset}px)`;
  }

  // ===== Переключение =====
  function goToChapter(num) {
    if (num < 1 || num > TOTAL) return;

    const direction = num > currentChapter ? 'next' : 'prev';
    currentChapter = num;

    buttons.forEach(b => b.classList.remove('active'));
    buttons[num - 1].classList.add('active');

    showSection(num, direction);
    centerActiveButton();

    window.scrollTo(0, 0);
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

  buttons[0].classList.add('active');
  showSection(1, 'next');

  requestAnimationFrame(() => {
    requestAnimationFrame(centerActiveButton);
  });

  window.addEventListener('load', centerActiveButton);
})();
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
