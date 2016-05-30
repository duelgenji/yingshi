


$(document).ready(function () {

    var doctorId  = getParam('doctorId');
    $.ajax({
        type:'GET',
        url:commonUrl + "doctorInformation/getDoctorAndServiceByDoctorId/"+doctorId,
        success: function (data) {
            var jsonData = JSON.parse(data);
            console.log(jsonData.ret_values);
            var source = $('#doctorDetailsTemplate').html();
            var template = Handlebars.compile(source);
            $('#doctorDetails').html(template(jsonData.ret_values));
        },
        error: function () {
            $(".loadingSDiv").removeClass("hide");
            $("body").addClass("overflowy");
            $(".loadingSDiv").css("marginTop", $(window).height() / 2 - $("#serviceErrorImg").height() / 1.2);
        }
    });

    $(document).on('click','.list-group-item', function () {
        var serviceId = $(this).attr('id');
        //location.href="fwh_my_package_detail.html?serverId="+serviceId;
    });
});
