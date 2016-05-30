/**
 * Created by qqy on 15/10/27.
 */

var myScroll;

function loaded() {
    $.ajax({
        type: 'GET',
        url: commonUrl + 'setMeal/findAllDoctor/',
        success: function (data) {
            console.log(data);
            var source = $('#doctorTemplate').html();
            var template = Handlebars.compile(source);
            $('#scroller').html(template(JSON.parse(data).ret_values));
            var length = JSON.parse(data).ret_values.length;
            $('#scroller').css('width', (112 * length) + 'px');
            myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true,click: true});
        }, error: function () {
            $('#scroller').css('width', (112 * 4) + 'px');
            myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true,click: true});
        }
    });
}

$(document).on('click','.canclick', function () {
    $(this).removeClass("canclick");
    var doctorId = $(this).attr('id');
    location.href ='fwh_doctor_details.html?doctorId='+doctorId;
    $(this).addClass("canclick");
})