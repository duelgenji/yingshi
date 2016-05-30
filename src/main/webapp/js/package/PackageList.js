$(document).ready(function () {
    new Swiper('#header', {
        initialSlide: 0,
        freeMode: true,
        slidesPerView: 'auto'
    });

    $(".swiper-slide span").click(function () {
        $(".swiper-slide span").parent().find('.pl-active').removeClass("pl-active");
        $(this).addClass("pl-active");
    });

    //加载第一次跳转
    var setMealId = getParam("setMealTypeId");
    $('#' + setMealId).addClass("pl-active");
    setMealByType(setMealId);

    $(document).on('click', '.swiper-slide', function () {
        var $this = $(this);
        var setMealTypeId = $this.attr("id");
        setMealByType(setMealTypeId);
    });

});
function setMealByType(setMealTypeId) {
    console.log(setMealTypeId);
    $.ajax({
        type: 'GET',
        url: commonUrl + 'setMeal/findSetMealByType/' + setMealTypeId+"/"+getData('memberId'),
        success: function (data) {
            var source = $('#packageListTemplate').html();
            var template = Handlebars.compile(source);
            $('#packageList').html(template(JSON.parse(data)));
        },
        error: function () {
            $(".loadingSDiv").removeClass("hide");
            $("body").addClass("overflowy");
            $(".loadingSDiv").css("marginTop", $(window).height() / 2 - $("#serviceErrorImg").height() / 1.2);
        }
    });

}