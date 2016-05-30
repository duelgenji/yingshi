




$(document).ready(function () {
    console.log(getData('memberId'));
    $.ajax({
        type: 'GET',
        url: commonUrl + 'service/myService/' +6012,
        //todo
        success: function (data) {
            var source = $('#purchaseTemplate').html();
            var template = Handlebars.compile(source);
            console.log(data.ret_values);
            if (data.ret_values.length === 0) {
                $(".loadingDiv").removeClass("hide");
                $("body").addClass("overflowy");
                $(".loadingDiv").css("marginTop", $(window).height() / 2 - $("#purchaseBlankImg").height() / 1.2);
            } else {
                $('#purchase').html(template(data.ret_values));
            }
        },
        error: function () {
            $(".loadingSDiv").removeClass("hide");
            $("body").addClass("overflowy");
            $(".loadingSDiv").css("marginTop", $(window).height() / 2 - $("#purchaseServiceErrorImg").height() / 1.5);

        }
    })
});
