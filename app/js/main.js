const swiper = new Swiper('.swiper-container', {
   slidesPerView: 2, // Показывать по два изображения за раз
   slidesPerGroup: 1, // Пролистывать по одному слайду
   spaceBetween: 42, // Отступ между слайдами
   loop: true, // Бесконечная прокрутка
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
   },
   pagination: {
     el: '.swiper-pagination',
     clickable: true,
   },
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 });

 // Плавная прокрутка при клике на ссылку навигационного меню
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function(e) {
     e.preventDefault();
     document.querySelector(this.getAttribute('href')).scrollIntoView({
       behavior: 'smooth'
     });
   });
 });
 

 document.addEventListener('DOMContentLoaded', function() {
   const form = document.querySelector('.contact__form-grid');
   
   form.addEventListener('submit', function(event) {
     event.preventDefault(); // Отменяем стандартное поведение формы
 
     let isValid = true;
     const nameInput = form.querySelector('#contact-name');
     const emailInput = form.querySelector('#contact-email');
     const messageTextArea = form.querySelector('#subject');
 
     // Валидация имени
     if (nameInput.value.trim() === '') {
       isValid = false;
       nameInput.classList.add('invalid');
     } else {
       nameInput.classList.remove('invalid');
     }
 
     // Валидация email
     if (!validateEmail(emailInput.value.trim())) {
       isValid = false;
       emailInput.classList.add('invalid');
     } else {
       emailInput.classList.remove('invalid');
     }
 
     // Валидация сообщения
     if (messageTextArea.value.trim() === '') {
       isValid = false;
       messageTextArea.classList.add('invalid');
     } else {
       messageTextArea.classList.remove('invalid');
     }
 
     // Логирование данных, если все поля валидны
     if (isValid) {
       console.log('Name:', nameInput.value);
       console.log('Email:', emailInput.value);
       console.log('Message:', messageTextArea.value);
       // form.submit(); // Раскомментируйте для отправки формы
     }
   });
 
   function validateEmail(email) {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
   }
 });
 

 //burger menu
 let menuOpenButton = document.querySelector('.header__burger');
 let menu = document.querySelector('.header__menu');
 
 // Обработчик клика для открытия меню
 menuOpenButton.addEventListener('click', () => {
   menu.classList.add('show');
 });
 
 // Обработчик клика на документе для закрытия меню
 document.addEventListener('click', (e) => {
   // Проверяем, кликнул ли пользователь на кнопку закрытия или вне меню
   if (e.target === menuOpenButton) {
     // Не делать ничего, если кликнули на кнопку открытия
     return;
   }
 
   if (e.target.closest('.header__close') || !e.target.closest('.header__menu')) {
     // Закрыть меню, если кликнули на кнопку закрытия или вне меню
     menu.classList.remove('show');
   }
 });
 
 