$(document).ready(function () {
    var mySwiper;
    mySwiper = new Swiper('#header', {
        initialSlide: 0,
        freeMode: true,
        slidesPerView: 'auto'
    });

    $(".swiper-slide span").click(function () {
        $(".swiper-slide span").parent().find('.am-active').removeClass("am-active");
        $(this).addClass("am-active");
    });
});