// CЛАЙДЕР!!!
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация первого слайдера
    initializeSlider('slider1', 'prevBtn1', 'nextBtn1', '.object');
    
    // Инициализация второго слайдера
    initializeSlider('slider2', 'prevBtn2', 'nextBtn2', '.object-ButWith');
    
    function initializeSlider(sliderId, prevBtnId, nextBtnId, itemSelector) {
        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        // Переменные для drag-функционала
        let isDragging = false;
        let startPosition = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;
        
        const itemGap = 16; // margin-right объектов
        
        // Клонируем элементы для бесконечного слайдера
        function initializeInfiniteSlider() {
            const items = slider.querySelectorAll(itemSelector);
            const itemsArray = Array.from(items);
            
            // Клонируем элементы для бесконечной прокрутки
            itemsArray.forEach(item => {
                const clone = item.cloneNode(true);
                slider.appendChild(clone);
            });
        }
        
        initializeInfiniteSlider();
        
        // Функция для получения позиции события (мышь или тач)
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        // Функция для установки позиции слайдера
        function setSliderPosition() {
            slider.style.transform = `translateX(${currentTranslate}px)`;
        }
        
        // Функция анимации
        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }
        
        // Функция для проверки и коррекции бесконечной прокрутки
        function checkInfiniteScroll() {
            const items = slider.querySelectorAll(itemSelector);
            const itemWidth = items[0].offsetWidth + itemGap;
            const totalWidth = items.length * itemWidth / 2; // делим на 2 т.к. клонировали
            
            // Если ушли слишком далеко вправо (начало)
            if (currentTranslate > itemWidth) {
                currentTranslate -= totalWidth;
                prevTranslate -= totalWidth;
                setSliderPosition();
            }
            // Если ушли слишком далеко влево (конец)
            else if (currentTranslate < -totalWidth - itemWidth) {
                currentTranslate += totalWidth;
                prevTranslate += totalWidth;
                setSliderPosition();
            }
        }
        
        // События для мыши
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPosition = getPositionX(e);
            animationID = requestAnimationFrame(animation);
            slider.style.cursor = 'grabbing';
            slider.style.transition = 'none';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + currentPosition - startPosition;
                checkInfiniteScroll();
            }
        });
        
        slider.addEventListener('mouseup', () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            prevTranslate = currentTranslate;
            slider.style.cursor = 'grab';
            slider.style.transition = 'transform 0.3s ease-out';
            
            // Выравнивание к ближайшему элементу
            alignToNearestItem();
        });
        
        slider.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                prevTranslate = currentTranslate;
                slider.style.cursor = 'grab';
                slider.style.transition = 'transform 0.3s ease-out';
                
                // Выравнивание к ближайшему элементу
                alignToNearestItem();
            }
        });
        
        // События для тач-устройств
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPosition = getPositionX(e);
            animationID = requestAnimationFrame(animation);
            slider.style.transition = 'none';
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + currentPosition - startPosition;
                checkInfiniteScroll();
            }
        });
        
        slider.addEventListener('touchend', () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            prevTranslate = currentTranslate;
            slider.style.transition = 'transform 0.3s ease-out';
            
            // Выравнивание к ближайшему элементу
            alignToNearestItem();
        });
        
        // Функция для выравнивания к ближайшему элементу
        function alignToNearestItem() {
            const items = slider.querySelectorAll(itemSelector);
            const itemWidth = items[0].offsetWidth + itemGap;
            
            // Вычисляем ближайшую позицию выравнивания
            const nearestPosition = Math.round(currentTranslate / itemWidth) * itemWidth;
            
            // Плавно перемещаем к выровненной позиции
            currentTranslate = nearestPosition;
            prevTranslate = currentTranslate;
            setSliderPosition();
            
            // Проверяем бесконечную прокрутку после выравнивания
            setTimeout(checkInfiniteScroll, 300);
        }
        
        // Обработчики для кнопок
        prevBtn.addEventListener('click', () => {
            const items = slider.querySelectorAll(itemSelector);
            const itemWidth = items[0].offsetWidth + itemGap;
            
            currentTranslate += itemWidth;
            prevTranslate = currentTranslate;
            
            // Плавная анимация
            slider.style.transition = 'transform 0.3s ease-out';
            setSliderPosition();
            
            // Проверяем бесконечную прокрутку
            setTimeout(checkInfiniteScroll, 300);
        });
        
        nextBtn.addEventListener('click', () => {
            const items = slider.querySelectorAll(itemSelector);
            const itemWidth = items[0].offsetWidth + itemGap;
            
            currentTranslate -= itemWidth;
            prevTranslate = currentTranslate;
            
            // Плавная анимация
            slider.style.transition = 'transform 0.3s ease-out';
            setSliderPosition();
            
            // Проверяем бесконечную прокрутку
            setTimeout(checkInfiniteScroll, 300);
        });
        
        // Инициализация курсора
        slider.style.cursor = 'grab';
        
        // Инициализация трансформации
        slider.style.transition = 'transform 0.3s ease-out';
        
        // Обработчик ресайза окна для пересчета позиций
        window.addEventListener('resize', () => {
            setSliderPosition();
        });
    }
});


