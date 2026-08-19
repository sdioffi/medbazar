// Инициализация слайдера (Полный клон логики Uzum Market)
const swiper = new Swiper('.hero-swiper', {
    // Бесконечная прокрутка
    loop: true,

    // Автоматическое перелистывание (даже если не наводить курсор)
    autoplay: {
        delay: 5000, // Перелистывает каждые 3.5 секунды
        disableOnInteraction: false, // Не останавливать после того, как пользователь кликнул
    },

    // Стрелки перелистывания
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Точки внизу баннера
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});