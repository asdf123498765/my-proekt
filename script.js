(function() {
  const buttons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;

      // прячем все
      sections.forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('fade-in');
      });

      // показываем нужную
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.remove('hidden');
        target.classList.add('fade-in');
      }

      // подсветка кнопки
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

  // Если элементов нет — выходим без ошибок
  if (!overlay || !closeBtn) {
    console.warn('Модальное окно не найдено: проверьте ID в HTML');
    return;
  }

 
  const alreadyClosed = sessionStorage.getItem('welcomeClosed');
  if (alreadyClosed === '1') {
    overlay.remove();
    return;
  }


  function closeWelcome() {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    sessionStorage.setItem('welcomeClosed', '1');
    setTimeout(() => overlay.remove(), 300);
  }

 
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeWelcome();
  });

 
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeWelcome();
    }
  });


  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      closeWelcome();
    }
  });
})();
(function() {
  const overlay = document.getElementById('welcomeOverlay');
  const closeBtn = document.getElementById('welcomeClose');

  if (!overlay || !closeBtn) return;

  // Пока окно открыто — блокируем скролл body
document.documentElement.classList.add('no-scroll');
document.body.classList.add('no-scroll');

  function closeWelcome() {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.classList.remove('no-scroll');   // ← вернуть скролл
    sessionStorage.setItem('welcomeClosed', '1');
    setTimeout(() => overlay.remove(), 300);
  }

  // ... остальные обработчики
})();
