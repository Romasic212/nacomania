document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navItems = document.querySelector('.nav-items');
    const closeMenuButton = document.querySelector('.close-menu');

    // Функция для открытия меню
    function openMenu() {
        if (navItems) {
            navItems.classList.add('active');
        }
    }

    // Функция для закрытия меню
    function closeMenu() {
        if (navItems) {
            navItems.classList.remove('active');
        }
    }

    // Обработчик клика по кнопке "бургер-меню"
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            if (navItems) {
                if (navItems.classList.contains('active')) {
                    closeMenu(); // Если меню открыто - закрываем
                } else {
                    openMenu(); // Если меню закрыто - открываем
                }
            }
        });
    }

    // Обработчик клика вне области меню (закрытие)
    document.addEventListener('click', (event) => {
        if (navItems && navItems.classList.contains('active') &&
            !navItems.contains(event.target) &&
            !burgerMenu.contains(event.target)
        ) {
            closeMenu();
        }
    });
});
