/**
 * Created by qqy on 15/12/18.
 */

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

var id = GetQueryString("boat");

if (id != null) {
    var id_ = decodeURIComponent(id);
}

var boatType = 1;

$(document).ready(function () {
    var avatar = $("#avatar-content");
    var height = avatar.css("width");
    avatar.css("height", height);
});

function getBoatInfo(){
    $.get(commonUrl + "wx/retrieveBoat/" + id_, function (data) {
        console.log(data);
        if (data.success == "1") {
            $("#wish").html(data.userBoat.title);
            $("#upload-btn").attr("src", data.userBoat.avatar1);
            $("#upload-baby").attr("src", data.userBoat.avatar2);
            $("#boat-icon").attr("src", data.userBoat.boat.imgUrl);


            $("#boatTitle").html("—"+data.userBoat.boat.boatTitle+"—");
            $("#boatText").html(data.userBoat.boat.takeText);
            $("#money").html("&lt;"+data.userBoat.boat.money+"&gt;");
            $("#present").html("&lt;"+data.userBoat.boat.present+"&gt;");
            $("#result").html(data.userBoat.boat.result);
            $(".rescue_number").html(data.rescue_number);
            $(".refuse_number").html(data.refuse_number);
            nameList(data);
            boatType = parseInt(data.userBoat.boat.rescueType)+1;

            for(var i = 0 ;i<7;i++){
                var type_html= boatType +"_"+(i+1);
                $(".card-back").append('<img class="original boat-gif-rescue" src="http://res.ys-1v1.com/res/boat_gif_rescue_t'+type_html+'.png?imageMogr2/thumbnail/500x">');
            }

            wxShare(data);
        }
    });
}

getBoatInfo();

function nameList(data){
    var rescueList = data.rescueList;
    var html = "";
    var i;
    if(rescueList.length>0){
        for(i=0;i<rescueList.length &&  i<3;i++){
            $(".boat-rescue-list").append(rescueList[i].nickname);
            if(i<rescueList.length-1){
                $(".boat-rescue-list").append("、");
            }
        }

        for(i=0;i<rescueList.length;i++){
            html = '<div class="boat-list-name">' +
            '<div class="boat-list-name-l">'+(i+1)+'.</div>' +
            '<div class="boat-list-name-r">'+rescueList[i].nickname+'</div>' +
            '</div>';
            $(".boat-rescue-names").append(html);
        }
    }

    var refuseList = data.refuseList;

    if(data.refuseList.length>0){
        for(i=0;i<refuseList.length && i<3;i++){
            $(".boat-refuse-list").append(refuseList[i].nickname);
            if(i<refuseList.length-1){
                $(".boat-refuse-list").append("、");
            }
        }
        for(i=0;i<refuseList.length;i++){
            html = '<div class="boat-list-name">' +
            '<div class="boat-list-name-l">'+(i+1)+'.</div>' +
            '<div class="boat-list-name-r">'+refuseList[i].nickname+'</div>' +
            '</div>';
            $(".boat-refuse-names").append(html);
        }
    }


}

function boatAction(type){
    var json = {};
    json.type = type;
    json.boatId =  GetQueryString("boat");
    json.openId = GetQueryString("openId");

    $.ajax({
        url:commonUrl+"wx/boatInteraction",
        data:json,
        type:"post",
        success:function(data){
            getBoatInfo();
        }
    });
}

function wxShare(data){
    var current_url = location.href;

    $.ajax({
        url:commonUrl+"/wx/getTicket",
        type:"GET",
        success:function(data){
            var SHA1 = new Hashes.SHA1;
            var appId =  "wxa572b73e050e1bb4";
            var timestamp =  parseInt(new Date().getTime()/1000);
            var nonceStr =  createNonceStr();
            var jsapi_ticket = data.token;
            var string = "jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+current_url;
            var signature = SHA1.hex(string);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp , // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: '友谊的小船要翻了，赶紧来拯救！', // 分享标题
            link: "http://www.ys-1v1.com/ysweb/boat_enter.html?boat="+id,
            desc: "友谊的小船说翻就翻，大家都在救，我也要去！",
            imgUrl: data.userBoat.avatar2, // 分享图标
            success: function () {
            }
        });
        wx.onMenuShareTimeline({
            title: '友谊的小船要翻了，赶紧来拯救！', // 分享标题
            link: "http://www.ys-1v1.com/ysweb/boat_enter.html?boat="+id,
            desc: "友谊的小船说翻就翻，大家都在救，我也要去！",
            imgUrl: data.userBoat.avatar2, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            }
        });
    });
}
