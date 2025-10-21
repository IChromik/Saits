// Открытие и закрытие меню
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


// Активация ссылки в меню
const navLink = document.querySelectorAll('.nav__link')

const linkActive = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkActive))


//При скролла вниз, шапка меню добавляет тень
const scrollHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header')
                    : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

// Скролл-вверх
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// Скролл по ссылке
const sections = document.querySelectorAll('section[id]')




// -- КОД ДОБАВЛЕНИЕ СУШ В КОРЗИНУ!!! --

let cartItems = [];
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const addToCardButtons = document.querySelectorAll('.popular__button');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const cartItemsList = sidebar.querySelector('.cart-items'); // Находим список товаров в корзине внутри sidebar
    const cartTotal = sidebar.querySelector('.cart-total'); // Находим элемент для отображения общей суммы внутри sidebar


    addToCardButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.popular__card .popular__name')[index].textContent,
                price: parseFloat(document.querySelectorAll('.popular__price')[index].textContent.slice(0, -1)),
                quantity: 1,
            };

            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = ''; // Очищаем текущий список товаров
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} р</span>
                <button class="remove-btn" data-index="${index}"> <i class="ri-close-large-line"></i></button>
            `;

            cartItemsList.append(cartItem);
        });

        const removeButtons = cartItemsList.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removeItem = cartItems.splice(index, 1)[0];
        totalAmount -= removeItem.price * removeItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `${totalAmount.toFixed(2)} р`; // Обновляем общую сумму
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = sidebar.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});


// Мондальные окна для оформление заказов

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var modalClose = document.getElementsByClassName("modal-close")[0];
var emptyModalClose = document.getElementsByClassName("empty-modal-close")[0];
var emptyModal = document.getElementById('empty-modal')

btn.onclick = function(){
    if(cartItems.length > 0){
        sidebar.classList.remove('open')
        modal.style.display = "block";
    } else {
        sidebar.classList.remove('open')
        emptyModal.style.display = "block"
    }
}

modalClose.onclick = function() {
    modal.style.display = "none";
}

emptyModalClose.onclick = function() {
    emptyModal.style.display = "none";
}



var checkontBtn = document.getElementById('making-btn')
var doneModal = document.getElementById('done-modal')

document.addEventListener('DOMContentLoaded', () => {
    const checkontBtn = document.getElementById('making-btn');
    const phoneInput = document.getElementById('phone-input');
    const nameInput = document.getElementById('name-input');

    checkontBtn.onclick = function(event) {
        const phoneValue = phoneInput.value;
        const nameValue = nameInput.value.trim();

        if (!nameValue && !phoneValue) {
            event.preventDefault(); 
            alert('Пожалуйста, укажите имя и номер телефона.');
            return; 
        }

        if (!nameValue) {
            event.preventDefault(); 
            alert('Пожалуйста, укажите имя.');
            return; и
        }

        const numericPhoneValue = phoneValue.replace(/\D/g, '');

        if (numericPhoneValue.length !== 11) { 
            event.preventDefault(); 
            alert('Номер телефона введён неверно!');
            return; 
        }

        modal.style.display = "none"; 
        doneModal.style.display = "block"; 

        setTimeout(() => {
            doneModal.style.display = "none"; 
        }, 5000); 
    };
});

