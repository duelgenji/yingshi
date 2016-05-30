/**
 * Created by scf on 15/11/24.
 */


$(document).ready(function () {

    //placeholder 变化
    $(document).on("focus", "#password", function () {
        $(this).attr("placeholder", "必须6位以上");
    });
    $(document).on("blur", "#password", function () {
        $(this).attr("placeholder", "设置6~10位登陆密码");
    });

    $(document).on("click", "#sendSms", function () {
        var mobiles = $("#mobile").val();
        if (!validatePhone(mobiles)) {
            alert("您输⼊入的⼿手机号格式不正确");
            return;
        }
        var json = {};
        json.mobiles = mobiles;
        var $sendSms = $("#sendSms");

        $.ajax({
            type: "post",
            data: json,
            url: commonUrl + "/users/sendSmsValidationCode",
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.ret_code == 0) {
//                        $("#sendSms").attr("disabled", "disabled");
                    $sendSms.attr("disabled", "disabled");
                    $sendSms.addClass("disabled");
                    var waitTime = 3;
                    var interval = setInterval(function () {
                        waitTime--;
                        $sendSms.val(waitTime + "秒后重新发送");
                        if (waitTime <= 0) {
                            $sendSms.val("获取验证码");
                            $sendSms.removeAttr("disabled");
                            $sendSms.removeClass("disabled");
                            clearInterval(interval);
                        }
                    }, 1000);

                } else {
                    $sendSms.removeAttr("disabled");
                    $sendSms.removeClass("disabled");

                }
            },
            error: function () {
                alert('服务器异常');
            }
        });
    });

    $(document).on("click", "#forgetPassword", function () {
        var json = {};
        var phoneNumber = $("#mobile").val();
        var validationCode = $("#captcha").val();
        var password = $("#newpassword").val();
        var passwordConfirm = $("#password_confirm").val()

        if (!validatePhone(phoneNumber)) {
            $("#modal-alert").html("您输入的手机号格式不正确");
            $("#myModal").modal("show");
            return;
        } else if (!validateYZM(validationCode)) {
            $("#modal-alert").html("您输入的验证码格式不正确");
            $("#myModal").modal("show");
            //alert("您输入的验证码格式不正确");
            return;
        } else if (!validatePassword(password)) {
            $("#modal-alert").html("您输入的密码格式不正确");
            $("#myModal").modal("show");
            //alert("您输入的密码格式不正确");
            return;
        } else if (!validatePassword(passwordConfirm)) {
            $("#modal-alert").html("确认密码格式不正确");
            $("#myModal").modal("show");
            return;
        } else if (!confirmPassword(password, passwordConfirm)) {
            $("#modal-alert").html("两次密码输入不一致");
            $("#myModal").modal("show");
            return;
        }

        json.phoneNumber = phoneNumber;
        json.validationCode = validationCode;
        json.password = password;
        postRequest(commonUrl + "users/forgetPassword", json, function (data) {
                data = JSON.parse(data);
                if (data.ret_code == 0) {
                    location.href = "fwh_login.html";
                } else {
                    alert(data.message);
                }
            }, function () {
                alert('服务器异常');
            }
        );
    });


});