// ВАЛИДАЦИЯ ФОРМ
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация первой формы
    initializeFormValidation(
        '.form-application', 
        '.btn-form', 
        'myModal'
    );
    
    // Инициализация второй формы
    initializeFormValidation(
        '.form-application-two', 
        '.btn-form', 
        'myModal'
    );
    
    function initializeFormValidation(formSelector, submitBtnSelector, modalId) {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input');
        const submitBtn = form.querySelector(submitBtnSelector);
        const modal = document.getElementById(modalId);
        
        // Создаем контейнеры для сообщений об ошибках
        inputs.forEach(input => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ff4444; font-size: 12px; margin-top: 4px; font-family: var(--font-Inter); display: none;';
            input.parentNode.appendChild(errorDiv);
        });
        
        // Функции валидации
        function validateName(input) {
            const value = input.value.trim();
            const errorDiv = input.parentNode.querySelector('.error-message');
            
            if (value === '') {
                showError(input, errorDiv, 'Поле обязательно для заполнения');
                return false;
            }
            
            if (value.length < 2) {
                showError(input, errorDiv, 'Имя должно содержать минимум 2 символа');
                return false;
            }
            
            if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
                showError(input, errorDiv, 'Имя может содержать только буквы, пробелы и дефисы');
                return false;
            }
            
            hideError(input, errorDiv);
            return true;
        }
        
        function validatePhone(input) {
            const value = input.value.trim();
            const errorDiv = input.parentNode.querySelector('.error-message');
            
            if (value === '') {
                showError(input, errorDiv, 'Поле обязательно для заполнения');
                return false;
            }
            
            // Убираем все нецифровые символы для проверки
            const cleanPhone = value.replace(/\D/g, '');
            
            if (cleanPhone.length < 10) {
                showError(input, errorDiv, 'Номер телефона должен содержать минимум 10 цифр');
                return false;
            }
            
            // Проверяем российский формат телефона
            const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            if (!phoneRegex.test(value)) {
                showError(input, errorDiv, 'Введите корректный номер телефона');
                return false;
            }
            
            hideError(input, errorDiv);
            return true;
        }
        
        function validateEmail(input) {
            const value = input.value.trim();
            const errorDiv = input.parentNode.querySelector('.error-message');
            
            if (value === '') {
                showError(input, errorDiv, 'Поле обязательно для заполнения');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, errorDiv, 'Введите корректный email адрес');
                return false;
            }
            
            hideError(input, errorDiv);
            return true;
        }
        
        function showError(input, errorDiv, message) {
            input.style.border = '2px solid #ff4444';
            input.style.backgroundColor = '#fff5f5';
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        
        function hideError(input, errorDiv) {
            input.style.border = 'none';
            input.style.backgroundColor = '';
            errorDiv.style.display = 'none';
        }
        
        // Обработчики событий
        inputs.forEach(input => {
            // Валидация при потере фокуса
            input.addEventListener('blur', function() {
                switch(this.type) {
                    case 'text':
                        validateName(this);
                        break;
                    case 'tel':
                        validatePhone(this);
                        break;
                    case 'email':
                        validateEmail(this);
                        break;
                }
            });
            
            // Убираем ошибку при начале ввода
            input.addEventListener('input', function() {
                const errorDiv = this.parentNode.querySelector('.error-message');
                if (this.value.trim() !== '') {
                    hideError(this, errorDiv);
                }
            });
        });
        
        // Валидация всей формы при отправке
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            inputs.forEach(input => {
                let fieldValid = false;
                
                switch(input.type) {
                    case 'text':
                        fieldValid = validateName(input);
                        break;
                    case 'tel':
                        fieldValid = validatePhone(input);
                        break;
                    case 'email':
                        fieldValid = validateEmail(input);
                        break;
                }
                
                if (!fieldValid) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Форма валидна, показываем модальное окно
                modal.style.display = "flex";
                
                // Сбрасываем форму и стили ошибок
                form.reset();
                inputs.forEach(input => {
                    const errorDiv = input.parentNode.querySelector('.error-message');
                    hideError(input, errorDiv);
                });
            } else {
                // Показываем общее сообщение об ошибке
                const firstError = form.querySelector('.error-message[style="display: block;"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Закрытие модального окна (общее для всех форм)
    const modal = document.getElementById('myModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        const closeModalBtn = modal.querySelector('.btn-modal');
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
        
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
        
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
});

// МЕНЮ
document.addEventListener('DOMContentLoaded', function() {
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');

// Открытие меню
menuToggle.addEventListener('click', function() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл
});

// Закрытие меню
closeMenu.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем скролл
});

// Закрытие меню при клике на ссылку
const navLinks = mobileNav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Закрытие меню при клике вне его области
mobileNav.addEventListener('click', function(e) {
    if (e.target === mobileNav) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});
});

