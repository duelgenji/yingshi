/**
 * Created by Jeffrey on 15/12/25.
 */

$(function () {
    $('#sureModal').on('show.bs.modal', function () {
        setTimeout(function () {
            $("#sureModal").modal("hide")
        }, 4000);
    });
    if (getParam("primaryKey") != null) {
        saveData("primaryKey", getParam("primaryKey"));
    }
    if (getParam("memberId") != null) {
        saveData("memberId", getParam("memberId"));
    }
    if (getParam("imGroupId") != null) {
        saveData("imGroupId", getParam("imGroupId"));
    }
    var statusRequstUrl = commonUrl + 'im/judgeRepl/' + getData("primaryKey");
    //在线问诊按钮点击
    $("#mi-online").click(function () {
        jump(statusRequstUrl);
    });
});


var jump = function (statusRequstUrl) {
    $.ajax({
        url: statusRequstUrl,
        async: false,
        success: function (data) {
            if (data.ret_code === -15) {
                $('#my-message').text('请登录!');
                $('#sureModal').modal('show');
            }
            if (data.ret_code === 0) {
                //原生跳转等待页面
                location.href = 'inquiry_dialog.html?memberId=' + getData("memberId") + '&imGroupId=' + getData("imGroupId");
                return;
            }
            if (data.ret_code === 1) {
                location.href = 'non-member_inquiry.html?memberId=' + getData("memberId") + '&imGroupId=' + getData("imGroupId");
                return;
            }
            if (data.ret_code === 2) {
                location.href = 'inquiry_waiting.html?memberId=' + getData("memberId") + '&imGroupId=' + getData("imGroupId");
            }
        },
        error: function () {
            $('#my-message').text('服务器请求失败');
            $('#sureModal').modal('show');
        }
    });
};