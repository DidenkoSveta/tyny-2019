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
 

 document.addEventListener('DOMContentLoaded', function() {
   const form = document.querySelector('.contact__form-grid');
   
   form.addEventListener('submit', function(event) {
     event.preventDefault(); // Предотвращаем стандартную отправку формы
     const name = form.querySelector('#contact-name').value.trim();
     const email = form.querySelector('#contact-email').value.trim();
     const message = form.querySelector('#subject').value.trim();
     
     let isValid = true;
 
     // Валидация имени
     if (name === '') {
       isValid = false;
       form.querySelector('#contact-name').classList.add('invalid');
     } else {
       form.querySelector('#contact-name').classList.remove('invalid');
     }
 
     // Валидация email
     if (!validateEmail(email)) {
       isValid = false;
       form.querySelector('#contact-email').classList.add('invalid');
     } else {
       form.querySelector('#contact-email').classList.remove('invalid');
     }
 
     // Валидация сообщения
     if (message === '') {
       isValid = false;
       form.querySelector('#subject').classList.add('invalid');
     } else {
       form.querySelector('#subject').classList.remove('invalid');
     }
 
     // Если форма валидна, логируем данные и отправляем форму
     if (isValid) {
       console.log('Name:', name);
       console.log('Email:', email);
       console.log('Message:', message);
       // Здесь можно вызвать form.submit(), если нужно отправить форму на сервер
     }
   });
 
   function validateEmail(email) {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
   }
 });
 