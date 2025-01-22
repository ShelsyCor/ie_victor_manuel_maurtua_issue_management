const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1200,
    spaceBetween: 30,
    pauseOnFocus: false, 
    pauseOnHover: false,
    
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 1000,
    }
});

