/**
 * Created by Knight on 2016/7/13.
 */

function getSystemParam(){
    $.ajax({
        url:commonUrl+"wx/systemParam",
        type:"GET",
        success:function(data){
            if(data.success == 1){
                $(".rescue_number").html(data.rescue_number);
                $(".refuse_number").html(data.refuse_number);
            }
        }
    });
}

function updateSystemParam(name){
    var _this =  $("."+name);
    _this.html(parseInt(_this.html())+1);
    $.get(commonUrl+"wx/updateSystemParam/"+name)
}
