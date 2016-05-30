/**
 * Created by lixuanwu on 15/11/13.
 */



//登陆
$(document).ready(function () {
    $(document).on("click", "#login", function () {
        var json = {};
        json.phoneNumber = $('#inputPhone').val();//15000236786
        json.password = $('#inputPassword').val(); //123456
        saveData("phoneNumber", json.phoneNumber);
        /**请求用户列表*/
        postRequest(commonUrl + "users/app/memberList/v1", json, function (data) {
                data = JSON.parse(data);
                console.log(data);
                login_register(data)
            }, function () {
                $('#sureModal').modal('show');
            }
        );
    });
    $('#sureModal').on('show.bs.modal', function () {
        setTimeout(function () {
            $("#sureModal").modal("hide")
        }, 3500);
    })
});

//注册
$(document).on("click", "#register", function () {
    var json = {};
    var phoneNumber = $("#mobile").val();
    var validationCode = $("#captcha").val();
    var password = $("#password").val();

    console.log($("#agree-protocol").attr("data-checked"));
    if (!validatePhone(phoneNumber)) {
        $("#modal-alert").html("您输入的⼿手机号格式不正确");
        $("#myModalError").modal("show");
        return;
    } else if (!validateYZM(validationCode)) {
        $("#modal-alert").html("您输⼊入的验证码格式不正确");
        $("#myModalError").modal("show");
        //alert("您输⼊入的验证码格式不正确");
        return;
    } else if (!validatePassword(password)) {
        $("#modal-alert").html("您输⼊入的密码格式不正确");
        $("#myModalError").modal("show");
        //alert("您输⼊入的密码格式不正确");
        return;
    } else if ($("#agree-protocol").data("checked") === 0) {
        $("#modal-alert").html("您还未同意《全程用户协议》");
        $("#myModalError").modal("show");
        //alert("您还未同意《全程用户协议》");
        return;
    }
    json.phoneNumber = phoneNumber;
    json.validationCode = validationCode;
    json.password = password;
    postRequest(commonUrl + "users/registerMember/v1", json, function (data) {
            data = JSON.parse(data);
            login_register(data);
        }, function () {
            $('#sureModal').modal('show');
        }
    );

});

function login_register(data) {
    var resultCode = data.ret_code;
    var resultValues = data.ret_values;
    if (resultCode == 0) {
        var members = resultValues.members;
        var primaryKey = resultValues.primaryKey;
        $("#primary_key").val(primaryKey);

        /**如果账号是1个 直接登陆 */
        if (members.length = 1) {
            if (members[0].informationPerfect) {
                login(members[0].memberId);
            } else {
                /**跳转到未完善信息界面 */
                location.href = "fwh_initial_name.html?primaryKey=" + primaryKey;
                return;
            }
        }
        /**如果账号多余2个 显示加载列表 */
        if (members.length > 1) {
            appendContent(members);
            $('#myModal').modal();
            return;
        }
    }
    if (resultCode == -1) {
        alert(data.message);
    }
}

/** 加载用户列表 */
function appendContent(data) {
    var $memberList = $("#member_list").empty();
    var appendHTML = "";
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        appendHTML += '<div class="radio"><label><input type="radio" name="optionsRadios" value="' + obj.memberId + '">' + obj.name + '</label></div>';
    }
    $memberList.append(appendHTML);
}

/**多账号 选择登陆*/
$(document).on("click", "#chooseLogin", function () {
    var memberId = $("input[name='optionsRadios']:checked").val();
    login(memberId);
});

function login(memberId) {
    var primaryKey = $("#primary_key").val();
    if (!primaryKey) return;
    var json = {};
    json.primaryKey = parseInt(primaryKey);
    json.memberId = parseInt(memberId);
    postRequest(commonUrl + "users/app/login/v1", json, function (data) {
            data = JSON.parse(data);
            var returnCode = data.ret_code;
            var memberValue = data.ret_values.member;
            var imInfo = data.ret_values.imInformation;
            if (returnCode == 0) {
                saveData("memberId", memberId);
                console.log(memberId);
                saveData("name", memberValue.name);
                saveData("photoUrl", memberValue.photoUrl);
                saveData("memberType", memberValue.memberType);
                saveData("primaryKey", primaryKey);
                saveData("imAccount", imInfo.imAccount);
                saveData("imPassword", imInfo.imPassword);
                saveData("imGroupId", imInfo.imGroupId);
                location.href = "fwh_home_index.html?primaryKey=" + primaryKey;
            } else if (returnCode == -1) {
                alert(data.message);
            }
        }, function () {
            $('#sureModal').modal('show');
        }
    );
}

//注册验证
$(document).ready(function () {
    //placeholder 变化
    $(document).on("focus", "#password", function () {
        $(this).attr("placeholder", "必须6位以上");
    });
    $(document).on("blur", "#password", function () {
        $(this).attr("placeholder", "设置6~10位登陆密码");
    });

    //发送验证码
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
            url: commonUrl + "users/sendSmsValidationCode",
            success: function (data) {
                if (data.ret_code == 0) {
                    $sendSms.attr("disabled", "true");
                    $sendSms.addClass("disabled");
                    var waitTime = 60;
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
                $('#registerInfo').html('验证码发送失败');
                $('#sureModal').modal('show');
            }
        });
    });

});


//忘记密码
$(document).ready(function () {

    //placeholder 变化
    $(document).on("focus", "#password", function () {
        $(this).attr("placeholder", "必须6位以上");
    });
    $(document).on("blur", "#password", function () {
        $(this).attr("placeholder", "设置6~10位登陆密码");
    });

    $(document).on("click", "#resendSms", function () {
        var mobiles = $("#mobile").val();
        if (!validatePhone(mobiles)) {
            alert("您输⼊入的⼿手机号格式不正确");
            return;
        }
        var json = {};
        json.mobiles = mobiles;
        var $sendSms = $("#resendSms");

        $.ajax({
            type: "post",
            data: json,
            url: commonUrl + "/users/sendSmsValidationCode",
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.ret_code == 0) {
//                        $("#sendSms").attr("disabled", "disabled");
                    $sendSms.attr("disabled", "true");
                    $sendSms.addClass("disabled");
                    var waitTime = 60;
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
            }
        });
    });


    //记住密码
    $(document).on("click", "#remember-Pwd", function () {

        var checked = $(this).data("checked");
        if (checked) {
            $(this).data("checked", 0);
            $(this).find("img").attr("src", "img/icon/checkbox-default.png");
        } else {
            $(this).data("checked", 1);
            $(this).find("img").attr("src", "img/icon/checkbox-checked.png");
        }

    });

    $(document).on("click", "#agree-protocol", function () {
        var checked = $(this).data("checked");
        if (checked) {
            $(this).data("checked", 0);
            $(this).find("img").attr("src", "img/icon/checkbox-default.png");
        } else {
            $(this).data("checked", 1);
            $(this).find("img").attr("src", "img/icon/checkbox-checked.png");
        }

    });


});