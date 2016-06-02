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

$(document).ready(function () {
    var avatar = $("#avatar-content");
    var height = avatar.css("width");
    avatar.css("height", height);
});

$.get(commonUrl + "wx/retrieveBoat/" + id_, function (data) {
    if (data.success == "1") {
        $("#wish").html(data.userBoat.title);
        $("#avatar").attr("src", data.userBoat.avatar1);
        $("#avatar1").attr("src", data.userBoat.avatar2);
    }
});

$("#edit").on("touchstart", function () {
    location.href = "card-index.html";
});

$("#share").on("touchstart", function () {
    $('#myModal').modal('show');
});
