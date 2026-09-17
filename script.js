(function() {
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;   // например, "section-3"

            // 1. Прячем все секции
            sections.forEach(sec => sec.classList.add('hidden'));

            // 2. Показываем нужную
            const target = document.getElementById(targetId);
            if (target) target.classList.remove('hidden');

            // 3. Переключаем active у кнопок
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
})();
(function() {
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;

            // прячем все
            sections.forEach(s => {
                s.classList.add('hidden');
                s.classList.remove('fade-in');   // ← снимаем анимацию
            });

            // показываем нужную
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('fade-in'); // ← запускаем анимацию
            }

            // подсветка кнопки
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
})();