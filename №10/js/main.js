// А тут ваще что-то будет??? (Да);

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    
    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        toggle.innerHTML = menu.classList.contains('active') ? 
            '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    });
    
    overlay.addEventListener('click', function() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        toggle.innerHTML = '<i class="ri-menu-line"></i>';
    });
    
    // Закрытие меню при клике на ссылки
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            toggle.innerHTML = '<i class="ri-menu-line"></i>';
        });
    });
});