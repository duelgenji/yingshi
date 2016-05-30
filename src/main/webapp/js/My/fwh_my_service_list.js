


$(document).ready(function () {
    var json = {};
    postRequest(commonUrl + "service/myService/" + getData('memberId'), json, function (data) {
        var source = $('#serviceListTemplate').html();
        var template = Handlebars.compile(source);
        if (data.ret_values.length === 0) {
            $(".loadingDiv").removeClass("hide");
            $("body").addClass("overflowy");

            $(".loadingDiv").css("marginTop", $(window).height() / 2 - $("#serviceBlankImg").height() / 1.2);
            return;
        }
        $('#serviceList').html(template(data.ret_values));
    }, function () {
        $(".loadingSDiv").removeClass("hide");
        $("body").addClass("overflowy");
        $(".loadingSDiv").css("marginTop", $(window).height() / 2 - $("#serviceErrorImg").height() / 1.2);
    })
});


