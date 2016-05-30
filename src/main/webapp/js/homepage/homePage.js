/**
 * Created by lixuanwu on 15/11/18.
 */

$(document).ready(function () {

    setDefaultHomePage();

    $('#banner').carousel('cycle')
    $('#myService').click(function () {
        var memberId;
        if (getParam('memberId') == null) {
            memberId = getData('memberId');
        } else {
            saveData('memberId', getParam('memberId'));
            memberId = getParam('memberId');
        }
        location.href = "fwh_my_service_list.html?memberId=" + memberId;
    });
    getHomePage("上海");
    //var geolocation = new BMap.Geolocation();
    //geolocation.getCurrentPosition(function (position) {
    //    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //        getHomePage(position.address.city);
    //    } else {
    //        //定位失败默认上海市
    //        getHomePage("上海");
    //    }
    //}, function () {
    //    getHomePage("上海");
    //});
    $(document).on('click', '.health-package', function () {
        var serverId = $(this).attr('id');
        console.log(serverId);
        location.href = 'fwh_my_package_detail.html?serverId=' + serverId;
    })

});
function getHomePage(cityName) {
    var json = {};
    var memberId = 6012;
    //if (getParam('memberId') == null) {
    //    memberId = getData('memberId');
    //} else {
    //    saveData('memberId', getParam('memberId'));
    //    memberId = getParam('memberId');
    //}
    json.memberId = memberId;
    json.memberType = "3";
    postRequest(commonUrl + "homePage/homePageData", json, function (data) {
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        if (jsonData.ret_code == 0) {
            $(".loadingDiv").addClass("hide");
            $("body").removeClass("overflowy");
            updateBanner(jsonData.ret_values.banner);
            updateTemperature(jsonData.ret_values.weatherInfo, cityName);
            updateNavigation();
            updateHealthPlan(jsonData.ret_values.healthPlan);
            updateSetMeal(jsonData.ret_values);
        }

    });
}
/*Banner*/
function updateBanner(data) {
    var source = $('#bannerTemplate').html();
    var template = Handlebars.compile(source);
    Handlebars.registerHelper("active", function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })
    $('#banner').html(template(data))
    ;
    //$('#banner').css('background-image',"url('"+data[0].imgurl+"')");
}

/*温度*/
function updateTemperature(data, cityName) {
    //var pm25 = data.pm25Entity.data["pm2.5"];
    //var low_temp = data.weatherEntity.data["low_temp"];
    //var high_temp = data.weatherEntity.data["high_temp"];
    //var weather = data.weatherEntity.data["weather"];
    ////todo  weather转换成 图片
    //$('#pm25').html(pm25);
    //$('#low_temp').html(low_temp);
    //$('#high_temp').html(high_temp);
    //$('#cityName').html(cityName);
    //data.cityName = cityName;
    //Handlebars 不能解析pm2.5
    //data.pm25Entity.data.pm25 = data.pm25Entity.data["pm2.5"];
    var source = $('#weatherTemplate').html();
    var template = Handlebars.compile(source);
    $('#weather').html(template())


}
function updateNavigation() {
    var data = {};
    data.myservice = 'img/index/我的服务@2x.png';
    data.orderService = 'img/index/服务预约@2x.png';
    data.healthDetection = 'img/index/健康检测@2x.png';
    data.customerService = 'img/index/客户服务@2x.png';
    var source = $('#navigationTemplate').html();
    var template = Handlebars.compile(source);
    $('#navigation').html(template(data))
}
/*健康计划*/
function updateHealthPlan(data) {
    if (data.list.length === 0) {
        $("#tel").addClass("no-health-plan-tel");
        $("#healthPlanSection").hide();
        $('#tel').addClass('visibleImg');
        return;
    } else {
        var source = $('#healthPlan').html();
        var handlebarTemplate = Handlebars.compile(source);
        var healthPlan = data.list[0];
        Handlebars.registerHelper("compare", function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper("compare1", function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        $('#healthPlanSection').html(handlebarTemplate(healthPlan));
    }

}
/*套餐*/
function updateSetMeal(data) {
    var source = $('#healthPackage').html();
    var handlebarTemplate = Handlebars.compile(source);
    var setMeal = data.setMeal;
    $('#setMeal').html(handlebarTemplate(setMeal));
    //设置电话按钮位置
    var count = 0;
    var planMakeList = data.healthPlan;
    $.each(planMakeList.list[0].planMakeList, function (list, plan) {
        if (plan.messureType == 1 || plan.messureType == 2) {
            count++;
        }
    });
    if (count === 1) {
        $('#telImg').addClass('one-health-plan-tel');
    } else if (count === 2) {
        $('#telImg').addClass('two-health-plan-tel');
    }
}
function setDefaultHomePage() {

    $(".loadingDiv").removeClass("hide");
    $("body").addClass("overflowy");
    console.log($(window).height());
    var height = $(window).height();
    $("#loadingImg").css("marginTop", height / 2 - $("#loadingImg").height());
}