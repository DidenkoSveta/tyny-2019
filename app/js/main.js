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
 