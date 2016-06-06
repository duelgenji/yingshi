/**
 * Created by qqy on 15/12/15.
 */
var commonUrl = "http://zhixin.me:8080/yingshi/";
// var commonUrl = "http://101.231.124.8:45698/youle-card/";

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}