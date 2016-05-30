/**
 * Created by knight on 15/11/5.
 */
//var commonUrl = 'http://app.fullway.com.cn/';
var commonUrl = 'http://101.231.55.246:8087/fullway-health/';
//var commonUrl = 'http://172.16.77.24:8080/';
//fullway正式地址
//var imAddress = "xlab#fullwayhealth";

//xlab测试地址
var imAddress = "xlab#fullwayhealthtest";

$.ajaxSetup({
    //dataType:"json",
    timeout: 10000,//ajax请求超时时间10秒
    beforeSend: function () {
        console.log("ajax before send");
    },
    complete: function () {
        console.log("complete");
    },
    error: function (xhr, status, error) {
        console.log(xhr.status);
    }
});

function postRequest(url, data, successFunction) {
    $.ajax({
        type: "post",
        data: data,
        url: url,
        success: successFunction
    });
}
function postRequest(url, data, success, error) {
    $.ajax({
        type: "post",
        data: data,
        url: url,
        success: success,
        error: error
    });
}

function postRequest(url, data, success, error) {
    $.ajax({
        type: "post",
        data: data,
        url: url,
        success: success,
        error: error
    });
}


/*获取 get方式的参数*/
function getParam(param) {
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for (var i = 0; i < VariableArray.length; i++) {
        var KeyValuePair = VariableArray[i].split('=');
        if (KeyValuePair[0] == param) {
            return KeyValuePair[1];
        }
    }
}

function defaultImg(e) {
    e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    //var random=Math.floor(Math.random()*28+1);
    //console.log(random);
    //e.src= "../img/topic/"+random+".png";
}

/* get data from storage*/
function saveData(k, v) {
    localStorage.setItem(k, v);
}
function getData(key) {
    return localStorage.getItem(key);
}

function validatePhone(v) {
    var re = /^(1[0-9]{10})$/;
    return re.test(v);
}
function validateYZM(v) {
    var re = /^\d{4}$/;
    return re.test(v);
}
function validatePassword(v) {
    var re = /^[0-9a-zA-Z]{6,10}$/;
    return re.test(v);
}

function confirmPassword(v1, v2) {
    if (v1 == v2) {
        return 1
    } else {
        return 0
    }
}
