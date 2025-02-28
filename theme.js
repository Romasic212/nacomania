document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('i');

    // Проверяем, сохранена ли тема в localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleIcon) {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        }
    }

    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeToggleIcon) {
                    themeToggleIcon.classList.remove('fa-moon');
                    themeToggleIcon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (themeToggleIcon) {
                    themeToggleIcon.classList.remove('fa-sun');
                    themeToggleIcon.classList.add('fa-moon');
                }
            }
        });
    }
});