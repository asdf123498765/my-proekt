/* ============================================
   НАВИГАЦИЯ ПО ГЛАВАМ
   ============================================ */
(function() {
  const buttons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;

      sections.forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('fade-in');
      });

      const target = document.getElementById(targetId);
      if (target) {
        target.classList.remove('hidden');
        target.classList.add('fade-in');
      }

      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();

/* ============================================
   МОДАЛЬНОЕ ОКНО ПРИ ВХОДЕ
   ============================================ */
(function() {
  const overlay = document.getElementById('welcomeOverlay');
  const closeBtn = document.getElementById('welcomeClose');

  if (!overlay || !closeBtn) {
    console.warn('Модальное окно не найдено');
    return;
  }

  // Если уже закрывали в этой сессии — убираем и НЕ блокируем скролл
  if (sessionStorage.getItem('welcomeClosed') === '1') {
    overlay.remove();
    return;
  }

  // ─── БЛОКИРОВКА СКРОЛЛА ───
  function lockScroll() {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  function unlockScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  // Блокируем при открытии
  lockScroll();

  // ─── ЗАКРЫТИЕ ───
  let closed = false;

  function closeWelcome() {
    if (closed) return;
    closed = true;

    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    unlockScroll();   // ← ОБЯЗАТЕЛЬНО снимаем класс

    sessionStorage.setItem('welcomeClosed', '1');
    setTimeout(() => overlay.remove(), 300);
  }

  // Кнопка ×
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeWelcome();
  });

  // Клик по фону
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeWelcome();
  });

  // Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      closeWelcome();
    }
  });
})();
