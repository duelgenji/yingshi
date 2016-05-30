/**
 * Created by qqy on 15/11/3.
 */

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: commonUrl + 'setMeal/findTypeAndDoctor',
        success: function (data) {
            var listTemple2 = Handlebars.compile($('#doctorInfos').html());
            var listTemple3 = Handlebars.compile($('#setMeals').html());
            $('#section-doctor').html(listTemple2(JSON.parse(data.ret_values).doctorInfos));
            $('#section-meal').html(listTemple3(JSON.parse(data.ret_values).setMeals));

            var length = JSON.parse(data.ret_values).doctorInfos.length;
            $('#scroller').css('width', (110 * length + 10) + 'px');
            window.onload = loaded();
        },
        error: function () {
            $('.container-fluid').addClass('hide');
            $(".loadingSDiv").removeClass("hide");
            $("body").addClass("overflowy");
            $("body").css('backgroundColor','rgba(251, 251, 255, 0.83)');
            $(".loadingSDiv").css("marginTop", $(window).height() / 2 - $("#serviceErrorImg").height() / 1.2);
        }
    });
    $(document).on('click', '.carousel-inner .col-xs-3', function () {
        var id = $(this).attr('id');
        console.log(id);
        location.href = 'fwh_package_detail_list.html?setMealTypeId=' + id;
    });

    $(document).on("touchstart click", "#scroller .pi-doctor", function () {
        var doctorId = $(this).attr("id");
        location.href = 'fwh_doctor_details.html?doctorId=' + doctorId;

    });
    $(document).on('click', '.list-group-item', function () {
        var id = $(this).attr('id');
        location.href = 'fwh_my_package_detail.html?serviceId=' + id;
    })
});

var doctorScroll;
function loaded() {
    doctorScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true});
}


function changeCss() {
    $('#next').toggleClass('activeColor');
    $('#prev').toggleClass('activeColor');
}

